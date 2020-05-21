<template>

  <div>
    <el-row>
      <el-col :span= "24">
        <!-- our square component with three props -->
        <square :caseStudyData=loadedCaseStudies :colorToggled=colorToggled :stepValue=stepValue /> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <!-- a sibling component to our square which keeps track of the stepValue
            this component $emits the message 'stepChange' and here make sure that we 
            call the function propagateStepChange whenever that occurs
        -->
        <steps v-on:stepChange="propagateStepChange" :labels="stepLabels" />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import square from '~/components/square.vue'
import steps from '~/components/steps.vue'

import loadedCaseStudies from "~/static/case_studies.json";

export default {
  data() {
    return {
      // some dataset
      loadedCaseStudies: loadedCaseStudies,
      // a color to be changed in this page, but utilized in the child component
      colorToggled: "#ff0000",
      // start value for stepper
      stepValue: 1,
      stepLabels: ["sdfisdf", "sdfsdfs"]
    };
  },
  components: {
      square,
      steps
  },
  methods: {
    
    // this propagates the value and also changes the color
    propagateStepChange: function(value){
      console.log("propagateStepChange: " + value)
      this.changeColor();
      this.stepValue = value;
    },

    // this toggles this.colorToggled (and vue propagates this change automatically to the children)
    changeColor: function(event){
      console.log("changeColor 🤪");
      this.colorToggled === "#ff0000" ? this.colorToggled = "#00ff00" : this.colorToggled = "#ff0000";
    },
  }
};
</script>

<style>
.svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: top;
    overflow: hidden;
}

.svg {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
}
</style>