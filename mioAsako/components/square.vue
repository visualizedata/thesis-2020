<template>
  <div id="container">
    <!-- our title -->
    <h2> {{ chartTitle }} stepsValue is {{ stepValue }}</h2>
    <el-row>
      <el-col :span= "24">
        <svg ref="squareSVG"></svg>
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
      chartTitle: "A SQUARE",
      margin: {top: 25, left: 25, bottom: 25, right: 25 },
    }
  },
  props: {
    // this component requires the outer "page" that uses this component
    // to populate `asmdData`, and it should be an array
    caseStudyData: {
      type: Array,
      required: true
    },
    // this is a color parameter passed down from the parent where there's a function to 
    // toggle it
    colorToggled: {
        type: String,
        required: true
    },
    // this indicates the step of our sibling component
    stepValue: {
        type: Number,
        required: true
    }
  },
  mounted() {
    console.log("SQUARE mounted 😷");

    // draw on our SVG
    var svg = d3.select(this.$refs.squareSVG)
        .attr("viewBox", [0, 0, window.innerWidth/2, window.innerHeight/2])
    
    // draw our rectangle with the color as assigned per 
    // our parent components' data()
    svg.append('rect')
       .attr('x', window.innerWidth/4 - 150)
       .attr('y', window.innerHeight/4 - 75)
       .attr('width', 300)
       .attr('height', 150)
       .attr('stroke', this.colorToggled)
       .attr('fill', this.colorToggled)

    // write text that indicates the value of our sibling-component: the steps
    svg.append('text')
       .style("font", "18px Lato")
       .attr('x', window.innerWidth/4 - 150)
       .attr('y', window.innerHeight/4 - 75)
       .attr('width', 300)
       .attr('height', 150)
       .attr('stroke', "#ffffff")
       .text("slider in step: " + this.stepValue)
       
  },
  watch: {
    // this function gets called everytime data.colorToggled changes
    colorToggled: function(){
      console.log("colorToggled 😷");
      // find the SVG we drew in mounted() and change its color
      var svg = d3.select(this.$refs.squareSVG)
                  .select('rect')
                  .attr('stroke', this.colorToggled)
                  .attr('fill', this.colorToggled)
    },
  
    // this is our stepValue listener and we update the text with the proper
    // value whenever it is being triggered
    stepValue: function(){
      var svg = d3.select(this.$refs.squareSVG)
                  .select('text')
                  .text("slider in step: " + this.stepValue)
    }
  }
};
</script>