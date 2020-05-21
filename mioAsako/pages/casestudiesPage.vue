<template>
   <div id =caseStudiesPage :style= "{backgroundImage: 'url(' + images.perpetrators + ')' }">
    <el-row>
      <el-col :span= "24">
        <casestudies :caseStudyData=loadedCaseStudies :stepValue=stepValue :descriptions=descriptions />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps v-on:stepChange="propagateStepChange" :labels="stepLabels" :stepValue=stepValue />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import casestudies from '~/components/casestudies.vue'
import steps from '~/components/steps.vue'
import loadedCaseStudies from "~/static/case_studies.json";
import descriptions from '~/static/casestudies_steps.json';

export default {
  data() {
    return{
      loadedCaseStudies: loadedCaseStudies,
      stepValue: 0,
      stepLabels: descriptions.map(v => {return v.label}),
      descriptions,
      images:{
        perpetrators: require("~/assets/casestudies.png")
      }
    };
  },
  components: {
      casestudies,
      steps
  },
  methods: {
    // this propagates the value and also changes the color
    propagateStepChange: function(value){
      console.log("propagateStepChange: " + value)
      //this.changeColor();
      this.stepValue = value;
    }
  }
};
</script>

<style>

/*This moves the svgs to the right*/
#caseStudiesSVG{
  display: block;
  margin: auto;
  float: center;
} 

#caseStudiesPage{
  min-height: 100vh;
}


</style>