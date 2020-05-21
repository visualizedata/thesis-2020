<template>
<div>
  <div class="timeline-mask" :style="slideStyle">
    <div id="title">
      <div id="pro-title" v-on:click="slideRight">
        <span class="title-text" @mouseover="hoverPro" @mouseleave="hoverPro">pro</span>
        <img class="direction" src="~assets/direction-w.png" width="50px" v-show="proActive&&!sectionDisplayed" :style="directionTranslate" />
      </div>
      <div id="anti-title" v-on:click="slideLeft">
        <img class="direction" src="~assets/direction.png" width="50px" v-show="antiActive&&!sectionDisplayed" :style="directionTranslate" />
        <span class="title-text" @mouseover="hoverAnti" @mouseleave="hoverAnti">anti</span>
      </div>
    </div>

  </div>
  <div v-if="sectionDisplayed" class="back" width="50px" :style="backStyle" v-on:click="slideCenter"></div>
  <div class="container">
    <svg class="timeline" ref="timeline" :width="width" :height="height" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
      <svg ref="circle" :x="offsetX" :y="offsetY" :width="radius*2" :height="radius*2" viewBox="0 0 1003 1003" fill="none" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <path d="M588.824 8.59612C603.15 11.1221 617.358 14.2721 631.41 18.0371" stroke="black" stroke-width="4" />
        <path d="M631.41 18.0371C716.187 40.7532 793.492 85.385 855.553 147.447C917.615 209.508 962.247 286.813 984.963 371.59" stroke="black" stroke-width="4" stroke-dasharray="5 7" />
        <path
          d="M984.963 371.59C1011.52 470.704 1006.94 575.588 971.846 672.01C936.752 768.432 872.841 851.721 788.788 910.576C704.735 969.431 604.61 1001 502 1001C399.39 1001 299.265 969.431 215.212 910.576C131.159 851.721 67.2483 768.432 32.1537 672.01C-2.94094 575.588 -7.52028 470.704 19.0371 371.59C45.5945 272.477 102.003 183.934 180.606 117.978C259.21 52.0214 356.203 11.8457 458.422 2.90264"
          stroke="black" stroke-width="4" />
      </svg>
      <g>
        <defs>
          <filter x="0" y="0" width="1" height="1" id="bg-text">
            <feFlood :flood-color="fillColor" />
            <feComposite in="SourceGraphic" operator="xor" />
          </filter>
        </defs>
        <g v-for="yr in years" :key="yr">
          <g v-on:click="selectYear=yr">
            <circle r="8" :cx="offsetX + radius + radius*Math.cos(angle(yr))" :cy="offsetY + radius + radius*Math.sin(angle(yr))" :fill="fillColor" />
            <rect :x="offsetX + radius + (radius+50)*Math.cos(angle(yr))-25-3" :y="offsetY + radius + (radius+50)*Math.sin(angle(yr))+15-23" width="58" height="28" v-if="selectYear===yr" :fill="fillColor">
            </rect>
            <text :x="offsetX + radius + (radius+50)*Math.cos(angle(yr))-25" :y="offsetY + radius + (radius+50)*Math.sin(angle(yr))+15" :fill="(selectYear===yr)?'#fff':'#000'" font-size="28" font-weight="bold">
              {{yr}}
            </text>
          </g>
        </g>
      </g>
    </svg>
    <div :style="showDetails" class="details">
      <div class="text-info">
        <div id="context" v-if="slide==='right'">
          <div class="statename-container">
            <span class="stateName" :style="{'color':fillColor}" v-html="details.state"></span>
          </div>
          <div id="context-info" v-html="details.context"></div>
          <div id="map-img-2020" v-if="selectYear==2020" ><div style="padding-top:150px; padding-left:50px;color:#544E70;" ><div class="map-hint" v-on:click="showMap2020">[click to view map]</div></div></div>
        </div>
        <div id="law">
          <div class="left"></div>
          <div class="right"></div>
          <br>
          <p v-html="details.law"></p>
        </div>
        <div id="context" v-if="slide==='left'">
          <div class="statename-container"><span class="stateName" :style="{'color':fillColor}" v-html="details.state">{{}}</span></div>
          <div id="context-info" v-html="details.context"></div>
          <div id="map-img-anti" v-if="selectYear!==null" ><div style="padding-top:200px; padding-left:50px;color:#A6330A;"><div class="map-hint" v-on:click="showMapAnti">[click to view map]</div></div></div>
        </div>
      </div>
    </div>

  </div>
  <div class="map-view" v-if="slide!=='center'" v-on:click="closeMap">

    <img class="map-img" style="margin-left:-10vw;" v-if="map2020" src="~assets/pro2020.png"/>
    <img class="map-img" style="margin-left:8vw;" v-if="mapAnti" src="~assets/anti.png"/>
        <div id="close-img" v-on:click="closeMap" v-if="map2020||mapAnti"><span>[close]</span></div>
  </div>
    <BackButton routerLink="/trend" v-show="!sectionDisplayed" />
    <NextButton routerLink="/beyond" v-show="!sectionDisplayed" />

    <div id="timeline-title" v-show="!sectionDisplayed"><span style="background-color:#FFF">laws and policies</span> about masks</div>
  </div>
</template>

<script>
import * as countries from "i18n-iso-countries";
import {
  VueDatamaps
} from 'vue-datamaps';
import anti_mask_laws from "~/assets/anti_mask_laws.json";
import pro_mask_policy from "~/assets/pro_mask_policy.json";
import BackButton from '~/components/BackButton.vue'
import NextButton from '~/components/NextButton.vue'
export default {
  components: {
    BackButton,
    NextButton,
    VueDatamaps
  },
  data() {
    return {
      map2020:false,
      mapAnti:false,
      antiISO: {},
      currentISO1: "",
      currentISO2: "",
      fills: {
        "exist": "#edc7b9",
        "current": "#A6330A",
        defaultFill: "fff"
      },
      mapKey: 100,
      geographyConfig: {
        dataUrl: '//raw.githubusercontent.com/Seungwoo321/vue-datamaps/master/demo/example-vue-cli3/public/data/world.json',
        popupOnHover: false,
        highlightOnHover: false,
        borderWidth: 0
      },
      backStyle: {
        marginLeft: "0",
        transform: "scaleX(1)"
      },
      sectionDisplayed: false,
      directionTranslate: {
        transform: "translate(0,10px)"
      },
      proActive: false,
      antiActive: false,
      proAnti: "",
      slide: "center",
      slideStyle: {
        marginLeft: 0,
        transition: "0.2s"
      },
      showDetails: {
        display: "hidden",
        marginLeft: "578px"
      },
      offsetX: 200,
      offsetY: 120,
      height: 1000,
      width: 1200,
      radius: 400,
      selectYear: null,
      years: [],
      details: {
        state: "",
        law: "",
        context: ""
      },
      ifSelected: false,
      fillColor: (this.slide === "left") ? ("#A6330A") : ("#544E70")
    }
  },
  watch: {
    slide(val, oldVal) {
      if (val === "right") {
        this.slideStyle.marginLeft = "80vw";
        this.fillColor = "#544E70";
        this.details = {
          state: "Global Pro Mask Policies",
          law: "Click on each <span class=\"highlight\" style=\"background-color:#544E70; color:white;\">circle/year</span> to see details",
          context: ""
        };
        this.proActive = true;
        this.sectionDisplayed = true;
        this.backStyle = {
          marginLeft: "80vw",
          transform: "scaleX(1)"
        };
        this.showDetails.marginLeft = "162px";
      } else if (val === "left") {
        this.slideStyle.marginLeft = "-80vw";
        this.fillColor = "#A6330A";
        this.details = {
          state: "Global Pro Anti Policies",
          law: "Click on each <span class=\"highlight\" style=\"background-color:#A6330A; color:white;\">circle/year</span> to see details",
          context: ""
        };
        this.antiActive = true;
        this.sectionDisplayed = true;
        this.backStyle = {
          marginLeft: "15vw",
          transform: "scaleX(-1)"
        };
        this.showDetails.marginLeft = "578px";
      } else {
        this.slideStyle.marginLeft = "0";
        this.sectionDisplayed = false;
        this.details = {
          state: "",
          law: "",
          context: ""
        };
        this.selectYear = null;
        this.map2020=false;
        this.mapAnti=false;
      }
    },
    selectYear(val, oldVal) {
      if (this.slide === "left") {
        this.details = anti_mask_laws.filter(yearData => (yearData.year == val))[0].content[0];
        let currentISOs = anti_mask_laws.filter(yearData => (yearData.year == val))[0].iso;
        this.currentISO1 = currentISOs[0];
        if (currentISOs.length === 2) {
          this.currentISO2 = currentISOs[1];
        }
        // currentISOs.forEach(iso=>this.antiISO[iso].fillKey="current");
        // this.antiISO={}
      } else if (this.slide === "right") {
        this.details = pro_mask_policy.filter(yearData => (yearData.year == val))[0].content[0];
      }
      this.isSelected = true;
    }
  },
  methods: {
    showMap2020(){
      this.map2020=true;
    },
    showMapAnti(){
      this.mapAnti=true;
    },
    closeMap(){
      this.map2020=false;
      this.mapAnti=false;
    },
    toggleView(){
      this.viewToggled=!this.viewToggled;
    },
    forceRerender() {
      this.mapKey += 1;
    },
    hoverAnti() {
      this.antiActive = !this.antiActive;
      this.directionTranslate.transform = "translate(0,10px) scaleX(1)"
    },
    hoverPro() {
      this.proActive = !this.proActive;
      this.directionTranslate.transform = "translate(0,10px) scaleX(-1)"
    },
    slideCenter() {
      this.slide = "center";
      this.sectionDisplayed = false;
    },
    slideRight() {
      this.slide = "right";
      this.years = pro_mask_policy.map(({
        year,
        content
      }) => year);
      this.sectionDisplayed = true;
    },
    slideLeft() {
      this.slide = "left";
      this.years = anti_mask_laws.map(({
        year,
        content
      }) => year);
      this.sectionDisplayed = true;
    },
    angle(year) {
      const nArcs = (2020 - 1975) / 5 + 2;
      const startAngle = -5 / 12 * Math.PI;
      const oneArc = Math.PI / 6;
      const unitAngle = oneArc / 5;
      if (year === 1723) {
        return startAngle;
      } else if (year === 1845) {
        return startAngle + oneArc;
      } else {
        return startAngle + 2 * oneArc + (year - 1975) * unitAngle;
      }
    },
    circleSize(year) {
      if (year === 1995 || year == 2016 || year === 2016) {
        return 10;
      } else {
        return 5;
      }
    }
  },
  mounted() {
    var isoList = [];
    anti_mask_laws.forEach(yr => isoList = isoList.concat(yr.iso));
    isoList = new Set(isoList);
    isoList.forEach(iso => this.antiISO[iso] = {
      fillKey: "exist"
    })
    console.log(this.antiISO);
  }
}
</script>
<style>
@font-face {
  font-family: 'Garamond', cursive;
  src: url('~assets/Garamond.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  overflow: hidden;
  font-family: 'Garamond';
  font-weight: 600;
}

#timeline-title {
  display: block;
  position: absolute;
  z-index: 90;
  width: 33vw;
  font-size: 2.5vw;
  /* background-color: #FBDD4A; */
  border-color: #FFF;
  border-bottom-width: 10px;
  border-bottom-style: solid;
  padding-bottom: 7px;
  margin-top: 23vw;
  margin-left: 35vw;
  font-weight: 700;
  padding-top: 20px;
  padding-bottom: 20px;
}

.next-button {
  position: absolute;
  z-index: 55;
  margin-top: 5vh;
  margin-left: 51vw;
}

.next-button.a {
  color: white;
}

.back-button {
  position: absolute;
  z-index: 55;
  margin-top: 5vh;
  margin-left: 44vw;
}

.timeline-mask {
  position: absolute;
  width: 100vw;
  height: 100vh;

  display: block;
  background: #FBDD4A;
  z-index: 25;
  font-family: 'Garamond';
  font-weight: 600;
  font-size: 100px;
  background-image: url('~assets/b.png');
  background-size: 150% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-blend-mode: multiply;
}

.title-text:hover {
  border-bottom-width: 10px;
  border-bottom-style: solid;
  padding-bottom: 7px;
  /* margin-top: 40vh; */
}

#title {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

#pro-title {
  width: 50vw;
  height: 100vh;
  text-align: left;
  color: white;
  /* background-color: white; */
  align-self: center;
  padding-top: 40vh;
  padding-left: 7vw;
}

#anti-title {
  width: 50vw;
  height: 100vh;
  text-align: right;
  color: black;
  /* background-color: black; */
  padding-top: 40vh;
  padding-right: 10vw;

}

#anti-title .title-text {
  text-decoration: line-through;
}

.back {
  position: absolute;
  display: block;
  width: 80px;
  height: 80px;
  background-image: url("~assets/direction.png");
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 50;
  margin-top: 43vh;
  -webkit-animation: reduce 1s ease-in-out 0s infinite alternate;
  animation: reduce 1s ease-in-out 0s infinite alternate;
}

@-webkit-keyframes reduce {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.3;
  }
}

@keyframes reduce {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.3;
  }
}

.container {
  position: absolute;
  display: block;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  /* z-index: 20; */
}

.timeline {
  position: absolute;
  margin-top: 0;
  margin-left: 250px;
  z-index: 2;
}

.details {
  position: absolute;
  display: block;
  margin-left: 578px;
  margin-top: 130px;
  width: 600px;
  /* height: 300px; */
  z-index: 1;
}

.highlight {
  background-color: #A6330A;
  color: white;
}

.statename-container {
  /* margin-left: 300px; */
  margin-top: 20px;
  position: absolute;
  /* z-index: 3; */
  width: 300px;
}

.stateName {
  font-size: 40px;
  color: #A6330A;
  line-height: 60px;
  border-bottom-width: 4px;
  border-bottom-style: solid;
  padding-bottom: 3px;
}

.text-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 120px;
  margin-top: 50px;
}

.left,
.right {
  width: 350px;
  height: 750px;
}

.left {
  shape-outside: url('~assets/ExcludeL.png');
  float: left;
}

.right {
  shape-outside: url('~assets/ExcludeR.png');
  float: right;
}

#law {
  /* display: block; */
  font-size: 26px;
  line-height: 39px;
  width: 760px;

}

#context {
  font-size: 24px;
  line-height: 36px;
  display: block;
  width: 300px;
  padding-top: 70px;
}

#context-info {
  margin-top: 100px;
}

.map-hint{
  width: 200px;
}
.map-hint:hover{
  border-bottom-width: 3px;
  border-bottom-style: solid;
  padding-bottom: 4px;
  position:absolute;
  z-index:24;
  background-color: white;
}
#map-img-2020{
  background-image: url('~assets/2020mask.png');
  height:200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top:30px;

}
#map-img-anti{
  background-image: url('~assets/antimask.png');
  height:200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top:30px;
}
#close-img{
  position:absolute;
  z-index:24;
  font-size:30px;
  /* height:40px; */
  width: 90vw;
  text-align:center;
  padding-top:90vh;
  opacity:0.5;
}

.map-img{
  position: absolute;
  z-index:23;
  width: 90vw;
  margin-top:0;
  background-color: white;
}
.map-view{
  position: abosolute;
  padding-left:100px;
  /* margin-top:250px */
  /* padding-top: 75px; */
  width:100px;

  background-color:white;
}
.nextButton {
  display: inline-block;
  position: absolute;
  background: #FBDD4A;
  color: black;
  font-family: 'Garamond';
  margin-top: 200px;
  margin-left: 90vw;
  z-index: 15;
}


a {
  font-family: 'Garamond';
  padding: 5px;
  font-weight: 600;
  font-size: 30px;
}
</style>
