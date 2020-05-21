<template>
  <div id="container">

    <!-- our title -->
    <!-- our diagram -->
    <el-row>

      <el-col :span= "8">
        <el-row>
          <div class="chartTitle">
            <h3> {{ chartTitle }} </h3>
          </div>
          <div class="description" ref="description"> 
            {{ descriptions[stepValue].description }}
          </div>
        </el-row>
      </el-col>

      <el-col :span= "16">
        <div class="cases" ref="caseDetail"></div>
        <svg id = "chronologySVG" ref="chronologySVG"></svg>
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
      chartTitle: "FOLLOWING THE TRAIL OF SEXUAL MISCONDUCT CASES IN ACADEMIA",
      height: 900,
      width: 1500,
      margin: {top: 25, left: 25, bottom: 25, right: 25 },
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
    myData: function(){ 
      var validData = this.asmdData
          .filter(this.isValid)
        
      return validData;
      // if(this.stepValue < 4){
      //   return validData;
      // } else {
      //   return validData.filter(this.isStem);
      // }
    },
    rHeight: function(){
      // FIXME: this should be dependent on window.height and maxCases etc.
      return 3.2
      // if(this.stepValue < 5){
      //   return 3.2
      // } else {
      //   return 7
      // }
    },
    startYear: function(){
      return Math.min(...this.myData.map(function(a){
        return a['Outcome Year'];
      }))
    },
    endYear: function(){
      return Math.max(...this.myData.map(function(a){
        return a['Outcome Year'];
      }))
    },
    maxCases: function(){
      return  Math.max(...this.myBins.map(function(a){
        return a.length;
      }))
    },
    xScale: function(){
      return d3.scaleTime()
          .rangeRound([0,this.width])
          .domain([new Date(1979, 1, 1), new Date(this.endYear, 12, 31)]);
    },
    yScale: function(){
      return d3.scaleLinear()
          .range([this.height, 0 + this.margin.top, + this.margin.bottom]) 
          .domain([0, this.maxCases]); 
    },
    myBins: function(){
      var nBins = this.endYear - this.startYear;

      // we need this to convert a date of the form 2000 to 2000-01-01:12:00:000
      var parseDate = d3.timeParse("%Y");

      var histogram = d3.histogram()
        .domain(this.xScale.domain())
        .thresholds(this.xScale.ticks(nBins))
        .value(function(d) { return parseDate(d['Outcome Year'])});

      return histogram(this.myData);
    }
    
  },
  methods:{
    clearBarGraph(){
      d3.select(this.$refs.chronologySVG)
        .selectAll("g")
        .remove()
    },
    drawBarGraph(){
      console.log("drawBarGraph: " + this.myData.length);
      console.log("maxCases: " + this.maxCases)

      // Adds the svg canvas
      var svg = d3.select(this.$refs.chronologySVG)
          .attr("viewBox", [0, 0, this.width + this.margin.left + this.margin.right , this.height + this.margin.top + this.margin.bottom])

      // add the tooltip area to the webpage
      var tooltip = 
          d3.select(this.$refs.caseDetail)
            .append()
            .attr("class", "tooltip")
            .style("opacity", 0.2);

      var incidentColor = function(e){
        return e.toLowerCase().indexOf("resigned") === -1 ? "#6767ff" : "#6767ff";
      }

      var tooltipOn = function(d) {
        // change opacity of bar in graph
        d3.select(this)
          .classed("selected", true)
          .style("opacity", .5)
          .style("fill", "#ffffff")
          .style("cursor", "pointer")
        // tell tooltip to transition and change opacity
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        // write into tooltip with raw HTML
        tooltip.html("<b><span style = 'font-size: 24px; font-family: Syncopate; text-transform: uppercase; color: #6767ff;'>"+ d.name + "</span></b>" + "</br>" 
        + "<b>Outcome:  </b>" + d.outcome + "</span></br>" + "<b>Institution:  </b>" + d.institution + "</br>" 
        +  "<b>Discipline:  </b>" + d.discipline + "</br>" + "<b>Story: </b>" + d.story + "</b>");
      };

      var tooltipOff = function(d) {
        // change opacity of bar in graph
        d3.select(this)
          .classed("selected", false)
          .style("fill", function(d){ return d.color; })
          .style("opacity", 1);

        // tell tooltip to transition and make invisible
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      };

      // g container for each bin
      let binContainer =  d3.select(this.$refs.chronologySVG)
          .selectAll(".gBin")
          .exit()
          .remove()
          .data(this.myBins);

      let binContainerEnter = binContainer.enter()
          .append("g")
          .attr("class", "gBin");

      let that = this;

      // need to populate the bin containers with data the first time
      binContainerEnter.selectAll("rect")
            .data(d => d.map((p, i) => {
              return {idx: i,
                      name: p['Person'],
                      outcome: p.Outcome,
                      institution: p["Institution"],
                      discipline: p["Specific Discipline"],
                      link: p["Original Link(s)"],
                      color: "#6767ff",
                      year: p["Outcome Year"],
                      story: p["Specific Outcome"],
                      rHeight: this.rHeight,
                      isStem: this.isStem(p)
                    }
            })
            )
          .enter()
          .append("rect")
            .attr("class", "enter")
            .attr("x", 0) // g element already at correct x pos
            .attr("y", function(d) {
                  return - 2*d.rHeight * ( d.idx + 0.5 );
                })
            .attr("height", this.rHeight)
            .attr("width", 21) // used to be 3*rHeight
            .style("fill", function(d){ return incidentColor(d.outcome); })
            .on("mouseover", tooltipOn)
            .on("mouseout", tooltipOff)
            .on("click", function(d){
               window.open(d.link)
              })

        binContainerEnter.merge(binContainer)
            .attr("transform", d => `translate(${this.xScale(d.x0)}, ${this.height})`);
        
        // add x axis
        svg.append("g")
          .style("font", "16px helvetica")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .style("stroke", "white")
          .call(d3.axisBottom(this.xScale))
        
        // x axis title
        svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", this.width - this.margin.right - this.margin.left)
          .attr("y", this.height + this.margin.top + this.margin.bottom)
          .text("year")
          .style("fill", "white")
          .style("font", "20px helvetica");

        // add y axis
        svg.append("g")
          .style("font", "16px helvetica")
          .attr("class", "axis axis--y")
          .style("stroke", "white")
          .call(d3.axisRight(this.yScale))
          .select(".domain").remove();
        
        svg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", -this.margin.left+20)
          .attr("x", -this.margin.top)
          .text("Number of individual cases")
    }
  },
  mounted() {
    console.log("chronology component mounted 😷");
    this.drawBarGraph();
  },
  watch: {
    // this is our stepValue listener and we update the text with the proper
    // value whenever it is being triggered
    stepValue: function(){
       switch (this.stepValue){
        case 0:
          d3.select(this.$refs.chronologySVG)
            .selectAll("rect")
            .style("fill", "#6767ff");
        break;
        case 1:
            d3.select(this.$refs.chronologySVG)
            .selectAll("rect")
            .style("fill", function(d){ return d.year === 1980 ? "#ffffff" : "#6767ff"; });
        break;
        case 2:
          d3.select(this.$refs.chronologySVG)
            .selectAll("rect")
            .style("fill", function(d){ return d.year === 1991 ? "#ffffff" : "#6767ff"; });
        break;
        case 3:
          d3.select(this.$refs.chronologySVG)
            .selectAll("rect")
            .style("fill", function(d){ return d.year === 2018 ? "#ffffff" : "#6767ff"; });
        break;
        default:
          d3.select(this.$refs.chronologySVG)
            .selectAll("rect")
            .style("fill", function(d){ return d.isStem ? "6767ff" : "#333333" });
        break;
       }
    }
  }
};
</script>