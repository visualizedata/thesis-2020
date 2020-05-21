// console.log("Hello World")
 
  // var margin = {top: 20, right: 20, bottom: 20, left: 50},
  //     width = 300 - margin.left - margin.right,
  //     height = 220 - margin.top - margin.bottom;

  // var body = d3.select("#charts");

  // // var parseDate = d3.time.format("%Y-%m-%d").parse;

  // var xScale = d3.time.scale()
  //   .range([0, width]);

  // var yScale = d3.scale.linear()
  //   .range([height, 0]);

  // var xAxis = d3.svg.axis()
  //   .scale(xScale)
  //   // .ticks(d3.time.weeks)
  //   // .tickSize(-height)
  //   .orient("bottom");

  // var yAxis = d3.svg.axis()
  //   .scale(yScale)
  //   .orient("left");

  // var line = d3.svg.line()
  //   .x(function(d) { return xScale(d.year); })
  //   .y(function(d) { return yScale(d.cumulative); });

  var divisionOrder = ['west','central','east'];

  d3.csv('deforest.csv', function(error, data) {

  console.log(data)

    // xScale.domain(d3.extent(data, function(d) { return d.date; })).nice()
    // yScale.domain([-60,60])

    // var nestedGameData = d3.nest()
    //   .key(function(d) { return d.league; })
    //   .key(function(d) { return d.division; })
    //   .key(function(d) { return d.team; })
    //   .entries(data);

    //   // Get cumulative win/loss
    //   nestedGameData.forEach(function(league) {
    //     league.values.forEach(function(division) {
    //       division.values.forEach(function(team) {
    //         var counter = 0;
    //         team.values.forEach(function(d) {
    //           d.cumulative = counter + d.win_loss;
    //           counter = d.cumulative;
    //         })
    //       })
    //     })

    //     league.values.sort(function(a,b) {
    //         return divisionOrder.indexOf(a.key) - divisionOrder.indexOf(b.key);
    //     });
    //   });

    // var leagueGroup = body.selectAll(".league")
    //     .data(nestedGameData)
    //     .enter().append("div")
    //       .attr("class", "league")

    // leagueGroup.append("h2")
    //   .text(function(d) { return d.key; })

    // var divisionGroup = leagueGroup.selectAll(".division")
    //     .data(function(d) { return d.values; })
    //     .enter().append("svg")
    //       .attr("class","division")
    //       .attr("width", width + margin.left + margin.right)
    //       .attr("height", height + margin.top + margin.bottom)
    //     .append("g")
    //       .attr("transform","translate(" + margin.left + "," + margin.top + ")")

    // divisionGroup.append("text")
    //     .text(function(d) { return d.key; })

    // divisionGroup.append("line")
    //   .attr("x1", 0)
    //   .attr("x2", width)
    //   .attr("y1", yScale(0))
    //   .attr("y2", yScale(0))
    //   .style("stroke","#000")
    //   .style("stroke-dasharray",1)
    //   .style("stroke-width",.25)

    // divisionGroup.selectAll(".teams")
    //     .data(function(d) { return d.values; })
    //   .enter().append("path")
    //     .attr("class","teams")
    //     .attr("d", function(d) { return line(d.values); });

    // divisionGroup.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform","translate(0," + height + ")")
    //   .call(xAxis)
    //   .selectAll("g")
    //   .classed("major", function(d) {
    //     return d.getDate() <= 7;
    //   });

    // divisionGroup.append("g")
    //   .attr("class", "y axis")
    //   .call(yAxis);

  })