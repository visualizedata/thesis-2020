d3.csv("ethnographic_findings.csv", function(data) {
    console.log(data)
    
    var svgContainer = d3.select("#land_grab_human")
                        .append("div")
                        .classed("svg-container", true) //container class to make it responsive
                        .append("svg")
                        //responsive SVG needs these 2 attributes and no width and height attr
                        .attr("preserveAspectRatio", "xMinYMin meet")
                        .attr("viewBox", "0 0 1015 600")
                        //class to make it responsive
                        .classed("svg-content-responsive", true); 


    d3.select("#local_confusion").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/local_confusion.svg")
        // .attr('width', '100%')
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
    d3.select("#financial_benefits").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/financial_benefits.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
    d3.select("#negetive_view").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/negetive_view.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
     d3.select("#implementationMRV").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/negetive_view.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
      d3.select("#boundaries").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/boundaries.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
    d3.select("#influence").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/influence.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
    d3.select("#property_demarcation").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/property_demarcation.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
     d3.select("#social").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/landgrab.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
     d3.select("#forest_clearance").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/forest_clearance.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
     d3.select("#leakage").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/leakage.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    d3.select("#violation").on('click', function(){
         var myimage = svgContainer.append('image')
        .attr('xlink:href', "assets/images/violation.svg")
        // .attr('width', 500)
        .attr('height', '100%')
        .attr("transform","translate(-10,-10)")
        .style('visibility', 'visible')
        .attr("id", "clip_1")
        .style("opacity", "1");
    })
    
    
    
})
