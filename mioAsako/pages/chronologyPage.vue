<template>
  <div id =chronologyPage :style= "{backgroundImage: 'url(' + images.lab + ')' }">
    <el-row>
      <el-col :span="24">
        <chronology :asmdData=loadedAsmdData :stepValue=stepValue :descriptions=descriptions />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps v-on:stepChange=propagateStepChange :labels=stepLabels :stepValue=stepValue  />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import chronology from '~/components/chronology.vue'
import steps from '~/components/steps.vue'

import descriptions from '~/static/chronology_steps.json';
import loadedAsmdData from "~/static/asmd_incidents.json";

export default {
  data() {
    return{
      loadedAsmdData,
      stepValue: 0,
      stepLabels: descriptions.map(v => {return v.label}),
      descriptions,
      images:{
        lab: require("~/assets/lab.png")
      }
    };
  },
  components: {
    chronology,
    steps
  },
  methods: {
    // this propagates the value and also changes the color
    propagateStepChange: function(value){
      console.log("propagateStepChange: " + value)
      //this.changeColor();
      this.stepValue = value;
    }
  },
  mounted(){

  }
};
</script>

<style>
/* style for all description divs across pages */
.description{
  font-family: "Lato";
  font-size: 18px;
  max-width: 75%;
  margin: 5vh 5vh 5vh 5vh;
  padding: 2vh 2vh 2vh 2vh;
  line-height: 1.5;
  background-color: rgba(0, 0, 0, 0.5);
}

.chartTitle{
  max-width: 75%;
  margin: 5vh 5vh 5vh 5vh;
}

.tooltip{
  max-width: 600px;
  line-height: 1.5;
  font-size: 16px;
  min-height: 50px;
}

.cases{
  margin: 5vh 5vh 5vh 5vh;
  /* min-height: 50px; */
  line-height: 0.5;
  max-width: 600px;
  padding: 2vh 2vh 2vh 2vh;
  position:absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}

#chronologyPage{
  min-height: 100vh;
}

#chronologySVG{
  position:absolute;
  z-index: 0;
}


</style>