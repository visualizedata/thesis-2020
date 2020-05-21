<template>
  <div class = "outcomesPage" :style= "{backgroundImage: 'url(' + images.salk + ')' }">
    <el-row>
      <el-col :span="24">
        <outcomes :asmdData=loadedAsmdData :stepValue=stepValue :descriptions=descriptions />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="position: fixed; bottom: 0">
        <steps v-on:stepChange="propagateStepChange" :labels="stepLabels" :stepValue=stepValue  />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import outcomes from '~/components/outcomes.vue'
import steps from '~/components/steps.vue'

import loadedAsmdData from "~/static/asmd_incidents.json";
import descriptions from '~/static/outcomes_steps.json';

export default {
  data() {
    return{
      loadedAsmdData,
      //start value for stepper
      stepValue: 0,
      stepLabels: descriptions.map(v => {return v.label}),
      descriptions,
      images:{
        salk: require("~/assets/salk.png")
      }
    };
  },
  components: {
      outcomes,
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
.node {
  box-sizing: border-box;
  line-height: 1em;
  overflow: hidden;
  position: absolute;
  white-space: pre;
  color: #333333;
}

.node-label,
.node-value {
  margin: 4px;
}

.node-value {
  margin-top: -2px;
}

.node-value {
  font-weight: bold;
}

.outcomes{
  margin: 5vh 5vh 5vh 5vh;
  /* min-height: 50px; */
  line-height: 0.5;
  background-color: rgba(0, 0, 0, 0);
  max-width: 600px;
  padding: 2vh 2vh 2vh 2vh;
  position:absolute;
  z-index: 1;
}

#outcomesSVG{
  display: block;
  margin: auto;
  float: right;
}

#outcomesPage{
  min-height: 100vh;
}

</style>