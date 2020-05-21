d3.csv("deforest.csv", convertTextToNumbers, function(error, data) {

    var margin = {top: 8, right: 15, bottom: 20, left: 40},
        width = 180 - margin.left - margin.right,
        height = 120 - margin.top - margin.bottom;
    
    var xScale = d3.scaleLinear()
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .range([height, 0]);
      
    var yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(3);

    // var xAxis = d3.axisBottom(xScale)
    // //   .scale(xScale)
    //   .ticks(1)
    //   .tickSize(height)
    //   d3.selectAll("path.domain").remove();

var area = d3.area()
    .x(function(d) { return xScale(d.year); })
    .y0(height)
    .y1(function(d) { return yScale(d.value); });

var line = d3.line()
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.value); });


  
  xScale.domain(d3.extent(data, function(d) { return d.year; }));
  yScale.domain([0,d3.max(data, function(d) { return 40000 ; })]);
  
  // Nest data by subject.
  var cities = d3.nest()
      .key(function(d) { return d.country; })
      .entries(data);
  
//   var nz = cities.filter(function(d){ return d.key === "NZ" });
//   cities = cities.filter(function(d){ return d.key !== "NZ" });
  

  // Add an SVG element for each country
  var svg = d3.select("#charts").selectAll("svg")
      .data(cities)
    .enter().append("svg")
    .style("margin-bottom", "10px")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      ;
  
//   svg.append("path")
//       .attr("class", "line")
//       .attr("d", function(d) {return line(nz[0].values); })
//   		.style("stroke", "lightgrey");
  

  // Add the area path elements
  /*svg.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); });*/
  // Add the line path elements
    svg.append("path")
      .attr("class", "line")
      .attr("d", function(d) {return line(d.values); })
      .style("stroke", "#FFC300");
      
    // svg.append("path")
    //   .attr("class", "line")
    //   .attr("d", function(d) {return line(d.deforest_30); })
    //   .style("stroke", "#0C59F2");
      
    // svg.append("path")
    //   .attr("class", "line")
    //   .attr("d", function(d) {return line(d.deforest_50); })
    //   .style("stroke", "#268C16");


//   // Add a labels
//   svg.append("text")
//       .attr("x", (width + 10)/2)
//       .attr("y", height - 85)
//       .style("text-anchor", "middle")
//       .style("font-size", "0.7em")
//       .attr("fill", "#f2f2f2")
//   		.text(function(d) { return d.key; });	
       
//   svg.append("text")
//   	.text(xScale.domain()[0])
//       .attr("x", 0)
//       .attr("y", height + 15)
//       .style("text-anchor", "start")
//       .style("font-size", "0.6em")
//       .attr("fill", "#f2f2f2");
  
//   svg.append("text")
//   	.text(xScale.domain()[1])
//       .attr("x", width)
//       .attr("y", height + 15)
//       .style("text-anchor", "end")
//       .style("font-size", "0.6em")
//       .attr("fill", "#f2f2f2");
      
//   //add axes
// 	svg.append("g").attr("id", "yAxisG").call(yAxis);
// 	d3.selectAll("path.domain").style("stroke", "#f2f2f2");
// 	d3.selectAll("line").style("stroke", "#f2f2f2");
	
// 	svg.append("g").attr("id", "xAxisG").call(xAxis);
// 	d3.selectAll("path.domain").style("stroke", "#f2f2f2");
// 	d3.selectAll("line").style("stroke", "#f2f2f2");
	
});

function convertTextToNumbers(d) {
  d.year = +d.year;
  d.value = +d.value;
  return d;
}




// var margin = {top: 8, right: 15, bottom: 20, left: 40},
//     width = 180 - margin.left - margin.right,
//     height = 120 - margin.top - margin.bottom;

// var xScale = d3.scaleLinear()
//     .range([0, width]);

// var yScale = d3.scaleLinear()
//     .range([height, 0]);
  
// var yAxis = d3.axisLeft()
//   .scale(yScale)
//   .ticks(3);

// // var xAxis = d3.axisBottom(xScale)
// // //   .scale(xScale)
// //   .ticks(1)
// //   .tickSize(height)
// //   d3.selectAll("path.domain").remove();

// var area = d3.area()
//     .x(function(d) { return xScale(d.year); })
//     .y0(height)
//     .y1(function(d) { return yScale(d.value); });

// var line = d3.line()
//     .x(function(d) { return xScale(d.year); })
//     .y(function(d) { return yScale(d.value); });

// d3.csv("data.csv", convertTextToNumbers, function(error, data) {
  
//   xScale.domain(d3.extent(data, function(d) { return d.year; }));
//   yScale.domain([0,d3.max(data, function(d) {  return d.value; })]);
  
//   // Nest data by subject.
//   var cities = d3.nest()
//       .key(function(d) { return d.country; })
//       .entries(data);
  
// //   var nz = cities.filter(function(d){ return d.key === "NZ" });
// //   cities = cities.filter(function(d){ return d.key !== "NZ" });
  

//   // Add an SVG element for each country
//   var svg = d3.select("#charts").selectAll("svg")
//       .data(cities)
//     .enter().append("svg")
//     .style("margin-bottom", "10px")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//       ;
  
// //   svg.append("path")
// //       .attr("class", "line")
// //       .attr("d", function(d) {return line(nz[0].values); })
// //   		.style("stroke", "lightgrey");
  

//   // Add the area path elements
//   /*svg.append("path")
//       .attr("class", "area")
//       .attr("d", function(d) { return area(d.values); });*/
//   // Add the line path elements
//     svg.append("path")
//       .attr("class", "line")
//       .attr("d", function(d) {return line(d.values); })
//       .style("stroke", "#FFC300");
      
//     svg.append("path")
//       .attr("class", "line")
//       .attr("d", function(d) {return line(d.values); })
//       .style("stroke", "#0C59F2");
      
//     svg.append("path")
//       .attr("class", "line")
//       .attr("d", function(d) {return line(d.values); })
//       .style("stroke", "#268C16");


//   // Add a labels
//   svg.append("text")
//       .attr("x", (width + 10)/2)
//       .attr("y", height - 85)
//       .style("text-anchor", "middle")
//       .style("font-size", "0.7em")
//       .attr("fill", "#f2f2f2")
//   		.text(function(d) { return d.key; });	
       
//   svg.append("text")
//   	.text(xScale.domain()[0])
//       .attr("x", 0)
//       .attr("y", height + 15)
//       .style("text-anchor", "start")
//       .style("font-size", "0.6em")
//       .attr("fill", "#f2f2f2");
  
//   svg.append("text")
//   	.text(xScale.domain()[1])
//       .attr("x", width)
//       .attr("y", height + 15)
//       .style("text-anchor", "end")
//       .style("font-size", "0.6em")
//       .attr("fill", "#f2f2f2");
      
//   //add axes
// 	svg.append("g").attr("id", "yAxisG").call(yAxis);
// 	d3.selectAll("path.domain").style("stroke", "#f2f2f2");
// 	d3.selectAll("line").style("stroke", "#f2f2f2");
	
// 	svg.append("g").attr("id", "xAxisG").call(xAxis);
// 	d3.selectAll("path.domain").style("stroke", "#f2f2f2");
// 	d3.selectAll("line").style("stroke", "#f2f2f2");
	
// });

// function convertTextToNumbers(d) {
//   d.year = +d.year;
//   d.value = +d.value;
//   return d;
// }




