<template>
    <div id="back">
        <svg id="map-svg" viewBox="0 0 1300 650" height="calc(100vh - 50px)"></svg>
        <div id="map-title">Local Violence Intervention Programs <br>& Firearm Homicide Rates by State</div>
        <div id="map-tooltip" v-if="visible == true" :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }">
            <div class="location">{{location}}</div>
            <div class="rate">{{crudeRate}}</div>
        </div>
        <div id="map-info-box">
            <div id="legend" v-if="infoVisible == false">
                <div class="city-title">Legend</div>
                <div id="gradient-legend" class="legend-item">
                    0
                    <!-- Generator: Adobe Illustrator 23.1.1, SVG Export Plug-In  -->
                    <svg id="gradient-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="151px"
                        height="11px" viewBox="0 0 151 11" style="enable-background:new 0 0 151 11;" xml:space="preserve">
                    <style type="text/css">
                        .st0{fill:url(#SVGID_1_);}
                        .st1{fill:url(#SVGID_2_);}
                    </style>
                    <defs>
                    </defs>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0" y1="5.5" x2="151" y2="5.5">
                        <stop  offset="0" style="stop-color:#76625B"/>
                        <stop  offset="0" style="stop-color:#B1BFC0"/>
                        <stop  offset="1" style="stop-color:#3A686B"/>
                    </linearGradient>
                    <rect class="st0" width="151" height="11"/>
                    </svg>

                    10
                </div>
                <div>
                    Gun homicides per 100k
                </div>

                <div id="circle-legend" class="legend-item">
                    <div class="legend-circle"></div>
                    <div>Cities with local gun violence reduction programs</div>
                </div>
                <div id="click-note" class="legend-item">
                    <!-- Generator: Adobe Illustrator 23.1.1, SVG Export Plug-In  -->
                    <svg id="hand-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22.12px"
                        height="25.24px" viewBox="0 0 22.12 25.24" style="enable-background:new 0 0 22.12 25.24;" xml:space="preserve">
                    <style type="text/css">
                        .hand{fill:#FFFFFF;}
                    </style>
                    <defs>
                    </defs>
                    <path id="Icon_awesome-hand-pointer_1_" class="hand" d="M22.12,11.81v4.74c0,0.15-0.02,0.3-0.05,0.45l-1.58,6.71
                        c-0.21,0.89-1.01,1.52-1.92,1.52H8.29c-0.63,0-1.23-0.3-1.6-0.81l-6.32-8.69c-0.64-0.88-0.45-2.12,0.44-2.76
                        c0.88-0.64,2.12-0.45,2.76,0.44l1.56,2.15V1.94C5.15,0.85,6.06-0.02,7.15,0c1.06,0.02,1.92,0.88,1.94,1.94v9.87h0.4V9.84
                        C9.5,8.75,10.4,7.88,11.49,7.9c1.06,0.02,1.92,0.88,1.94,1.94v1.97h0.4v-1.19c0.02-1.09,0.92-1.96,2.01-1.94
                        c1.06,0.02,1.92,0.88,1.94,1.94v1.19h0.4c0.02-1.09,0.92-1.96,2.01-1.94C21.24,9.89,22.1,10.75,22.12,11.81L22.12,11.81z
                        M9.48,15.76H9.08v4.74h0.39V15.76z M13.82,15.76h-0.39v4.74h0.4L13.82,15.76z M18.17,15.76h-0.39v4.74h0.4L18.17,15.76z"/>
                    </svg>

                    Click on a city on the map to see program details
                </div>
            </div>
            <div v-if="infoVisible == true">
                <div class="city-title">{{city}}</div>
                <div class="p-title">programs:</div>
                <div class="program" v-for=" (program, index) in programs" :key="index">
                    <div class="program-divider"></div>
                    <p class="p-name">{{program.program_name}}</p>
                    <p class="p-type"><strong>Type:</strong> {{program.program_type}}</p>
                </div>
            </div>
        </div>
        <div id="map-info-fade"></div>
    </div>
</template>

<script>

import * as d3 from "d3"
import usStates from '~/static/states_firearm_homicide.json'
import programs from '~/static/program_cities_geo.json'

export default {
    data() {
        return {
            countryGeoJSON: usStates,
            programGeoJSON: programs,
            clicked: false,
            visible: false,
            infoVisible: false,
            programs: [{
				"program_name": "Cure Violence, Baltimore",
				"program_type": "Cure Violence"
			}, {
				"program_name": "Violence Prevention Program, Baltimore",
				"program_type": "Hospital Based Violence Intervention"
            }],
            city: 'Baltimore, MD',
            tooltipX: '0',
            tooltipY: '0',
            location: null,
            crudeRate: null
        }
    },
    mounted() {
        let _this = this
        let svg = document.querySelector('#map-svg')
        let g = d3.select(svg).append('g');
        let selectedGroup = 'FH_All'

        var myScale = d3.scaleLinear()
        .domain([0, 12])
        .range([0, 1]);

        var albersProjection = d3.geoAlbers()
        .scale(1200)
        .center([-99, 39])
        .translate([-600, -400]);

        var geoPath = d3.geoPath()
            .projection(albersProjection);

        g.selectAll('path')
        .data(this.countryGeoJSON.features)
        .enter()
        .append('path')
        .attr('fill', function(d) {

            let rate = d.properties[selectedGroup]

            let int = parseInt(rate)
            if (int != NaN) {
                let scaledRate = myScale(int)
                if (scaledRate) {
                // return d3.piecewise(d3.interpolateRgb.gamma(2.2), ["#6e5a54","#5c1a06"])(scaledRate)
                // return d3.piecewise(d3.interpolateRgb.gamma(2.2), ["rgb(254, 215, 153)","rgb(209, 1, 36)"])(scaledRate)
                // return d3.piecewise(d3.interpolateRgb.gamma(2.2), ["#eecdbe","#ee3716"])(scaledRate)
                return d3.piecewise(d3.interpolateRgb.gamma(2.2), ["#9dabac","#2a5457"])(scaledRate)
                // return d3.interpolateMagma(1-scaledRate)
                // return d3.interpolateBlues(1-scaledRate)
                } else {
                    return "#13181a"
                }
            }

            


            // return "#13181a"
        })
        .attr('fill-opacity', '1')
        .attr('d', geoPath)
        .on("mouseover", function(d,i) {
            if (d.properties[selectedGroup] != null) {
                _this.visible = true,
                _this.tooltipX = d3.event.clientX + 10
                _this.tooltipY = d3.event.clientY + 10
                _this.location = d.properties["NAME"],
                _this.crudeRate = `Gun homicide rate: ${d.properties[selectedGroup]}`

                d3.select(this)
                    .attr("stroke", "white")
                    .attr("stroke-width", "1")
            }
        })
        .on("mouseout", function(d,i) {
            _this.visible = false
            _this.tooltipX = '0'
            _this.tooltipY = '0'
            _this.location = null
            _this.crudeRate = null
            d3.select(this)
                .attr("stroke", "")
                .attr("stroke-width", "")
        });


        g.selectAll('circle')
        .data(this.programGeoJSON.features)
        .enter()
        .append('circle')
        .attr('fill', function(d) {
            // let color
            // if (d.properties["TYPE"] == 'hybrid') {
            //     color = '#c1ffd9'
            // } else if (d.properties["TYPE"] == 'Cure Violence') {
            //     color = '#f7bd72'
            // } else if (d.properties["TYPE"] == 'Group Violence Intervention') {
            //     color = '#ff8b76'
            // } else if (d.properties["TYPE"] == 'Hospital Based Violence Intervention') {
            //     color = '#c0e1eb'
            // }
            return '#d43f24'
            // return '#db4e0d'
            // return '#fff'
        })
        .attr('fill-opacity', '1')
        .attr('r', '5')
        .attr('cx', function(d) {
            return albersProjection(d.geometry.coordinates)[0]
            })
        .attr('cy', function(d) {
           return albersProjection(d.geometry.coordinates)[1]
            })
        .attr('cursor', 'pointer')
        .on("click", function(d,i) {
            console.log(d.properties.programs)
            g.selectAll('circle')
                .attr("stroke", "")
                .attr("r", "5")

            if (_this.clicked == i) {
                d3.select(this)
                    .attr("stroke", "")
                    .attr("r", "5")
                _this.clicked = false
                _this.infoVisible = false
            } else {
                d3.select(this)
                    .attr("stroke", "#fff")
                    .attr("stroke-weight", "2")
                    .attr("r", "7")
                _this.clicked = i
                _this.programs = d.properties.programs
                _this.city = d.properties.location
                _this.infoVisible = true
            }
            
        })
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style lang="css" scoped>


#back {
    position: relative;
    background: #9dabac;
    background: #2a5457;
    background: #d43f24;
    background: #05616d;
    background: rgb(209, 1, 36);
    background: #b1bfc0;
    background: #3a686b;
    background: #db4e0d;
    background: #993507;
    background: #c0e1eb;
    background: #5c1a06;
    background: #6e5a54;
    background: #978d85;
    background: #2f5969;
    background: #1e2629;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow-x: scroll;
}


#map-title {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    text-align: center;
    color: rgb(226, 233, 236);
    font-family: 'Merriweather', serif;
    font-size: 16px;
    font-weight: bolder;
}
#map-tooltip {
    position: absolute;
    /* top: 0; */
    background: #2b3436;
    color: white;
    padding: 12px;
    border-radius: 10px;
    max-width: 200px;
    min-height: 60px;
    z-index: 9999999999999999;
}

#map-info-box {
    position: absolute;
    bottom: 50px;
    left: 50px;
    border-radius: 10px;
    width: 250px;
    height: 250px;
    background:#2b3436;
    color: white;
    padding: 30px;
    font-size: 15px;
    font-family: 'Merriweather', serif;
    overflow-y: scroll;
    z-index: 500;
}

#map-info-fade {
    position: absolute;
    bottom: 50px;
    left: 50px;
    border-radius: 10px;
    width: 250px;
    height: 250px;
    pointer-events: none;
    background: linear-gradient(0deg, rgba(30,38,41,1) 0%, rgba(255,255,255,0) 25%);
    z-index: 10000;
}
.program {
    margin-top: 20px;
}

.city-title {
    font-weight: bold;
    font-size: 16px;
}
.p-title {
    font-size: 14px;
    font-weight: bold;
}
.p-name {
    color: rgb(255, 178, 154);
    color: #ff7057;
    font-weight: bold;
}
.p-type {
    color: rgb(161, 161, 161);
    font-size: 13px;
}
.program-divider {
    width: 100%;
    height: 1px;
    background: grey;
}
.location, .rate {
    font-size: 12px;
    font-family: 'Merriweather', serif;
}

.location {
    margin-bottom: 10px;
    font-weight: bold;
}

#legend {
    font-size: 12px;
    font-weight: 400px;
}

.legend-item {
    margin-top: 15px;
}

.legend-circle {
    width: 18px;
    height: 10px;
    border-radius: 100px;
    background: #e7492d;
    margin-right: 10px;
    margin-top: 5px;
}

#circle-legend, #gradient-legend, #click-note {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

#gradient-svg {
    margin: 0 5px 5px 5px;
}

#hand-svg {
    margin-right: 10px;
}
</style>