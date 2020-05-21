<template>
    <div class="ultimate">
    <!-- <h4 id="dropTitle">Select Category:</h4> -->
    <div class="drop"></div>
    <el-select id="newDrop" v-model="selectedValue" placeholder="Select" @change="updateBars">
    <el-option
      v-for="item in dropdownOptions"
      :key="item"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
    </div>
</template>


<script>
import * as d3 from 'd3';
export default {
  name: 'bar2',
  data() {
      return{
          berryData:[],
          dropdownOptions:[],
          selectedValue:""
	};
	
  },


  mounted() {

          let _this = this

     d3.csv("./berry.csv").then( function(data, error){
        _this.berryData=data
        _this.drawBars();
     })
      console.log("mounted");
      

  },


 methods: {

drawBars(){
    console.log("drawBars")
    let data=this.berryData
    console.log(this.berryData);

    var margin = {top: 80, right: 180, bottom: 80, left: 180},
        width = 1500 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    var svg = d3.select(".bar2_graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "svgBar")
        .style("position", "relative")
        .style("top", "0px")
        .style("left", "10%")
        .append("g");
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var elements = Object.keys(data[0])
		.filter(function(d){
			return (d != "sample_name2");
        });
        
    this.dropdownOptions = elements;

	var selection = elements[0];

	var y = d3.scaleLinear()
			.domain([d3.min(data, function(d){return +d[selection];})*(0.1), d3.max(data, function(d){return +d[selection];})])
			.range([height, 100]);

	var x = d3.scaleBand()
			.domain(data.map(function(d){ return d.sample_name2;}))
			.range([0, width]);


	var xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(-550)
        .tickSizeOuter(0); 

	var yAxis = d3.axisLeft()
		.scale(y);

	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "17px")
        .style("text-anchor", "end")
        .style("font-family", "DM Serif Display")
        .style("font-weight", "bold")
        .style("fill", "#0b4780")
        .style("letter-spacing", "1.7px")
      	.attr("dx", "-0.2em")
      	.attr("dy", "0.8em")
      	.attr("transform", "rotate(-30)" );


 	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

	svg.selectAll("image")
		.data(data)
		.enter()
		.append("image")
        .attr("class","berry_img")
        .attr("xlink:href", (d,i) => "b" + (i+1) + ".png")
        .attr("width", 80)
        .attr("height", 80)
		// .attr("r", (width/data.length)/6.0)
		.attr("x", function(d, i){
			return (((width / data.length) * i)+((width / data.length)/2)-40) ;
        })
		.attr("y", function(d){
			return y(+d[selection]);
		})
		.append("title")
		.text(function(d){
			return d.sample_name2 + " : " + d[selection];
		});
},

updateBars(){

console.log("running");

var margin = {top: 80, right: 180, bottom: 80, left: 180},
        width = 1500 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

var data = this.berryData;

let _this=this;

	var y = d3.scaleLinear()
			.domain([d3.min(data, function(d){return +d[_this.selectedValue];}), d3.max(data, function(d){return +d[_this.selectedValue];})])
			.range([height-80, 120]);

	var x = d3.scaleBand()
			.domain(data.map(function(d){ return d.sample_name2;}))
			.range([0, width]);


	var xAxis = d3.axisBottom()
        .scale(x)
        .tickSize(-350)
        .tickSizeOuter(0); 

	var yAxis = d3.axisLeft()
		.scale(y);

// var selector = d3.select("#newDrop")
//     	// .append("select")
//     	// .attr("id","dropdown")
//     	.on("change", function(d){
//             console.log("change")
//         	selection = document.getElementById("newDrop");

        	y.domain([d3.min(data, function(d){return +d[_this.selectedValue];}), d3.max(data, function(d){return +d[_this.selectedValue];})]);

        	yAxis.scale(y);

            d3.selectAll(".berry_img")
                .transition()
           		// .duration(2000)
                // .ease("bounce")
	            .attr("y", function(d){
					return y(+d[_this.selectedValue]);
				})
				.attr("x", function(d, i){
					return (((width / data.length) * i)+((width / data.length)/2)-40) ;
				})
           		.select("title")
           		.text(function(d){
           			return d.sample_name2 + " : " + d[_this.selectedValue];
           		});
      
           	d3.selectAll("g.y.axis")
           		.transition()
           		.call(yAxis);

        //  });

    // selector.selectAll("option")
    //   .data(elements)
    //   .enter().append("option")
    //   .attr("text", function(d){
    //     return d;
    //   })
    //   .text(function(d){
    //     return d;
    //   })

  }

}

}
</script>

<style>

.ultimate{
    text-align: left;
    align-content: left;
    justify-content: left;
    margin-top: 20rem;
    margin-left: 0.5rem;
}

.drop{
    font-family: "HelveticaNeue-Light";
    background-color: #fffcf6;
}

#dropTitle{
    font-family: "HelveticaNeue-Light";
    background-color: #fffcf6;
    display: flex;
    align-content: left;
    /* margin-left: 40%; */
    padding-top: 200px;
    padding-bottom: 10px;
}

.svgBar{
    justify-content: center;
    align-items: center;
    background-color: #fffcf6;
    margin-left: 8%
}

.circle {
	fill: #0b4780;
}
.circle:hover {
    stroke: #0b4780;
	fill: white;
}

line {
    fill: lightgray;
}

.axis path{
    opacity: 0;
}
.axis line {
  fill: none;
  stroke: lightgray;
  shape-rendering: crispEdges;
}

/* span{
    font-family: "HelveticaNeue";
    font-size: 12px;
    -webkit-text-fill-color: #000000;
} */

.el-select-dropdown__item {
    font-family: "HelveticaNeue";
    font-size: 12px;
    -webkit-text-fill-color: #000000;
    height: 25px;
    line-height: 25px;
}

.el-select-dropdown__wrap {
    max-height: 718px;
}

.el-scrollbar__view{
    height: 718px;
}

.el-select-dropdown__list{
    height: 718px;
}
</style>
