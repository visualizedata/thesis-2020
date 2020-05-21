console.log("Hello World")
 
var svgContainer = d3.select("#forest-area")
                    .append("div")
                   .classed("svg-container", true) //container class to make it responsive
                   .append("svg")
                   //responsive SVG needs these 2 attributes and no width and height attr
                   .attr("preserveAspectRatio", "xMinYMin meet")
                   .attr("viewBox", "0 0 1015 200")
                   //class to make it responsive
                   .classed("svg-content-responsive", true); 
                   
var background = svgContainer.append("rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("fill", "#0d0d0d");

// var svgContainer = d3.select("body").append("svg")
//                                     .attr("width", 2000)
//                                     .attr("height", 2000);

//Draw the Rectangle
var forestarea = 307
// var forestareabefore = 316
var totalarea = 1000
var difference = totalarea - forestarea
var height = 50
var margin = 10
var wildlife = 800
var otherlife = totalarea - wildlife

var pattern = svgContainer .append('defs')
                            .append('pattern')
                            .attr('id', 'trees')
                            .attr('patternUnits', 'userSpaceOnUse')
                            .attr('width', 10)
                            .attr('height', 10)
                            .append('circle')
                            .attr("cx", 5)
                            .attr("cy", 5)
                            .attr('r', 3.5)
                            .attr('fill','#268C16')
                            .attr ("stroke", "#f2f2f2")
                            .attr("stroke-width", 0.25)
                            

var forest = svgContainer.append("rect")
                            .attr("x", 5)
                            .attr("y", 5)
                            .attr("width", forestarea)
                            .attr("height", height)
                            .style("fill", "url(#trees)")
                            // .attr('fill','#268C16')
                            .on('mouseover', function(d, i) {
                                
                            })
                            .on('mouseout', function(d, i) {
                              console.log("mouseout", d);
                            });
 
var other = svgContainer.append("rect")
                            .attr("x", 10+forestarea)
                            .attr("y", 5)
                            .attr("width", difference)
                            .attr("height", height)
                            .attr("fill", "#242424")
                            
                            
var wildlife = svgContainer.append("rect")
                            .attr("x", 5)
                            .attr("y", height+margin)
                            .attr("width", wildlife)
                            .attr("height", height)
                            .style("fill", "url(#trees)")
                            // .attr('fill','#268C16')
 
var otherlife = svgContainer.append("rect")
                            .attr("x", 810)
                            .attr("y", height+margin)
                            .attr("width", otherlife)
                            .attr("height", 50)
                            .attr("fill", "#242424")
                            
var text = svgContainer.append("text")
                        .attr("x", 5)
                        .attr("y", ((2*height)+(3*margin)))
                        .text("Forests cover 31 percent of the world's land surface, while being home to 80% of the world’s terrestrial biodiversity.")
                        .attr("font-family", "Montserrat")
                        .attr("font-weight", "600")
                        .attr("font-size",  "1 em")
                        .attr("fill", "#242424")
