<template>
    <div>
        <el-row>
            <el-col :span="24">
                <!-- <el-steps :active="active" align-center>
                    <el-step v-for="label in labels" :title="label" :key="label"></el-step>
                </el-steps>  -->
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
            </el-col>
            <el-col :span="4">
                <el-button type = "info" class="el-button-steps" icon="el-icon-arrow-left" v-on:click="back"></el-button>
            </el-col>
            <el-col :span="4">
                <el-button type = "info" class="el-button-steps" icon="el-icon-arrow-right" v-on:click="next"></el-button>
            </el-col>
            <el-col :span="8">
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },
    props: {
      labels: {
          type: Array,
          required: true
      }
    },
    methods: {
      // changes the step, updates the "line" but also $emits the new value
      next() {
        if (this.active < this.labels.length - 1){
          this.active = this.active + 1;
        }
        this.$emit('stepChange', this.active)
      },
      // changes the step, updates the "line" but also $emits the new value
      back(){
        if (this.active > 0){
          this.active = this.active - 1;
        }
        this.$emit('stepChange', this.active)
      },
    }
  }
</script>

<style>

.el-step{
  font-family: 'Lato';
  /* text-transform: 'uppercase'; */
 }

.el-button-steps{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  background-color: #333333;
  margin-bottom: 2vh;
}

.el-step__title.is-wait {
  color:#0000ff;
}

.el-step__head.is-wait{
  color: #0000ff;
  border-color: #0000ff;
} 

.el-step__title.is-process {
  color:#00ff00;
}

.el-step__head.is-process{
  color: #00ff00;
  border-color: #00ff00;
}

.el-step__title.is-finish {
  color:#ff6767;
}

.el-step__head.is-finish{
  color: #ff6767;
  border-color: #ff6767;
}

.el-step.is-horizontal .el-step__line {
    height: 0px;
    top: 55%;
    left: 0%;
    right: 0%;
    position: absolute;
    background-color: gray
}

.el-step.is-center .el-step__line{}

.el-step:last-of-type .el-step__line{}

.el-step__line-inner{
  background-color: #ffffff;
}

</style>