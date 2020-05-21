var format = d3.format(",");
    var landGrab;
    var filtersSelected;

    var filters = {
      'All': [
        "agriculture",
        "biofuels",
        "carbon_sequestration_REDD",
        "conservation",
        "industry",
        "livestock",
        "logging",
        "mining",
        "non_food_agricultural_commodities",
        "oil_gas_extraction",
        "renewable_energy",
        "timber_plantation",
        "tourism",
        "unspecified"
      ],
      'Farming and Livestock': [
        "agriculture",
        "livestock",
        "non_food_agricultural_commodities",
        "timber_plantation"
      ],
      'Industrial': [
        'carbon_sequestration_project',
        'industry',
        'logging',
        'tourism',
      ],
      'Energy': [
        'biofuels',
        'mining',
        'oil_gas_extraction',
        'renewable_energy'
      ],
      'Other': [
        'conservation',
        'unspecified'
      ]
    }

    // Set tooltips
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function (d) {
        return "<strong>Country: </strong><span class='details'>" + d.properties.country + "<br></span>" + "<strong>Parent Company: </strong><span class='details'>" + d.properties.parent_companies + "<br></span>" + "<strong>Negotiation Status: </strong><span class='details'>" + d.properties.negotiation_status + "<br></span>" + "<strong>Reason for Grab: </strong><span class='details'>" + getReason(d.properties) + "</span>";
      })

    function getReason(properties) {
      const newText = [];
      for (property in properties) {
          if( properties[property] === "yes") {
            const text = property.toLowerCase()
                    .split('_')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            newText.push(text);
          }
      }
      return newText.join(",");
    }

    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 1220 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var color = d3.scaleThreshold()
      .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
      .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

    var path = d3.geoPath();

    var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('class', 'map');


    var projection = d3.geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

    svg.call(tip);


    queue()
      .defer(d3.json, "world_countries.json")
      .defer(d3.json, "landgrab_final.geojson")
      .await(ready)

    function specificPoint(value) {
      landGrab = JSON.parse(window.localStorage.getItem('landGrab'));
      data = JSON.parse(window.localStorage.getItem('landGrab'));
      landGrab.features = landGrab.features.filter((d) => d.properties.cont === value);
      svg.selectAll("circle").remove()
      createDots(landGrab, data, filtersSelected.isFilter, filtersSelected.value, filtersSelected.isAll)
    }

    function calculateBarLength(newLandGrab) {
      var caribbean = _.countBy(newLandGrab, function (rec) {
          return rec.properties.cont === "Caribbean-Latin"
        }).true;
        var africa = _.countBy(newLandGrab, function (rec) {
          return rec.properties.cont === "Africa"
        }).true;
        var asia = _.countBy(newLandGrab, function (rec) {
          return rec.properties.cont === "Asia-Pacific"
        }).true;
        let el = document.getElementsByClassName('child-bar-1');
        el[0].style.width = (caribbean / (caribbean + asia + africa) ) * 100 + '%'
        el = document.getElementsByClassName('child-bar-2');
        el[0].style.width = (africa / (caribbean + asia + africa) ) * 100 + '%'
        el = document.getElementsByClassName('child-bar-3');
        el[0].style.width = (asia / (caribbean + asia + africa) ) * 100 + '%'
    }

    function createDots(landGrab, data, isFilter, value, isAll) {
      let newLandGrab = []
        filtersSelected = {
          isFilter,
          value,
          isAll,
        };

      if (isFilter && !isAll) {
        newLandGrab = landGrab.features.filter((d) => d.properties[value] === "yes");
        calculateBarLength(newLandGrab);
      } else if (isFilter && isAll) {
        landGrab.features.forEach((item) => {
          for (const key in item.properties) {
            if (filters[value].includes(key) && item.properties[key] === "yes") {
              newLandGrab.push(item)
            }
          }
        })
        calculateBarLength(newLandGrab);
      } else {
        newLandGrab = landGrab.features
      }

      let newData = []
      for (const continent of newLandGrab) {
        const country = data.features.find(c => c.properties.name === continent.properties.country)
        if (country) {
          newData.push(country)
        }
      }

      svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(newData)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function (d) {
          return '#262626'
        })
        .style("stroke", "#8C8C8C")
         .style("stroke-width", 0.1);

      var rodents = svg.append("g");
      rodents.selectAll("circle")
        .data(newLandGrab)
        .enter()
        .append("circle")
        .on('mouseover', function (d) {
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke", "#f2f2f2")
            .style("stroke-width", 3);
        })
        .on('mouseout', function (d) {
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke", "none")
            .style("stroke-width", 0.3);
        })
        .attr("cx", function (d) {
          return projection([d.properties.longitude, d.properties.latitude])[0];
        })
        .attr("cy", function (d) {
          return projection([d.properties.longitude, d.properties.latitude])[1];
        })
        .attr("r", 1)
        .style("fill", function (d) {
          if (d.properties.cont === "Africa") {
            return "#FFC300"
          } else if (d.properties.cont === "Asia-Pacific") {
            return "#0C59F2"
          } else if (d.properties.cont === "Caribbean-Latin") {
            return "#268C16"
          }
        });
    }

    function secondaryItems(key) {
      document.getElementById("secondary").innerHTML = ""
      for (const iterator of filters[key]) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('bar');
        const text = iterator.toLowerCase()
                    .split('_')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
        var newContent = document.createTextNode(text);
        newDiv.onclick = function (e) {
          filteredDots(e, iterator)
        }
        newDiv.appendChild(newContent);

        var currentDiv = document.getElementById("secondary").appendChild(newDiv)
      }

    }

    function filteredDots(e, key, isAll) {
      var elements = document.getElementsByClassName(e.target.attributes[0].value);
      [].forEach.call(elements, function(el) {
          el.className = el.className.replace(/\active\b/, "");
      });
      e.target.classList.add('active');
      landGrab = JSON.parse(window.localStorage.getItem('landGrab'));
      data = JSON.parse(window.localStorage.getItem('landGrab'));
      svg.selectAll("circle").remove()
      createDots(landGrab, data, true, key, isAll)
    }

    function ready(error, data, landGrab) {
      console.log(landGrab)
      landGrab = landGrab
      window.localStorage.setItem('landGrab', JSON.stringify(landGrab))
      window.localStorage.setItem('data', JSON.stringify(data))

      svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", "#0d0d0d")
        .style('stroke', '#f2f2f2')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "#f2f2f2")
        .style('stroke-width', 0.3);

      createDots(landGrab, data)

      for (const key in filters) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('bar1');
        var newContent = document.createTextNode(key);
        newDiv.onclick = function (e) {
          secondaryItems(e.target.innerHTML)
          filteredDots(e, key, true)
        }
        newDiv.appendChild(newContent);

        var currentDiv = document.getElementById("main").appendChild(newDiv)
        if (key === "All") {
          for (const iterator of filters[key]) {
            var newDiv = document.createElement("div");
            newDiv.classList.add('bar');
            const text = iterator.toLowerCase()
                      .split('_')
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ');
            var newContent = document.createTextNode(text);
            newDiv.onclick = function (e) {
              filteredDots(e, iterator)
            }
            newDiv.appendChild(newContent);
            var currentDiv = document.getElementById("secondary").appendChild(newDiv)
          }
        }
      }

      svg.append("path")
        .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id; }))
        .attr("class", "names")
        .attr("d", path);
    }
    
  
  // var g = svg.append("g");
  var zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', function() {
          svg.selectAll('path')
          .attr('transform', d3.event.transform);
          svg.selectAll("circle")
          .attr('transform', d3.event.transform);
});

svg.call(zoom);