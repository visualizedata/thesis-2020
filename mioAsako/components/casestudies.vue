<template>
  <div id="container">

    <el-row>
      <el-col :span= "8">
        <el-row>
          <div class = "chartTitle">
            <h3>{{ chartTitle }}</h3>
          </div>
          <div class="description" ref="description"> {{ descriptions[stepValue].description }} </div>
        </el-row>
        <el-row>
        </el-row>
      </el-col>

      <el-col :span= "16">
        <div class="outcomes" ref="caseStudyDetail"></div>
        <svg id = "caseStudiesSVG" ref="caseStudiesSVG"></svg>
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
      chartTitle: "A CLOSER LOOK AT STEM MISCONDUCT CASES OF 2018",
      height: 900, //why does window.innerHeight not work?
      width: 1200,
      barMargin: 300,
      margin: {top: 25, left: 25, bottom: 75, right: 25 },
      //data: this.asmdData,
    }
  },
  props: {
    // this component requires the outer "page" that uses this component
    // to populate `asmdData`, and it should be an array
    caseStudyData: {
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
    total_length: function(d){return d.outcome - d.first_incident},
    myData: function(){
      switch (this.stepValue) {
        case 0:
          return this.caseStudyData.sort((a,b) => { return ((a.outcome-a.first_incident)-(b.outcome-b.first_incident))
                                                  }
                                        );
          break;
        case 1:
          return this.caseStudyData.sort((a,b) => { return ((a.outcome-a.first_incident)-(b.outcome-b.first_incident))
                                                  }
                                        );
          break;
        default:
          return this.caseStudyData.sort((a,b) => { return ((a.outcome-a.first_incident)-(b.outcome-b.first_incident))
                                                  }
                                        );
          break;
      }
    },
    xScale: function(){
      // our time scale is centered around 1995, with 25 years left and right of it
      return d3.scaleTime()
               .rangeRound([0, this.width-this.barMargin])
               .domain([new Date(1970, 1, 1), new Date(2020, 1, 1)])
    },
    xAxis: function(){
      // create a custom x-axis for our timescale
      // it is 50 years wide, centered around the year 0
      var x2 = d3.scaleLinear()
                 .rangeRound([this.margin.left, this.width-this.margin.right-this.barMargin])
                 .domain([-25, 25])

      // one tick every 5 years
      return d3.axisBottom(x2)
               .ticks(10)
    },
    yScale: function(){
      // divide y-axis by number of cases
     return d3.scaleBand()
              .domain(d3.range(this.myData.length))
              .rangeRound([this.margin.top, this.height-this.margin.bottom])
              .padding(0.1)
    }
    
  },
  methods: {
    clearBarChart(){
      d3.select(this.$refs.caseStudiesSVG)
        .selectAll("*")
        .remove()
    },

    drawBarChart(){
      console.log("drawBarChart")
      var width = window.innerWidth
      var height = window.innerHeight

      var parseDate = d3.timeParse("%Y");

      const midYear = 1995;

      const barOffset = (this.barMargin + (this.width - this.barMargin)/2) - this.margin.right;
      console.log("barOffset: " + barOffset)

      // we calculate a year in pixels on the x-axis to be able to translate
      // back to year 0
      const yearInPixels = this.xScale(parseDate(2001)) - this.xScale(parseDate(2000));
      console.log("year in pixels:" + yearInPixels);

      // function to be called when hovering over circle
      var tooltipOn = function(d) {
        // change the appearance of the circle ?
        d3.select(this)
          .attr("cursor", "pointer")
        // transition tooltip
        tooltip.transition()
              .duration(200)
              .style("opacity", 1)
        // write html
        tooltip.html("<b><span style = 'font-size: 24px; font-family: Syncopate; text-transform: uppercase; color: #6767ff;'>"+ d.name + "</span></b>" + "</br><span style = 'font-size: 18px; color: #ffffff;'>" 
        + d.description + "</span></br>")

        d3.selectAll("rect")
          .style("opacity", 0.3)
        
        d3.select(d3.event.currentTarget)
          .style("opacity", 1)
        
        d3.selectAll("text")
          .style("opacity", 0.3)
        
        // d3.select(".date_first_incident")
        //   .style("opacity", 1)
      }
      
      // function to be called when hovering _off_ the circle
      var tooltipOff = function(d) {
        d3.select(this)
          .attr("opacity", "1.0")
        // transition tooltip
        tooltip.transition()
              .duration(500)
              .style("opacity", 0);

        d3.selectAll("rect")
          .style("opacity", 1)
        
        d3.selectAll("text")
          .style("opacity", 1)
      };

      // draw on our SVG
      var svg = d3.select(this.$refs.caseStudiesSVG)
          .attr("width", this.width)
          .attr("height", this.height)
          .attr("viewBox", [0,0,this.width,this.height])
      
      // draw a rectangle for each case, then translate it to the mid-year
      svg.append("g")
          .selectAll(".yearRect")
          .data(this.myData)
          .join("rect")
              .attr("class", "yearRect")
              // .attr("fill", d => d.name == "Title IX investigation" ? "#ff6767"
              //                           : "#6767ff")
              .attr("fill", d => d.name == "Title IX investigation" ? "#333333"
                                : d.outcome - d.first_incident <= 5 ? "#ff6767"
                                : d.outcome - d.first_incident <= 10 ? "#dc678a"
                                : d.outcome - d.first_incident <= 20 ? "#bb67ab"
                                : d.outcome - d.first_incident <= 30 ? "#8e67d8"
                                : "#6767ff"
                                )
              .attr("stroke", d => d.name == "Title IX investigation" ? "#ff6767"
                                          : "none")
              .attr("stroke-width", d => d.name == "Title IX investigation" ? "3px"
                                          : "none")
              .attr("x", d => this.xScale(parseDate(d.first_incident)))
              .attr("y", (d,i) => this.yScale(i))
              // width is number of years between outcome and first_incident (times yearInPixels)
              .attr("width", d => yearInPixels * (d.outcome - d.first_incident)) // change this to change bars
              .attr("height", this.yScale.bandwidth())
              // translate the rectangle to that first_complaint is in the middle
              .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
              .on("mouseover", tooltipOn)
              .on("mouseout", tooltipOff)
      
          svg.append("g")
          .selectAll(".yearRect2")
          .data(this.myData)
          .join("rect")
              .attr("class", "yearRect2")
              // .attr("fill", d => d.name == "Title IX investigation" ? "#ff6767"
              //                           : "#6767ff")
              .attr("fill", d => d.name == "Title IX investigation" ? "#333333"
                                : d.outcome - d.first_incident <= 5 ? "#ff6767"
                                : d.outcome - d.first_incident <= 10 ? "#dc678a"
                                : d.outcome - d.first_incident <= 20 ? "#bb67ab"
                                : d.outcome - d.first_incident <= 30 ? "#8e67d8"
                                : "#6767ff"
                                )
              .attr("stroke", d => d.name == "Title IX investigation" ? "#ff6767"
                                          : "none")
              .attr("stroke-width", d => d.name == "Title IX investigation" ? "3px"
                                          : "none")
              .attr("x", d => this.xScale(parseDate(d.first_complaint)))
              .attr("y", (d,i) => this.yScale(i))
              // width is number of years between outcome and first_incident (times yearInPixels)
              .attr("width", d => yearInPixels * (d.outcome - d.first_complaint)) // change this to change bars
              .attr("height", this.yScale.bandwidth())
              .style("opacity", "1")
              // translate the rectangle to that first_complaint is in the middle
              .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
              .on("mouseover", tooltipOn)
              .on("mouseout", tooltipOff)
      

      // //draw year incident
      // svg.append("g")
      //   .attr("fill", "white")
      //   .attr("text-anchor", "end")
      //   .attr("font-family", "Lato")
      //   .attr("font-size", 18)
      //   .selectAll("text")
      //   .data(this.myData)
      //   .join("text")
      //       .attr("x", d => this.xScale(parseDate(d.first_incident)))
      //       .attr("y", (d, i) => this.yScale(i) + this.yScale.bandwidth() / 2)
      //       .attr("dy", "0.35em")
      //       .text(d => d.first_incident)
      //       .style("font-family", "Lato")
      //       .style("opacity", "0")
      //       // move the text since we moved the box
      //       //.attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
      //       .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint) - 10}, ${0})`)
      
      // //draw year complaint
      // svg.append("g")
      //   .attr("fill", "white")
      //   .attr("text-anchor", "end")
      //   .attr("font-family", "Lato")
      //   .attr("font-size", 18)
      //   .attr("class", "date_first_incident")
      //   .selectAll("text")
      //   .data(this.myData)
      //   .join("text")
      //       .attr("x", d => this.xScale(parseDate(d.first_incident)))
      //       .attr("y", (d, i) => this.yScale(i) + this.yScale.bandwidth() / 2)
      //       .attr("dy", "0.35em")
      //       .text(d => d.first_complaint)
      //       .style("opacity", "0")
      //       // move the text since we moved the box
      //       //.attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
      //       .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_incident) + 50}, ${0})`)
      
      // //draw year outcome
      // svg.append("g")
      //   .attr("fill", "white")
      //   .attr("text-anchor", "end")
      //   .attr("font-family", "Lato")
      //   .attr("font-size", 18)
      //   .attr("class", "date_first_incident")
      //   .selectAll("text")
      //   .data(this.myData)
      //   .join("text")
      //       .attr("x", d => this.xScale(parseDate(d.first_incident)))
      //       .attr("y", (d, i) => this.yScale(i) + this.yScale.bandwidth() / 2)
      //       .attr("dy", "0.35em")
      //       .text(d => d.first_outcome)
      //       .style("opacity", "0")
      //       // move the text since we moved the box
      //       //.attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
      //       .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_outcome) + 50}, ${0})`)
      
      // draw the name of the incident
      svg.append("g")
          .attr("fill", "white")
          .attr("text-anchor", "end")
          .attr("font-family", "Lato")
          .attr("font-size", 18)
          .attr("class", "date_outcome")
          .selectAll("text")
          .data(this.myData)
          .join("text")
              .attr("x", d => this.xScale(parseDate(d.first_incident)) - 4)
              .attr("y", (d, i) => this.yScale(i) + this.yScale.bandwidth() / 2)
              .attr("dy", "0.35em")
              .text(d => d.name)
              .style("font-family", "Syncopate")
              .style("text-transform", "uppercase")
              .style("font-weight", "400")
              .style("opacity", "1")
              // move the text since we moved the box
              //.attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
              .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_incident) + barOffset}, ${0})`)

      // append the x-axis
      svg.append("g")
          .style("font", "16px Lato")
          .attr("class", "axis axis--x")
          .attr("transform", `translate(${0}, ${this.height - this.margin.bottom})`)
          .style("stroke", "white")
          .call(this.xAxis)
          .call(g => g.append("text")
            .attr("x", this.width- this.width*0.99)
            .attr("y", -800)
            .attr("fill", "#ffffff")
            .attr("text-anchor", "start")
            .text("← Time of first known incident"))
          .call(g => g.append("text")
            .attr("x", this.width- this.width*0.7)
            .attr("y", -800)
            .attr("fill", "#ffffff")
            .attr("text-anchor", "start")
            .text("Point Zero: time of first complaint"))
          .call(g => g.append("text")
            .attr("x", this.width - this.width*0.4)
            .attr("y", -800)
            .attr("fill", "#ffffff")
            .attr("text-anchor", "start")
            .text("Time of initial outcome →"))
          .call(g => g.append("text")
            .attr("x", (this.width - this.barMargin)/2 - 75)
            .attr("y", 40)
            .attr("fill", "#ffffff")
            .attr("text-anchor", "start")
            .text("Years +/- from first complaint"))
            

      // draw the first_complaint at midYear
      var bars = svg.selectAll(".bar")
          .data(this.myData)
          .enter()
          .append("rect")
              .attr("class", "bar")
              .attr("x", d => this.xScale(parseDate(d.first_complaint)))
              .attr("y", (d,i) => this.yScale(i))
              .attr("width", 2)
              .attr("height", this.yScale.bandwidth())
              .attr("fill", "#ffffff")
              .attr("transform", d => `translate(${yearInPixels * (midYear - d.first_complaint)}, ${0})`)
      
      var tooltip = d3.select(this.$refs.caseStudyDetail)
                      .append()
                      .attr("class", "tooltip")
      
      var legend = svg.selectAll(".legend")
          .append("rect")
            .attr("class", "legend")
            .attr("x", 800)
            .attr("y", (d,i)=> {return 100 + i*25})
            .attr("width", 100)
            .attr("height", 100)
            .attr("fill", "#ffffff")
    }
  },
  mounted() {
    console.log("caseStudy component mounted 😷");

    this.drawBarChart();

},
  watch: {
    // this is our stepValue listener and we update the text with the proper
    // value whenever it is being triggered
    stepValue: function(){
      switch (this.stepValue){
        case 0:
          this.clearBarChart();
          this.drawBarChart();
        break;

        case 1:
          this.clearBarChart();
          this.drawBarChart();
          d3.select(this.$refs.caseStudiesSVG)
            .selectAll(".yearRect")
            //.attr("x", d => this.xScale((d.first_incident)))
            .attr("width", d => 18 * (d.first_complaint - d.first_incident))  //hardcoding YearInPixels 051120
          d3.select(this.$refs.caseStudiesSVG)
            .selectAll(".yearRect2")
            .style("opacity", "0")
        break;
        case 2:
          this.clearBarChart();
          this.drawBarChart();
          d3.select(this.$refs.caseStudiesSVG)
            .selectAll(".yearRect")
              .style("opacity", "0")
          d3.select(this.$refs.caseStudiesSVG)
            .selectAll(".yearRect2")
              .style("opacity", "1")
        break;
        case 3:
          this.clearBarChart();
          this.drawBarChart();
          d3.select(this.$refs.caseStudiesSVG)
            .selectAll(".yearRect")
              .style("opacity", d => d.name == "Title IX investigation" ? "1"
                                            : "0.5")
          d3.select(this.$refs.caseStudiesSVG)
            .selectAll(".yearRect2")
              .style("opacity", "0")
        break;
        default:
          this.clearBarChart();
          this.drawBarChart();
          // d3.select(this.$refs.caseStudiesSVG)
          //   .selectAll(".yearRect")
          //     .attr("opacity", "1")
          // d3.select(this.$refs.caseStudiesSVG)
          //   .selectAll(".yearRect2")
          //     .attr("opacity", "0")
      }
    }
  }
};
</script>