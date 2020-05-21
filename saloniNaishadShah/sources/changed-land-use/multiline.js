var svgContainer = d3.select("#land-use")
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



//Draw the Rectangle
var trans_1 = 50
var trans_2 = 400

// var landuse = 357.5
var totalarea = 1000
// var forestarea = totalarea - (2*landuse)

var height = 60
var margin = 5


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
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", totalarea)
                            .attr("height", height*2)
                            .style("fill", "url(#trees)")
                            // .attr("fill", "#268C16")
                            .attr ("stroke", "#0d0d0d")
                            .attr("stroke-width", 10)
                            
var landuse_1 = svgContainer.append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("width", trans_1)
                            .attr("height", height)
                            .attr("fill", "#242424")
                            .attr ("stroke", "#0d0d0d")
                            .attr("stroke-width", 10)
                            
                            .transition()
                            .duration(10000)
                            .attr("width", trans_2)
                           
                            
var landuse_2 = svgContainer.append("rect")
                            .attr("x", 0)
                            .attr("y", height-5)
                            .attr("width", trans_1)
                            .attr("height", height)
                            .attr("fill", "#242424")
                            .attr ("stroke", "#0d0d0d")
                            .attr("stroke-width", 10)
                          
                            
                            .transition()
                            .duration(10000)
                            .attr("width", trans_2)
                        
                           
var landuse_3 = svgContainer.append("rect")
                            .attr("x", trans_2+(totalarea - (2*trans_2)))
                            .attr("y", 0)
                            .attr("width", trans_1)
                            .attr("height", height)
                            .attr("fill", "#242424")
                            .attr ("stroke", "#0d0d0d")
                            .attr("stroke-width", 10)
                            
                            .transition()
                            .duration(10000)
                            .attr("width", trans_2)
                           
                            // 
var landuse_4 = svgContainer.append("rect")
                            .attr("x", trans_2+(totalarea - (2*trans_2)))
                            .attr("y", height-5)
                            .attr("width", trans_1)
                            .attr("height", height)
                            .attr("fill", "#242424")
                            .attr ("stroke", "#0d0d0d")
                            .attr("stroke-width", 10)
                            
                            .transition()
                            .duration(10000)
                            .attr("width", trans_2)
                            
                            

                            
var text = svgContainer.append("text")
                        .attr("x", margin)
                        .attr("y", ((2*height)+(4*margin)))
                        .text("Farming, grazing of livestock, mining, and drilling combined account for more than half of all deforestation.")
                        .attr("font-family", "Montserrat")
                        .attr("font-weight", "600")
                        .attr("font-size",  "0.7em")
                        .attr("fill", "#242424")



