let viewboxData = 0.26;

mapboxgl.accessToken =
  "pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg";
var map = new mapboxgl.Map({
  container: "myMap",
  style: "mapbox://styles/nourzein/cka393eeg06p51ipjygpew5es",
  //"mapbox://styles/nourzein/ck8za6okk077x1ipcyyq0rb0a",
  center: [-73.9484596428768, 40.739295063897642],
  maxZoom: 22,
  minZoom: 12,
  zoom: 12,
  pitch: 20,
  bearing: 10
});

//search box
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);

//geolocate the user
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
//pop ups
map.on("click", "reduced-data22", function(e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var address = e.features[0].properties.address;
  var landuse = e.features[0].properties.landuse;
  var area = e.features[0].properties.area;
  var owner_type = e.features[0].properties.owner_type;
  //console.log(address);
  if (owner_type === "X") {
    owner_type = "Public: Tax-Exempt";
  }
  if (owner_type === undefined) {
    owner_type = "Private";
  }
  if (owner_type === "P") {
    owner_type = "Private";
  }
  if (owner_type === "M") {
    owner_type = "Public";
  }
  if (owner_type === "O") {
    owner_type = "Public";
  }
  if (owner_type === "C") {
    owner_type = "Public: City-Owned";
  }
  if (landuse === "1") {
    landuse = "One & Two Family Buildings";
  }
  if (landuse === "2") {
    landuse = "Multi-Family Walk-Up Buildings";
  }
  if (landuse === "3") {
    landuse = "Multi-Family Elevator Buildings";
  }
  if (landuse === "4") {
    landuse = "Mixed Residential & Commercial Buildings";
  }
  if (landuse === "5") {
    landuse = "Commercial & Office Buildings";
  }
  if (landuse === "6") {
    landuse = "Industrial & Manufacturings";
  }
  if (landuse === "7") {
    landuse = "Transportation & Utility";
  }
  if (landuse === "8") {
    landuse = "Public Facilities & Institutions";
  }
  if (landuse === "9") {
    landuse = "Open Space & Outdoor Recreation";
  }
  if (landuse === "10") {
    landuse = "Parking Facilities";
  }
  if (landuse === "11") {
    landuse = "Vacant Land";
  }

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup({ className: "map-popup" })
    .setLngLat(e.lngLat)
    .setHTML(
      `<ul> <li>Address: ${address}<li>Landuse Category: ${landuse}<li>Ownership: ${owner_type} Property<li>Area: ${Math.round(
        area
      )} ft<sup>2</sup> </ul>`
    )
    .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on("mouseenter", "reduced-data22", function() {
  map.getCanvas().style.cursor = "pointer";
});

// Change it back to a pointer when it leaves.
map.on("mouseleave", "reduced-data22", function() {
  map.getCanvas().style.cursor = "";
});

function rotateCamera(timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, { duration: 0 });
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}

let areaQ = [1000, 275000];
let heightQ = [5.89, 430.25];

function runSlider() {
  const w = 150;
  var scaleA = d3
    .scaleLinear()
    .domain([1000, 275000])
    .range([w, 0]);

  var sliderArea = d3
    .sliderBottom(scaleA)
    .width(w)
    .ticks(4)
    .tickFormat(d3.format("~s"))
    .default([1000, 275000])
    .fill("#00b099")
    .displayValue(false)
    .on("onchange", val => {
      d3.select("#valueArea").text(val.map(d3.format("~s")).join("-"));
      areaQ = val;
      queryChanged();
    });

  d3.select("#sliderArea")
    .append("svg")
    .attr("width", 180)
    .attr("height", 80)
    .append("g")
    .attr("transform", "translate(5,5)")
    .call(sliderArea);

  var scaleH = d3
    .scaleLinear()
    .domain([5.89, 430.25])
    .range([w, 0]);

  var sliderHeight = d3
    .sliderBottom(scaleH)
    .width(w)
    .ticks(4)
    .tickFormat(d3.format("~s"))
    .default([5.89, 430.25])
    .fill("#6ae27a")
    .displayValue(false)
    .on("onchange", val => {
      d3.select("#valueHeight").text(val.map(d3.format("~s")).join("-"));
      heightQ = val;
    });

  d3.select("#sliderHeight")
    .append("svg")
    .attr("width", 200)
    .attr("height", 70)
    .append("g")
    .attr("transform", "translate(30,30)")
    .call(sliderHeight);
}
runSlider();

//fetches the filter needs (this is the going and coming back function)
async function postdata(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  //   console.log(response);
  return response.json(); // parses JSON response into native JavaScript objects
}

//map.on("load", drawMap);

// const slider = $("#areaSlider");
// let area;
// slider.oninput = function() {
//   area = this.value;
// };

///the one that works
// var areaSlider = document.querySelector("#areaSlider"),
//   area = areaSlider.value;
// console.log("initial" + area);
// areaSlider.addEventListener(
//   "change",
//   function() {
//     area = this.value;
//   },
//   0
// );

// const slider = document.getElementById("areaSlider");
// let area;
// slider.oninput = function() {
//   area = this.value;
// };

// let area = document.getElementById("areaSlider").value;
// console.log(area);
// let height = document.getElementById("heightSlider").value;
// console.log(height);

//needs to do post data, the fetch
function runBuildingQuery() {
  document.getElementById("filtering").style.display = "none";
  document.getElementById("loading").style.display = "block";
  const public = $("#public-property").is(":checked");
  const private = $("#private-property").is(":checked");
  const residential = $("#residential").is(":checked");
  const commercial = $("#commercial").is(":checked");
  const mixed = $("#mixed").is(":checked");
  const manufacturing = $("#manufacturing").is(":checked");
  const publicFacilities = $("#public-facilities").is(":checked");
  const other = $("#other").is(":checked");

  //const mixed = $("#mixed-property").is(":checked");
  document.getElementById("filter-button").disabled = true;

  postdata("/mapFilter", {
    query: {
      public,
      private,
      areaQ,
      residential,
      commercial,
      mixed,
      manufacturing,
      publicFacilities,
      other
    }
  })
    .then(result => {
      //console.log(JSON.stringify(result));
      //console.log(result.areaByBorough);
      // console.log(result.filteredIds);

      drawMap(result.filteredIds);
      getFilteredTotal(result.areaByBorough);
      runBarPotential(result.areaByBorough, newCityPotential);
      console.log("done");
      document.getElementById("screen").style.display = "none";
      document.getElementById("filtering").style.display = "block";
      document.getElementById("loading").style.display = "none";
    })
    //drawMap(result)) //what will go on the map (leaflet stuff)
    .catch(err => console.log("err", err));
}

function runBoroughQuery() {
  // console.log("running", viewboxData);
  postdata("/boroughAreas", {
    query: {}
  })
    .then(result => {
      //console.log(JSON.stringify(result));
      runBarPotential(result, 0.19);
      //console.log(result);
    })

    .catch(err => console.log("err", err));
}

setTimeout(runBoroughQuery, 1000);

function drawMap(roofs) {
  //var features = map.getLayer("reduced-data2");
  //console.log(roofs);

  if (roofs.length !== 0) {
    const roofFilter = ["match", ["get", "fid"], roofs, true, false];
    map.setFilter("reduced-data22", roofFilter); //check if it returns a promise, asynchronous event
    setTimeout(runBenefitsCal, 2000);
  } else {
    document.getElementById("queryComment").innerHTML = "No Green Roofs";
  }
}

//leafelt attempt
// function drawMap(roofs) {
//   L.geoJSON(roofs, {
//     style: function(feature) {
//       return { color: "#00ff00" };
//     }
//   }).addTo(mymap);
// }

//bar chart d3

//aggrerate the dataset to ready format
// var dataset = [
//   ["Brooklyn", 211698634],
//   ["Bronx", 92264059],
//   ["Manhattan", 73294548],
//   ["Queens", 169821259],
//   ["Staten_Island", 13700359]
// ];

map.on("load", runBenefitsCal);

map.on("moveend", runBenefitsCal);
// map.on("render", function() {
//   console.log("A render event occurred.");
//   runBenefitsCal();
// });

const cityPotential = 0.19;
const citywideArea = 1667844556; //all area including potentials
const citywideGreen = 329278955;
const brooklynArea = 500803509;
const bronxArea = 223613971;
const manhattanArea = 182854906;
const queensArea = 578394481;
const statenIslandArea = 182177690;
let newCityPotential = 0.19; //gets updated by filtered total

let areas = 0; //potential areas
let totalAreas = 0; //building areas

function getFilteredTotal(values) {
  let filteredAreas = 0;
  //console.log(values);
  values.forEach(value => {
    filteredAreas += value.count;
  });
  //console.log({ filteredAreas });
  newCityPotential = filteredAreas / citywideArea;
  let formatedCityPotential =
    Math.round((1000 * filteredAreas) / citywideArea) / 10;
  document.getElementById(
    "filteredPercentage"
  ).innerHTML = `${formatedCityPotential}%`;
  //console.log(newBreakdown);
}

function runBenefitsCal() {
  //if filterbox not display non {}
  var features = map.queryRenderedFeatures({
    layers: ["reduced-data22"]
  });
  var features1 = map.queryRenderedFeatures({
    layers: ["bs"]
  });

  //console.log(features);
  let areas = 0;
  let totalAreas = 0;

  // document.getElementById("citywide-percentage").innerHTML = `${(citywideGreen /
  //   citywideArea) *
  //   100}%`;
  features.forEach(feature => {
    areas += feature.properties.area;
    //   var text = feature.properties.shape_area;
    //   var integer = parseInt(text, 10);
    //   if (!isNaN(integer)) {
    //     totalAreas += integer;
    //   }
    //   // console.log(integer);
  });

  features1.forEach(feature => {
    totalAreas += feature.properties.shape_area;
  });

  if (Number.isNaN(totalAreas)) {
    // viewboxData = 0;
    viewboxData = areas / 1667844556;
  }
  if (totalAreas === 0) {
    totalAreas = 1667844556;
    viewboxData = areas / totalAreas;
  } else {
    viewboxData = areas / totalAreas;
  }
  console.log(areas);
  console.log(totalAreas);
  let viewboxHeight = h - yScale(viewboxData);
  //console.log(viewboxHeight);

  if (Number.isNaN(viewboxHeight)) {
    viewboxHeight = 0;
    viewboxData = 0;
  }

  d3.select("#_6")
    .transition()
    .attr("y", yScale(viewboxData))
    .attr("height", viewboxHeight);

  // d3.select(".tooltip").text(
  //   Math.round((1000 * viewboxData) / 10) +
  //     "%" +
  //     " of " +
  //     "Map Region" +
  //     " rooftops can be green roofs."
  // );

  d3.select("#text6")
    .transition()
    .text(function(d) {
      return Math.round((1000 * viewboxData) / 10) + "%";
    })
    .attr("x", 374)
    .attr("y", d => {
      return yScale(viewboxData) - 15;
    });

  //console.log(viewboxData);
  //console.log({ totalAreas, areas }, areas / totalAreas);

  function formatNumber(num) {
    //num = oneDecimalPlace(num);
    //return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return d3.format(".3s")(num);
    //num.toPrecision(3);
  }
  function oneDecimalPlace(num) {
    return Math.round(num * 10) / 10;
  }
  let totalRain = 28.02 * totalAreas;
  let greenRain = 28.02 * areas * 0.5;
  let greenHeat = 28.02 * areas * 0.3;
  let formatedArea = formatNumber(areas);
  let gallonsRetained = formatNumber(totalRain - greenRain);
  let areaPercentage = new Intl.NumberFormat("en-IN", {
    style: "percent",
    percent: "JPY"
  }).format(areas / totalAreas);
  let habitatPercentage = new Intl.NumberFormat("en-IN", {
    style: "percent",
    percent: "JPY"
  }).format(areas / totalAreas);

  let waterPercentage = new Intl.NumberFormat("en-IN", {
    style: "percent",
    percent: "JPY"
  }).format(1 - (totalRain - greenRain) / totalRain);

  let heatPercentage = new Intl.NumberFormat("en-IN", {
    style: "percent",
    percent: "JPY"
  }).format(1 - (totalRain - greenHeat) / totalRain);

  document.getElementById("habitat-benefit").innerHTML = formatedArea;
  document.getElementById(
    "habitat-benefit-percentage"
  ).innerHTML = habitatPercentage;
  document.getElementById(
    "water-benefit-percentage"
  ).innerHTML = waterPercentage;
  // document.getElementById("heat-benefit-percentage").innerHTML = heatPercentage;
  document.getElementById("water-benefit").innerHTML = gallonsRetained;
  document.getElementById("area-stats").innerHTML = areaPercentage;
  runPotentialDonut(totalAreas, areas);
  let region = Math.round((1000 * areas) / totalAreas / newCityPotential) / 10;
  document.getElementById("difference").innerHTML = `${region}%`;
  //runBenefitsBarChart(areas);
}

const margin = { top: 10, right: 20, bottom: 50, left: 60 },
  w = 420;
//window.innerWidth * 0.4 - margin.left - margin.right,
h = 290;
//window.innerHeight - margin.top - margin.bottom;

var svg = d3
  .select(".pBar")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.left + margin.right);
var group = svg
  .append("g")
  .attr("id", "bigG")
  .attr("transform", "translate(" + margin.top + ", 0 )");
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// svg
//   .append("defs")
//   .append("pattern")
//   .attr("id", "pattern-chevron")
//   .attr("x", 0)
//   .attr("y", 0)
//   // .attr("patternUnits", "objectsBoundingBox")
//   .attr("width", 10)
//   .attr("height", 1)
//   .append("image")
//   // .attr("x", 0)
//   // .attr("y", 0)
//   // .attr("viewbox", "0 0 10 10")
//   // .attr("width", 225)
//   // .attr("height", 540)
//   .attr("xlink:href", "./images/tile.png");

// svg.select("defs").append("pattern")
var xScale = d3
  .scaleBand()
  .range([0, w])
  .padding(0.2);

xAxis = group.append("g").attr("transform", "translate(0," + h + ")");

var yScale = d3
  .scaleLinear()
  .range([h, 0])
  .domain([
    0.01,
    0.5
    // d3.max(sortedData, d => {
    //   return d.count / citywideArea; //changed d[1]
    // })
  ]);

// yAxis = svg.append("g").attr("class", "myYaxis");

var tooltip = d3
  .select("body")
  .insert("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function runBarPotential(dataset, newCityData) {
  //included filtered dataset and view box
  //onsole.log(dataset);
  const sortedData = dataset
    // .sort(function(b, a) {
    //   return a.count - b.count;
    // })// to sort by size
    .sort(function(a, b) {
      var textA = a._id.toUpperCase();
      var textB = b._id.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
    .filter(x => x._id)
    .filter(x => x.count);
  // })
  sortedData[0].count = sortedData[0].count / bronxArea;
  sortedData[1].count = sortedData[1].count / brooklynArea;
  sortedData[2].count = sortedData[2].count / manhattanArea;
  sortedData[3].count = sortedData[3].count / queensArea;
  sortedData[4].count = sortedData[4].count / statenIslandArea;
  let newCity = {
    _id: "NYC",
    count: newCityData
  };
  sortedData.push(newCity);

  let viewbox = {
    _id: "Map Region",
    count: viewboxData
  };
  sortedData.push(viewbox);

  //console.log(sortedData);
  xScale.domain(
    sortedData.map(d => {
      return d._id;
    })
  );
  xAxis.call(d3.axisBottom(xScale));
  xAxis
    .selectAll("text")
    .attr("font-size", 13)
    .attr("font-family", "Lato")
    .attr("font-weight", 400)
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // yAxis
  //   .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")))
  //   .append("text")
  //   .attr(
  //     "transform",
  //     "translate(" + -margin.bottom + " ," + h / 2 + ")rotate(-90)"
  //   )
  //   .style("text-anchor", "middle")
  //   .attr("font-family", "sans-serif")
  //   .attr("fill", "white")

  var graph = group.selectAll("rect").data(sortedData);

  graph
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .style("opacity", 0.7)
    .attr(
      "fill",
      //"url(#pattern-chevron)")
      //.attr("background-size", "100% 100%")
      "#6ae27a"
    )
    .on("mouseover", function(d, i) {
      // console.log(i, viewboxData);
      d3.select(this)
        // .style("stroke-width", "3")
        .style("opacity", 1);
      // .style("stroke", function(d) {
      //   return "#00ff23";
      //   //"#f57187";
      // });
      tooltip
        .text(
          Math.round((1000 * (i === 6 ? viewboxData : d.count)) / 10) +
            "%" +
            " of " +
            d._id +
            "'s >1000ft² roofs can be green roofs."
        )
        .style("opacity", 0.9)
        .style("left", d3.event.pageX + 0 + "px")
        .style("top", d3.event.pageY - 0 + "px");
    })
    .on("mouseout", function(d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("opacity", 0.7);
    })
    // .attr("fill", d => {
    //   var color = d.count * 10;

    //   return "rgb(111, " + d.count * 1000 + 100 + ", 129)";
    // })

    //.merge(graph)
    // .ease(d3.easeCircleIn)
    .attr("id", function(d, i) {
      return `_${i}`;
    })
    .attr("x", d => {
      return xScale(d._id);
    })

    .attr("y", d => {
      return yScale(0);
    })
    .attr("height", d => {
      let result = h - yScale(0);
      return result < 0 ? 0 : result;
    })
    .transition()
    .duration(1000)
    // .delay(1000)
    .attr("y", d => {
      return yScale(d.count);
    })
    .attr("height", d => {
      let result = h - yScale(d.count);
      return result < 0 ? 0 : result;
    });

  var texts = group.selectAll(".text").data(sortedData);
  texts
    .enter()
    .append("text")
    .attr("class", "text")
    .attr("fill", "white")
    .attr("font-size", "11px")
    .attr("id", function(d, i) {
      return `text${i}`;
    })
    .text(function(d) {
      return Math.round((1000 * d.count) / 10) + "%";
    })
    .transition()
    .duration(1000)
    .attr("x", d => {
      return xScale(d._id) + 14;
    })
    .attr("y", d => {
      return yScale(d.count) - 15;
    })
    .attr("dy", ".75em");

  graph.exit().remove();
  texts.exit().remove();

  graph
    .attr("x", d => {
      return xScale(d._id);
    })
    .transition()
    .duration(1000)
    // .delay(1000)
    .attr("y", d => {
      return yScale(d.count);
    })
    .attr("height", d => {
      let result = h - yScale(d.count);
      return result < 0 ? 0 : result;
    });

  texts
    .text(function(d) {
      return Math.round((1000 * d.count) / 10) + "%";
    })
    .attr("x", d => {
      return xScale(d._id) + 14;
    })
    .attr("y", d => {
      return yScale(d.count) - 15;
    })
    .attr("dy", ".75em");
}

//donutChart
var widthDonut = 200;
heightDonut = 300;
margins = 50;
var radius = 80;
var svgDonut = d3
  .select(".pDonut")
  .append("svg")
  .attr("width", widthDonut)
  .attr("height", heightDonut)
  .append("g")
  .attr(
    "transform",
    "translate(" + widthDonut / 2 + "," + heightDonut / 2 + ")"
  );
function runPotentialDonut(total, section) {
  //Math.min(width, height) / 2 - margin;
  //console.log(total, section);
  var total = 1 - newCityPotential;
  var dataset = [
    { name: "totals", count: total, color: "#007311" },
    { name: "section", count: newCityPotential, color: "#30ff34" }
  ];

  var color = d3
    .scaleOrdinal()
    .domain(dataset)
    .range(["#007311", "#30ff34"]);

  var pie = d3.pie().value(d => d.count);
  // var pie_dataset = pie(d3.entries(dataset));

  var graph = svgDonut.selectAll("path").data(pie(dataset));
  graph
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(50)
        .outerRadius(radius)
    )
    .attr(
      "fill",
      // "#6ae27a"
      d => {
        return color(d.color);
      }
    )
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7);
  graph.exit().remove();
  graph.attr(
    "d",
    d3
      .arc()
      .innerRadius(50)
      .outerRadius(radius)
  );
}

document
  .getElementById("private-property")
  .addEventListener("change", queryChanged);

$(
  "#public-property, #sliderArea, #commercial, #residential, #mixed, #other, #public-facilities, #manufacturing"
).on("change", queryChanged);

function queryChanged() {
  const public = $("#public-property").is(":checked");
  const private = $("#private-property").is(":checked");
  const residential = $("#residential").is(":checked");
  const commercial = $("#commercial").is(":checked");
  const mixed = $("#mixed").is(":checked");
  const manufacturing = $("#manufacturing").is(":checked");
  const publicFacilities = $("#public-facilities").is(":checked");
  const other = $("#other").is(":checked");

  //basically, if anythink gets checked, meaning "true", then whole expression is false and it is not disabled
  document.getElementById("filter-button").disabled = !(
    public ||
    private ||
    residential ||
    commercial ||
    mixed ||
    manufacturing ||
    publicFacilities ||
    other
  ); //enable button
}

$(".select-all").on("click", function() {
  $("input[name=landuse],input[name=property]").prop("checked", true);
  document.getElementById("filter-button").disabled = false;
});

function openFilter() {
  document.getElementById("screen").style.display = "block";
  document.getElementById("loading").style.display = "none";
}

var modal = document.getElementById("screen");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
var cards = document.querySelectorAll(".card__face");
cards.forEach(card => {
  card.addEventListener("click", function(e) {
    e.target.parentElement.classList.toggle("is-flipped");
    console.log(e.target);
  });
});
// console.log(cards);

// document.querySelectorAll(".flip-card").forEach(item => {
//   item.addEventListener("click", event => {
//     console.log(event.target);
//     event.target.classList.add("turn");
//   });
// });
