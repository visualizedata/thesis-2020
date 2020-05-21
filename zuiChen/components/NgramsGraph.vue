<template>
<!-- Create a div where the graph will take place -->
<div>
  <div id="close" v-if="peakSelected" v-on:click="unselect">[close]</div>
  <div class="bg-circle" v-if="peakSelected"></div>
  <svg ref="svgNgramsGraph" class="ngram">
  </svg>
</div>
</template>

<script>
import * as d3 from "d3";
import peaks from "~/assets/peaks.json";

export default {
  name: "NgramsGraph",
  props: ['currentDate','rangeChanged'],
  data() {
    return {
      peakSelected:false,
      selectDate: "",
      height: 800,
      width: 800,
      peak_data: peaks.map(({
        date,
        value,
        keywords
      }) => ({
        date: d3.timeParse("%Y-%m-%d")(date),
        value: value * 100,
        keywords
      })),
      graph_data: {}
    }
  },
  watch: {
    currentDate(val, oldVal) {
      this.peakSelected=true;
      this.selectDate = val;
      d3.selectAll("svg.ngram > *").remove();
      this.graph_data = this.peak_data.filter(eachDay => (eachDay.date.getTime() === val.getTime()))[0].keywords;
      this.createGraph();

      console.log(this.graph_data);
      console.log(val)
    },

  },
  methods: {
    unselect(){
      this.peakSelected=false;
      console.log(this.peakSelected);
      d3.selectAll("svg.ngram > *").remove();
    },
    createGraph() {
      var formatDate = d3.timeParse("%Y-%m-%d");
      const peak_data = peaks.map(({
        date,
        value,
        keywords
      }) => ({
        date: formatDate(date),
        value: value * 100,
        keywords
      }))
      const svgDOM = this.$refs.svgNgramsGraph;


      const svg = d3.select(svgDOM)
        // .attr("width", '100%')
        .attr("height", this.height)
        .attr("viewBox", [-this.width/2, -this.height/2, this.width, this.height]);

      const links = this.graph_data.links.map(d => Object.create(d));
      const nodes = this.graph_data.nodes.map(d => Object.create(d));

      const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-150))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

      const linkArc = d => {
        const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        return `
          M${d.source.x},${d.source.y}
          A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
        `;
      }

      const link = svg.append("g")
        .attr("fill", "none")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("stroke", '#555')
        .attr("stroke-width", d => d.weight * 5)

      const node = svg.append("g")
        .attr("fill", "white")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g");

      node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 2);

      node.append("text")
        .style("font-size", d=>`${d.value*50}px`)
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.id)
        .attr("fill", "black")
        .attr("stroke-width", 3);

      simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });

    },
    mounted() {
      console.log("ngrams")
      // console.log(this.selectedStartDate);
    }
  }
}
</script>

<style>
  .bg-circle{
    position:absolute;
    z-index: -5;
    background-color: #FBDD4A;
    width: 600px;
    height: 600px;
    border-radius: 400px;
    margin-left: 120px;
    margin-top: 80px;
    opacity: 0.9;
  }

  #close{
    display: block;
    position: absolute;
    z-index: 50;
    margin-left:400px;
    margin-top: 100px;
    background-color: white;
  }
</style>
