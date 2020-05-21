<template>
  <div id="container">

    <!-- our title -->
    <el-row>

      <el-col :span= "8">
        <div class = "chartTitle">
          <h3> {{ chartTitle }}</h3>
         </div>
        <el-row id = "outcomeDetail">
          <div class="description" ref="description"> {{ descriptions[stepValue].description }} </div>
        </el-row>
        <el-row>
          <div class="outcomes" ref="outcomeDetail"></div>
        </el-row>
      </el-col>

      <el-col :span= "16">
        <svg id = "outcomesSVG" ref="outcomesSVG"></svg>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import * as d3 from "d3";

import utilsMixin from '~/mixins/utils.js'

export default {
  data(){
    return{
      chartTitle: "OUTCOMES OF MISCONDUCT CASES IN STEM ACADEMIA",
      height: 950, //why does window.innerHeight not work?
      width: 950,
      margin: {top: 25, left: 25, bottom: 25, right: 25 },
      //data: this.asmdData,
    }
  },
  props: {
    // this component requires the outer "page" that uses this component
    // to populate `asmdData`, and it should be an array
    asmdData: {
      type: Array,
      required: true
    },
    // this indicates the step of our sibling component
    stepValue: {
        type: Number,
        required: true
    },
    descriptions: {
      type: Array,
      required: true
    }
  },
  mixins: [utilsMixin],
  computed: {
    myStemsByOutcome: function(){
      // filter out asmdData that's a stem!
      var myStems = 
        this.asmdData
            .filter(this.isValid)
            .filter(this.isStem)
            .map(this.addOutcomeClassifier)
      // the order here creates different hierarchies
      return d3.nest()
        .key(function(d) {return d.OutcomeClassifier;})
        .key(function(d) {return d["Specific Discipline"];})
        .key(function(d) {return d.Institution;})
        //.key(function(d) {return d.Person;})
        .rollup(function(v) {return v.length;})
        .entries(myStems);
    },
    root: function(){
      return d3.hierarchy({values:this.myStemsByOutcome }, function(d) { return d.values;})
                 .sum(function(d) { return d.value})
                 .sort(function(a, b) { return b.value - a.value; });
    }
  },
  methods: {
    // TODO: this needs to be enabled somewhere
    resize(){
      console.log('resized window');
      this.width = this.$refs.container.offsetWidth;
      this.height = this.width;

      d3.select(this.$refs.asmdClusteringSVG)
        .attr('width', this.width)
        .attr('height', this.height)
    },
  },
  mounted() {
    console.log("cluster mounted 😷");

    // create the color schemes
    var colorO = d3.scaleOrdinal()
        .domain(function(d){return d.Institution})
        .range(d3.schemeSet3);
    
    var colorScale = d3.scaleOrdinal()
               .domain(function(d){ return d.Discipline })
              //  .range(["#f90da0", "#25b8ea", "#e9c338", "#40e18c", "#bb4ca2", "#489260", "#f24219", "#b3dfc1", 
              //          "#746cc4", "#a7e831", "#8b56f0", "#b8b2f0", "#a9681c", "#4cf32c", "#bc1cfa", "#f09bf1"]);
               .range(["#ff69b4", "#EB6468", "#bb67ab", "#D9678D", "#0000b3", "#8080ff", "#ff8080",
                      "#e60000", "#7b376e", "#ff0090", "#c884bb", "#6767ff", "#e797af", "#0000ff", "#49248e", "#663399"])
    // function to be called when hovering over circle
    var tooltipOn = function(d) {
      // change the appearance of the circle ?
      d3.select(this)
        //.attr("opacity", "0.4")
      // transition tooltip
      tooltip.transition()
             .duration(200)
             .style("opacity", 1)
      // write html
      tooltip.html("<b><span style = 'font-size: 24px; font-family: Syncopate; text-transform: uppercase; color: #6767ff;'>"+ d.data.key + "</span></b>")

      d3.selectAll("circle")
        .style("opacity", 0.3)
      
      d3.select(d3.event.currentTarget)
        .style("opacity", 1)
    }
    
    // function to be called when hovering _off_ the circle
    var tooltipOff = function(d) {
      d3.select(this)
        .attr("opacity", "1.0")
      // transition tooltip
      tooltip.transition()
             .duration(500)
             .style("opacity", 0);
      d3.selectAll("circle")
        .style("opacity", function(d){return d.depth == 3 ? 1
                                    : d.depth == 2 ? 0.7
                                    : d.depth == 1 ? 0.5
                                    : 1;
        })
    };

    // draw circle packing
    d3.pack()
      .size([this.width, this.height])
      .padding(3)(this.root)

    // select the SVG
    var svg = d3.select(this.$refs.outcomesSVG)
        .attr("viewBox", "0 0 1000 1000")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("display", "block")
        .style("margin", "0 -14px")

    // draw circles for every cluster
    const node = svg.selectAll("circle")
        .data(this.root.descendants().slice(1)) // slice(1) removes outer circle
        .join("circle")
        .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                : d.depth == 2 ? colorScale(d.parent.data.key)
                                : d.depth == 1 ? colorScale(d.data.key)
                                : colorO(d.data.key);
        })

        .attr("opacity", function(d){return d.depth == 3 ? 0.7
                                    : d.depth == 2 ? 0.7
                                    : d.depth == 1 ? 0.5
                                    : 1;
        })
        .on("mouseover", tooltipOn)
        .on("mouseout", tooltipOff)
        .attr("r", d => d.r)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

    var tooltip = d3.select(this.$refs.outcomeDetail)
                    .append()
                    .attr("class", "tooltip")

                    // TODO: add this to the CSS
                    // .style("position", "absolute")
                    // .style("top", "50%")
                    // .style("left", "50%")
                    // .style("opacity", '1')
                    // .style("borderRadius", "0.25em")
                    // .style("padding", "0.7em 1em")
                    // .style("boxShadow", '0px 0px 10px rgba(0,0,0,0.1)')
                    // .style("fontSize", '0.7rem')
                    // .style("fontFamily", '"Helvetica Neue", sans-serif')
                    // .style("background", "white")
                    // .style("pointerEvents", 'none')
                    // .style("maxWidth", '11em')

    //label every circle (depending on criteria)
    const label = svg.append("g")
    .style("font-family", "Syncopate")
    .style("font-weight", "700")
    .style("font-size", "1rem")
    .style("fill", "white")
    .style("text-transform", "uppercase")
    .attr("pointer-events", "all")
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(this.root.descendants())
    .join("text")
        .attr("pointer-events", "all")
        .style("display", d => d.parent === this.root ? "none" : "none") // here's the criterion
        .text(d => d.data.key)
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)

  },
  watch: {
    // this is our stepValue listener and we update the text with the proper
    // value whenever it is being triggered
    stepValue: function(){
      var colorScale = d3.scaleOrdinal()
                        .domain(function(d){ return d.Discipline })
                        .range(["#ff69b4", "#EB6468", "#bb67ab", "#D9678D", "#0000b3", "#8080ff", "#ff8080",
                      "#e60000", "#7b376e", "#ff0090", "#c884bb", "#6767ff", "#e797af", "#0000ff", "#49248e", "#663399"])
          var colorO = d3.scaleOrdinal()
                        .domain(function(d){return d.Institution})
                        .range(d3.schemeSet3);
      switch (this.stepValue){
        case 0:
          d3.select(this.$refs.outcomesSVG)
               .selectAll("circle")
               .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                : d.depth == 2 ? colorScale(d.parent.data.key)
                                : d.depth == 1 ? colorScale(d.data.key)
                                : colorO(d.data.key);
          })
              .attr("opacity", function(d){return d.depth == 3 ? 0.7
                                        : d.depth == 2 ? 0.7
                                        : d.depth == 1 ? 0.5
                                        : 1;
            })
          
          d3.select(this.$refs.outcomesSVG)
          .selectAll("text")
          .join("text")
              .attr("pointer-events", "all")
              .style("display", d => d.parent === this.root ? "none" : "none") 
              .text(d => d.data.key)
              .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
          break;
        case 1:
          d3.select(this.$refs.outcomesSVG)
            .selectAll("circle")
            .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                : d.depth == 2 ? colorScale(d.parent.data.key)
                                : d.depth == 1 ? colorScale(d.data.key)
                                : colorO(d.data.key);
          })
            .attr("opacity", function(d){return d.depth == 3 ? 0.2
                                  : d.depth == 2 ? 0.2
                                  : d.depth == 1 ? 1
                                  : 1;
        })

          d3.select(this.$refs.outcomesSVG)
          .selectAll("text")
          .join("text")
              .attr("pointer-events", "all")
              .style("display", d => d.parent === this.root ? "inline" : "none") 
              .text(d => d.data.key)
              .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)

          break;
        case 2:
          d3.select(this.$refs.outcomesSVG)
              .selectAll("circle")
              .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                    : d.data.key === "No longer employed" ? "#000000"
                                    : d.data.key === "Criminal plea" ? "#000000"
                                    : d.data.key === "Barred" ? "#000000"
                                    : d.data.key === "Committed suicide" ? "#000000"
                                    : d.depth === 2? "#000000"
                                    : "#6767ff";
          })
              .attr("opacity", function(d){return d.depth == 3 ? 0.2
                                    : d.depth === 2? 0.2
                                    : d.data.key === "No longer employed" ? 0.2
                                    : d.data.key === "Criminal plea" ? 0.2
                                    : d.data.key === "Barred" ? 0.2
                                    : d.data.key === "Committed suicide" ? "#000000"
                                    : 1;
        })
          d3.select(this.$refs.outcomesSVG)
              .selectAll("text")
              .join("text")
                  .attr("pointer-events", "all")
                  .style("display", function(d){return d.data.key === "No longer employed" ? "none"
                                    : d.data.key === "Criminal plea" ? "none"
                                    : d.data.key === "Barred" ? "none"
                                    : d.data.key === "Committed suicide" ? "none"
                                    : d.depth === 1 ? "inline" 
                                    : "none";
                  })
                  .text(d => d.data.key)
                  .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
          break;
        case 3:
          d3.select(this.$refs.outcomesSVG)
               .selectAll("circle")
               .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                    : d.data.key === "Psychology" ? "#d7678a"
                                    : d.data.key === "Bioscience" ? "#9667d0"
                                    : d.data.key === "Mathematics" ? "#bb67ab"
                                    // : d.data.key === "Medicine" ? "#0000ff"
                                    // : d.data.key === "Sociology" ? "#ff6767"
                                    : "#000000";
          })
              .attr("opacity", function(d){return d.depth == 3 ? 0.2
                                        : d.depth == 2 ? 0.7
                                        : d.depth == 1 ? 0.5
                                        : 1;
          })
          
          d3.select(this.$refs.outcomesSVG)
          .selectAll("text")
          .join("text")
              .attr("pointer-events", "all")
              .style("display", function(d){return d.data.key === "Psychology" && d.parent.data.key === "Resigned" ? "inline"
                                  : d.data.key === "Bioscience" && d.parent.data.key === "Resigned" ? "inline"
                                  : d.data.key === "Mathematics" && d.parent.data.key === "Resigned" ? "inline"
                                  : "none";
                })
              .text(d => d.data.key)
              .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
          break;
        default:
          d3.select(this.$refs.outcomesSVG)
               .selectAll("circle")
               .attr("fill", function(d){ return d.depth == 3 ? "#ffffff" 
                                : d.depth == 2 ? colorScale(d.parent.data.key)
                                : d.depth == 1 ? colorScale(d.data.key)
                                : colorO(d.data.key);
          })
              .attr("opacity", function(d){return d.depth == 3 ? 0.7
                                        : d.depth == 2 ? 0.7
                                        : d.depth == 1 ? 0.5
                                        : 1;
            })
          
          d3.select(this.$refs.outcomesSVG)
          .selectAll("text")
          .join("text")
              .attr("pointer-events", "all")
              .style("display", d => d.parent === this.root ? "none" : "none") 
              .text(d => d.data.key)
              .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
          break;
      }
    }
  }
};
</script>