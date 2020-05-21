<template>
    <div id="radial">
        <div :id="'radial-'+id">
            <svg>
            </svg>
        </div>
    </div>
</template>

<script>
// import radialData from "~/assets/radialBerry.json"
import * as d3 from 'd3';
export default {
  name: 'radial',
  data() {
      return{
    width: 600, 
    // width: Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height: 600,
    // height: Math.min(width, window.innerHeight - margin.top - margin.bottom - 20),
	// margin: {top: 0, left: 0, bottom: 25, right: 25 }
	isOn: false,
	


	};
	
  },
 props: [
	 "allData",
	 "id",
	 "highlight"
 ],



 
 methods: {
    RadarChart(id, data, options) {
	let _this=this;
	var cfg = {
	 width: 300,				//Width of the circle
	 height: 300,				//Height of the circle
	 margin: {top: 50, right: 70, bottom: 50, left: 70}, //The margins of the SVG
	 levels: 5,				//How many levels or inner circles should there be drawn
	 maxValue: 1.0, 		//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 dotRadius: 4, 			//The size of the colored circles of each blob
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 3, 		//The width of the stroke around each blob
	 roundStrokes: true,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.schemeCategory10	//Color function
	};

 var varietyName = ["Big Eye",
					"Wallaby",
					"LZ713.401",
					"LZ855.512",
					"LZ856.103",
					"Kodiak",
					"Pluto",
					"GR112.301",
					"GR207.677"
					];

let arrayLength = varietyName.length;
for(let i = 0 ; i < arrayLength; i++) {
    
   let val = varietyName[i];
}

	
	
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	if(this.id != null){data=[data[this.id]]}
	//Create an array of extent values for each category in the data
	//Will be used for normalization and creating unique scales on each axis
	  let extent_Value = [];
	  for(var i=0; i<this.allData[0].length; i++){
	    extent_Value.push(d3.extent(this.allData.map(d => d[i].value)));
	  };
	//   console.log(extent_Value)

	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		// console.log(maxValue);
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		// allValue = (data[0].map(function(n, t){return n.value})),
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.width/2, cfg.height/2), 	//Radius of the outermost circle
		Format = d3.format('%'),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
		
		// console.log(radius);
	
	//Scale for the radius
	var rScale = d3.scaleLinear()
		.domain([0, maxValue])
		.range([0, radius]);
		
	var rScale2 = extent_Value.map(el => d3.scaleLinear()
					.domain(el)
					.range([70, radius]))
	
	//Create the container SVG and g//
	//Remove whatever chart with the same id/class was present before
	d3.select('#radial-'+this.id).select("svg").remove();
	
	var h2 = d3.select('#radial-'+this.id).append("h2")
			.attr("class", "variety" + _this.id + " variety")
			.text(varietyName[this.id])
			.style("font-family", 'DM Serif Display')
			.style("font-size", "22px")
			.style("-webkit-text-fill-color", "#0b4780");

	//Initiate the radar chart SVG
	var svg = d3.select('#radial-'+this.id).append("svg")
			.style("position", "relative")
			.style("top", "0px")
			.style("left", "0%")
			.attr("width",  (cfg.width + cfg.margin.left + cfg.margin.right)/3)
			.attr("height", (cfg.height + cfg.margin.top + cfg.margin.bottom)/3.5)
			.attr("class", "radar" + _this.id);
	//Append a g element		
	var g = svg.append("g")
			.attr("transform", "translate(" + ((cfg.width/2 + cfg.margin.left)/3) + "," + ((cfg.height/2 + cfg.margin.top)/3.5) + ")")
			.attr("class", "transformRadar" + _this.id);
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	var h4 = d3.select('#radial-'+this.id).append("h4")
			.attr("class", "rank" + _this.id + " rank")
			.text("")
			.attr("font-family", "HelveticaNeue-Light")
			.style("font-size", "13px")
			.style("-webkit-text-fill-color", "black");
	//Draw the Circular grid//
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle" + _this.id)
		.attr("r", function(d, i){return (radius/cfg.levels*d)/3;})
		.style("fill", "none")
		.style("stroke", "lightgray")
		.style("stroke-opacity", "0");

	//Draw the axes//
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
		
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.0)/3 * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.0)/3 * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line" + _this.id + " line")
		.style("stroke", "lightgray")
		.style("stroke-opacity", "0")
		.style("stroke-width", "1px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend" + _this.id + " legend")
		.attr("font-family", "HelveticaNeue-Light")
		.style("font-size", "5px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(2.0*maxValue) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(2.0*maxValue) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	//Draw the radar chart blobs//
	//The radial line function
	var radarLine = d3.lineRadial()
		// .interpolate("linear-closed")
		.radius(function(d,i) { return (rScale2[i](d.value)/3); })
		.angle(function(d,i) {	return i*angleSlice; })
		.curve(d3.curveCardinalClosed)
	
	//Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");

	
			
	//Append the backgrounds	
	blobWrapper
		.append("path")
		.attr("class", "radarArea" + _this.id + " radarArea")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("fill", "#fffcf6")
		.style("fill-opacity", "0")
		.style("stroke", "#0b4780")
		.style("stroke-width", "1px")

		.on('click', function (d,i) {

			var clickedObj = document.getElementById("radial-" + _this.id);
			var clickedObjId = clickedObj.id.split("-")[1];

		
			if (!this.isOn) {
				this.isOn = true;

			d3.select(this)
				.transition().duration(500)
				.attr("d", radarLine.radius(function(d,i) { return (rScale2[i](d.value)*1.7); }))
				.style("fill", "#0b4780")
				.style("fill-opacity", 0.6)
				.style("stroke-width", "2px");
			
			// d3.select('.radarArea')
			// 	.style("stroke-width", "1px");

			d3.selectAll('.gridCircle' + _this.id)
				.transition().duration(500)
				.style("stroke", "lightgray")
				.style("stroke-opacity", "1")
				.attr("r", function(d, i){return (radius*1.7)/cfg.levels*d;});

			d3.selectAll('.line' + _this.id)
				.transition().duration(500)
				.attr("x2", function(d, i){ return rScale(maxValue*1.7) * Math.cos(angleSlice*i - Math.PI/2); })
				.attr("y2", function(d, i){ return rScale(maxValue*1.7) * Math.sin(angleSlice*i - Math.PI/2); })
				.style("stroke", "lightgray")
				.style("stroke-opacity", "1");

			d3.selectAll('.legend' + _this.id)
				.transition().duration(1000)
				.attr("font-family", "HelveticaNeue-Light")
				// .style("font-weight", "bold")
				// .attr("transform", function(d) {return "rotate(-65)"}) 
				.style("fill", "black")
				.style("font-size", "12px");
			
			d3.selectAll(".radar" + _this.id)
				.transition().duration(0)
				.attr("width",  (cfg.width + cfg.margin.left + cfg.margin.right)*1.7)
				.attr("height", (cfg.height + cfg.margin.top + cfg.margin.bottom)*1.9);

			d3.selectAll(".transformRadar" + _this.id)
				.transition().duration(0)	
				.attr("transform", "translate(" + ((cfg.width/2 + cfg.margin.left)*1.7) + "," + ((cfg.height/2 + cfg.margin.top)*1.9) + ")");
			
			d3.selectAll(".radarCircle" + _this.id)
				.transition().duration(500)
				.attr("cx", function(d,i){ return rScale2[i](d.value)*1.7 * Math.cos(angleSlice*i - Math.PI/2); })
				.attr("cy", function(d,i){ return rScale2[i](d.value)*1.7 * Math.sin(angleSlice*i - Math.PI/2); });
			
			d3.selectAll(".radarInvisibleCircle" + _this.id)
				.attr("cx", function(d,i){ return rScale2[i](d.value)*1.7 * Math.cos(angleSlice*i - Math.PI/2); })
				.attr("cy", function(d,i){ return rScale2[i](d.value)*1.7 * Math.sin(angleSlice*i - Math.PI/2); });

			d3.selectAll(".variety" + _this.id)
				.transition().duration(0)
				.style("position", "absolute")
				.style("top", "170px")
				.style("left", "25%")
				.style("font-size", "50px");
				// .attr("transform", "translate(0px , 200px)");

			d3.selectAll(".radar" + _this.id)
				.transition().duration(0)
				.style("position", "absolute")
				.style("top", "130px")
				.style("left", "30.7%");
				// .attr("transform", "translate(-50% , 0)");

			d3.selectAll(".radarCircle" + _this.id)
				.attr("r", 5.0)
				.style("fill-opacity", 0.5);
			
			d3.selectAll(".radarInvisibleCircle" + _this.id)
				.attr("r", 9.0)

			d3.selectAll(".tooltip")
					.style("font-size", "17px");



			} else if (this.isOn) {
				console.log("Need to minimize last clicked obj");

				this.isOn = false;
				
				
				d3.selectAll(".radarArea")
					.transition().duration(500)
					.attr("d", radarLine.radius(function(d,i) { return (rScale2[i](d.value)/3); }))
					.style("fill", "#fffcf6")
					.style("fill-opacity", "0")
					.style("stroke-opacity", 1.0)
					.style("stroke-width", "1px");

				d3.selectAll('.gridCircle' + clickedObjId)
					.transition().duration(500)
					.attr("r", function(d, i){return (radius/cfg.levels*d)/3;})
					.style("stroke-opacity", "0");

				d3.selectAll('.line' + clickedObjId)
					.transition().duration(500)
					.attr("x2", function(d, i){ return rScale(maxValue/3) * Math.cos(angleSlice*i - Math.PI/2); })
					.attr("y2", function(d, i){ return rScale(maxValue/3) * Math.sin(angleSlice*i - Math.PI/2); })
					.style("stroke-opacity", "0");
				
				d3.selectAll('.legend')
					.transition().duration(0)
					// .attr("font-family", "HelveticaNeue-Light")
					// .style("font-weight", "normal")
					// .style("font-size", "5px")
					// .attr("text-anchor", "middle")
					// .attr("dy", "0.35em")
					// .attr("x", function(d, i){ return rScale(2.0*maxValue) * Math.cos(angleSlice*i - Math.PI/2); })
					// .attr("y", function(d, i){ return rScale(2.0*maxValue) * Math.sin(angleSlice*i - Math.PI/2); })
					// .text(function(d){return d})
					.style("font-size", "0px");
				
				d3.selectAll(".variety" + clickedObjId)
					.transition().duration(500)
					.style("position", "relative")
					.style("top", "0px")
					.style("left", "0%")
					.style("font-size", "22px");

				d3.selectAll(".radar" + clickedObjId)
					.transition().duration(500)
					.attr("width",  (cfg.width + cfg.margin.left + cfg.margin.right)/3)
					.attr("height", (cfg.height + cfg.margin.top + cfg.margin.bottom)/3.5);

				d3.selectAll(".transformRadar" + clickedObjId)
					.transition().duration(500)	
					.attr("transform", "translate(" + ((cfg.width/2 + cfg.margin.left)/3) + "," + ((cfg.height/2 + cfg.margin.top)/3.5) + ")");
				
				d3.selectAll(".radar" + clickedObjId)
					// .transition().duration(500)
					.style("position", "relative")
					.style("top", "0px")
					.style("left", "0%");

				// d3.selectAll(".radarCircle" + _this.id)
				// 	.attr("r", 1.0)
				// 	.style("fill-opacity", 0);

				d3.selectAll(".radarCircle" + clickedObjId)
					.attr("cx", function(d,i){ return rScale2[i](d.value)/3 * Math.cos(angleSlice*i - Math.PI/2); })
					.attr("cy", function(d,i){ return rScale2[i](d.value)/3 * Math.sin(angleSlice*i - Math.PI/2); })
					.attr("r", 0)
					.style("fill-opacity", 0);

				d3.selectAll(".radarInvisibleCircle" + clickedObjId)
					.attr("r", 0)
					.attr("cx", function(d,i){ return rScale2[i](d.value)/3 * Math.cos(angleSlice*i - Math.PI/2); })
					.attr("cy", function(d,i){ return rScale2[i](d.value)/3 * Math.sin(angleSlice*i - Math.PI/2); });
				
				d3.selectAll(".line")
					.transition().duration(200)
					.attr("x2", function(d, i){ return rScale(maxValue*1.0)/3 * Math.cos(angleSlice*i - Math.PI/2); })
					.attr("y2", function(d, i){ return rScale(maxValue*1.0)/3 * Math.sin(angleSlice*i - Math.PI/2); })
					.style("stroke-opacity", 0);

				d3.selectAll(".radarCircle")
					.attr("r", 0)
					.style("fill-opacity", 0);
				
				d3.selectAll(".tooltip")
					.style("font-size", "0px");
				
				d3.selectAll(".rank")
					.text("");
				
				// d3.selectAll(".line" + clickedObjId)
				// 	.transition().duration(200)
				// 	.style("stroke-opacity", 0);
			
			}

			/*
			
			d3.select(this)
				.transition().duration(500)
				.attr("d", radarLine.radius(function(d,i) { return (rScale2[i](d.value)*2); }))
				.style("fill", "#0b4780")
				.style("fill-opacity", 0.6);

			d3.selectAll('.gridCircle' + _this.id)
				.transition().duration(500)
				.style("stroke-opacity", "1")
				.attr("r", function(d, i){return (radius*2)/cfg.levels*d;});

			d3.selectAll('.line' + _this.id)
				.transition().duration(500)
				.attr("x2", function(d, i){ return rScale(maxValue*2.0) * Math.cos(angleSlice*i - Math.PI/2); })
				.attr("y2", function(d, i){ return rScale(maxValue*2.0) * Math.sin(angleSlice*i - Math.PI/2); })
				.style("stroke-opacity", "1");

			d3.selectAll('.legend' + _this.id)
				.transition().duration(2000)
				.style("font-size", "8px");
			
			d3.selectAll(".radar" + _this.id)
				.transition().duration(500)
				.attr("width",  (cfg.width + cfg.margin.left + cfg.margin.right)*2)
				.attr("height", (cfg.height + cfg.margin.top + cfg.margin.bottom)*2);

			d3.selectAll(".transformRadar" + _this.id)
				.transition().duration(500)	
				.attr("transform", "translate(" + ((cfg.width/2 + cfg.margin.left)*2) + "," + ((cfg.height/2 + cfg.margin.top)*2) + ")");
			
			d3.selectAll(".radarCircle" + _this.id)
				.transition().duration(500)
				.attr("cx", function(d,i){ return rScale2[i](d.value)*2 * Math.cos(angleSlice*i - Math.PI/2); })
				.attr("cy", function(d,i){ return rScale2[i](d.value)*2 * Math.sin(angleSlice*i - Math.PI/2); });
			
			d3.selectAll(".radarInvisibleCircle" + _this.id)
			.attr("cx", function(d,i){ return rScale2[i](d.value)*2 * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("cy", function(d,i){ return rScale2[i](d.value)*2 * Math.sin(angleSlice*i - Math.PI/2); });

			*/
		});
		

		// .on('mouseout', function(){
		// // 	//Bring blob to original style
		// 	d3.selectAll(".radarArea")
		// 		.transition().duration(500)
		// 		.attr("d", radarLine.radius(function(d,i) { return (rScale2[i](d.value)); }))
		// 		.style("fill", "#fffcf6")
		// 		.style("fill-opacity", "0");

		// 	d3.selectAll('.gridCircle' + _this.id)
		// 		.transition().duration(500)
		// 		.attr("r", function(d, i){return (radius)/cfg.levels*d;})
		// 		.style("stroke-opacity", "0");

		// 	d3.selectAll('.line' + _this.id)
		// 		.transition().duration(500)
		// 		.attr("x2", function(d, i){ return rScale(maxValue*1.0) * Math.cos(angleSlice*i - Math.PI/2); })
		// 		.attr("y2", function(d, i){ return rScale(maxValue*1.0) * Math.sin(angleSlice*i - Math.PI/2); })
		// 		.style("stroke-opacity", "0");
			
		// 	d3.selectAll('.legend' + _this.id)
		// 		.transition().duration(0)
		// 		.style("font-size", "0px");

		// 	d3.selectAll(".radar" + _this.id)
		// 		.transition().duration(500)
		// 		.attr("width",  (cfg.width + cfg.margin.left + cfg.margin.right))
		// 		.attr("height", (cfg.height + cfg.margin.top + cfg.margin.bottom));

		// 	d3.selectAll(".transformRadar" + _this.id)
		// 		.transition().duration(500)	
		// 		.attr("transform", "translate(" + ((cfg.width/2 + cfg.margin.left)) + "," + ((cfg.height/2 + cfg.margin.top)) + ")");
		// });
		
	//Create the outlines	
	// blobWrapper.append("path")
	// 	.attr("class", "radarStroke")
	// 	.attr("d", function(d,i) { return radarLine(d); })
	// 	.style("stroke-width", cfg.strokeWidth + "px")
	// 	.style("stroke", function(d,i) { return cfg.color(i); })
	// 	.style("fill", "none")
	// 	.on('mouseover', function(d,i){
	// 		d3.select(this)
	// 			.transition().duration(0)
	// 			.style("fill", "#0b4780")
	// 			.style("fill-opacity", 0.5);
	// 	})
	// 	.on('mouseout', function(){
	// 		d3.selectAll(".radarStroke")
	// 			.transition().duration(0)
	// 			.style("fill", "#fffcf6")
	// 			.style("fill-opacity", "0")
	// 	});
	
	// Append the circles
	blobWrapper.selectAll(".radarCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarCircle" + _this.id + " radarCircle")
		// .attr("r", cfg.dotRadius)
		.attr("r", 0)
		.attr("cx", function(d,i){ return rScale2[i](d.value)/3 * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale2[i](d.value)/3 * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0);


	//Append invisible circles for tooltip//
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle" + _this.id)
		.attr("r", 0)
		.attr("cx", function(d,i){ return rScale2[i](d.value)/3 * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale2[i](d.value)/3 * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			var newX =  parseFloat(d3.select(this).attr('cx'));
			var newY =  parseFloat(d3.select(this).attr('cy'));
			
			d3.selectAll(".radarCircle")
				.transition().duration(200)
				.attr("r", (k,p) => (p%data[0].length) == i ? 5:0)
				.style("fill-opacity", 1.0);

			d3.selectAll(".rank")
				.text((k,p) => _this.allData[p][i].rank);

			d3.selectAll(".rank" + _this.id)
				.text("");

			d3.selectAll(".line")
				.transition().duration(200)
				.style("stroke-opacity", (k,p) => (p%data[0].length) == i ? 1:0);
			
			d3.selectAll('.line' + _this.id)
				.transition().duration(100)
				// .attr("x2", function(d, i){ return rScale(maxValue*2.0) * Math.cos(angleSlice*i - Math.PI/2); })
				// .attr("y2", function(d, i){ return rScale(maxValue*2.0) * Math.sin(angleSlice*i - Math.PI/2); })
				.style("stroke-opacity", "1");
			
			d3.selectAll('.legend' + _this.id)
				.transition().duration(200)
				.style("fill", (k,p) => (p%data[0].length) == i ? "black":"gray")
				.attr("font-weight", (k,p) => (p%data[0].length) == i ? "bold":"")
				.style("font-size", (k,p) => (p%data[0].length) == i ? "13px":"10px");

			d3.selectAll('.radarArea' + _this.id)
				.style("stroke-opacity", 0);

			tooltip
				.attr('x', newX-15)
				.attr('y', newY-8)
				.text(d.rank)
				.attr("font-family", "HelveticaNeue-Light")
				.attr("font-weight", "bold")
      			.attr("font-size", 17)
				.transition().duration(100)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			// tooltip.transition().duration(200)
			// 	.style("opacity", 0);
		});
		
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	

	//HELPER FUNCTION//
	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan")
				.attr("x", x)
				.attr("y", y)
				.attr("dy", ++lineNumber * lineHeight + dy + "em")
				.text(word);
		  }
		}
	  });
	}//wrap
}//RadarChart
 },
  computed: {},
  mounted() {

            // const data = radialData;

      		var color = d3.scaleOrdinal()
			    .range(["#0b4780"]);
				
			var radarChartOptions = {
			//   w: width,
			//   h: height,
			//   margin: margin,
			  maxValue: 1.0,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};
			//Call function to draw the Radar chart
			this.RadarChart(`.radarChart`, this.allData, radarChartOptions)
			// console.log(radialData);
  }
}
</script>

<style scoped>
/* svg text{
	font-size:5px
} */

/* .legend5{
	transform: rotate(-90deg);
} */
</style>