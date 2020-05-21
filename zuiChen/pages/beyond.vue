<template>
<div>
  <div class="bg"></div>
  <div class="culture-mask" :style="swipeStyle">
    <div id="title">
      <div id="pro-title" v-on:click="swipeRight">
        <span class="title-text" @mouseover="hoverNorm" @mouseleave="hoverNorm">norm</span>
      </div>
      <div id="anti-title" v-on:click="swipeLeft">
        <span class="title-text" @mouseover="hoverStigma" @mouseleave="hoverStigma" style="text-decoration:none;">stigma</span>
      </div>
    </div>
  </div>


  <h1 class="section-title">
    <div class="row-section"></div>
    <div class="row-section hoverable" v-for="(each,id) in sections" :key="id" :style="rowStyle" v-on:click="showMore(each,id)">{{each}}</div>
    <div class="row-section hoverable" v-on:click="swipe='center'" :style="rowStyle">{{arrow}}</div>
  </h1>
<div class="infoCard" :style="infoStyle" v-if="sectionSelected" v-html="moreInfo"></div>
  <BackButton routerLink="/timeline" />
  <NextButton routerLink="/end"/>
      <div id="center-title" v-show="!sectionTextDisplayed"> ... and when they <span style="background-color:#FFF">come closer</span></div>
</div>
</template>

<script>
import BackButton from '~/components/BackButton.vue';
import NextButton from '~/components/NextButton.vue';
export default {
  components: {
    BackButton,NextButton
  },
  data() {
    return {
      infoStyle:{
        marginLeft:"70vw",
        marginTop:"20vh"
      },
      moreInfo:"",
      sectionSelected:false,
      revealStyle: {
        backgroundColor: "#FBDD4A",
        transition: "2s"
      },
      isHover: false,
      info: [],
      sections: [],
      swipe: "center",
      swipeStyle: {
        marginLeft: 0,
        transition: "0.2s"
      },
      normActive: false,
      stigmaActive: false,
      sectionTextDisplayed: false,
      arrow:"",
      rowStyle:{
        paddingLeft:"5vw",
        textAlign:"left",
        paddingRight:"0",
        marginTop:"20vh"
      },
      infos:{
        "filter & warmth":"to prevent <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">smog</span>, <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">dust</span>, pollen <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">allergy</span>, <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">smells</span> in packed crowds, or to <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">stay warm</span> in winter",
        "social firewall":"to <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">avoid interaction</span> with others, or to hide one's face if <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">no-make-up</span>",
        "fashion statement":"e.g. the <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">smog couture</span>, <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">marine serre</span>'s futurewear collection",
        "disease":"traditionally only severely sick <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">patients</span> wear masks",
         "danger":"to hide identity for abnormal purposes (usually bad) <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">crimes/riots</span>",
         "alien":"people in <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">western</span> countries almost <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">never</span> wear masks on a <span class=\"hightlight\" style=\"background-color:#FBDD4A;\">daily base</span>"
      },
      currentIndex:0
    }
  },
  watch: {
    swipe(val, oldVal) {
      if (val === "right") {
        this.swipeStyle.marginLeft = "100vw";
        this.normActive = true;
        this.sectionTextDisplayed = true;
        this.sections=["filter & warmth","social firewall", "fashion statement"];
        this.arrow="→";
        this.rowStyle={
          paddingLeft:"5vw",
          textAlign:"left",
          paddingRight:"0"
        };
        this.infoStyle.marginLeft="70vw";
      } else if (val === "left") {
        this.swipeStyle.marginLeft = "-100vw";
        this.stigmaActive = true;
        this.sectionTextDisplayed = true;
        this.sections=["disease", "danger","alien"];
        this.arrow="←";
        this.rowStyle={
          paddingLeft:"0",
          textAlign:"right",
          paddingRight:"5vw"
        };
        this.infoStyle.marginLeft="35vw";
      } else {
        this.swipeStyle.marginLeft = "0";
        this.sectionTextDisplayed = false;
        this.sections=[];
        this.arrow="";
        this.sectionSelected=false;
      }
    }
  },
  methods: {
    showMore(section,id){
      this.sectionSelected=true;
      this.moreInfo=this.infos[section];
      this.infoStyle.marginTop=id*20+20+"vh";
    },
    hoverStigma() {
      this.stigmaActive = !this.stigmaActive;
    },
    hoverNorm() {
      this.normActive = !this.normActive;
    },
    swipeCenter() {
      this.swipe = "center";
      this.sectionTextDisplayed = false;
    },
    swipeRight() {
      this.swipe = "right";
      this.sectionTextDisplayed = true;
    },
    swipeLeft() {
      this.swipe = "left";
      this.sectionTextDisplayed = true;
    },
    revealText() {
      this.revealStyle.backgroundColor = "none";
      this.info = ["privacy and safety zone", "marine serre and smog couture", "BTS etc."];
    },
    coverText() {
      this.revealStyle.backgroundColor = "#FBDD4A";
      this.info = ["social firewall", "fashion statement", "pop culture"];
    }
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
  overflow-x: hidden;
  font-family: 'Garamond';
  background-repeat: no-repeat;
}

.infoCard{
  position:absolute;
  z-index:15;
  margin-top: 20vh;
  width: 520px;
  background-color: white;
  font-size: 36px;
  line-height: 54px;
  padding-left: 20px;;
}
.culture-mask {
  position: absolute;
  width: 100vw;
  height: 100vh;

  display: block;
  background: #FBDD4A;
  z-index: 25;
  font-family: 'Garamond';
  font-weight: 600;
  font-size: 100px;
  /* background-image: url('~assets/b.png'); */
  background-size: 150% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  /* background-blend-mode: multiply; */
}
.back-button {
  position: absolute;
  z-index: 55;
  margin-top: 5vh;
  margin-left: 44vw;
}

.row-section {
  display: block;
  background-color: #FBDD4A;
  color: black;
  width: 100vw;
  height: 20vh;
  padding-top: 4vh;
  padding-left: 5vw;
}

.hoverable:hover {
  background-color: transparent;

  transition: 0.5s;
}

.bg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url('~assets/b.png');
  background-size: 150% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  z-index: -2;
}

#center-title{
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

.section-title {
  position: absolute;
  margin-top: 0;
  font-family: 'Garamond';
  display: block;
  font-weight: 600;
  font-size: 8vw;
  color: black;
  letter-spacing: 1px;
  line-height: 0.8;
  z-index: -2;
}

#title-line1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px;
}

#title-unmask {
  /* margin-left: 0; */
  width: 50vw;
  text-align: right;
}

#title-ing {
  /* color: white; */
  width: 50vw;
  text-align: left;
  /* z-index:11; */
}

#title-masks {
  /* color: white; */
  width: 50vw;
  margin-left: 50vw;
  text-align: left;
  padding-left: 4px;
}
</style>
