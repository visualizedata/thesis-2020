<template>
  <div class="bg-container">
    <!-- <div class="mask-back"></div> -->
    <LineChart id="volume-line-chart" :selectedStartDate="pickStartDate"/>
    <div class="date-range">
      <el-radio-group v-model="pickStartDate" size="large" @change="newStartDate">
        <el-radio-button label="Since 2017"></el-radio-button>
        <el-radio-button label="Since 2018"></el-radio-button>
        <el-radio-button label="Since 2019 Hongkong Protest"></el-radio-button>
        <el-radio-button label="Since Covid-19"></el-radio-button>
      </el-radio-group>
    </div>
    <BackButton routerLink="/" />
    <NextButton routerLink="/timeline" />
    <div id="trend-title"><span style="background-color:#FBDD4A">online news</span> mentioning masks</div>
  </div>


</template>

<script>
  import LineChart from '~/components/LineChart.vue'
  import BackButton from '~/components/BackButton.vue'
  import NextButton from '~/components/NextButton.vue'
  export default {
    components: {
      LineChart, BackButton,NextButton
    },
    data(){
      return{
        pickStartDate: "Since 2017",
        selectedStartDate: ""
      }
    },
    methods:{
      newStartDate(date){
        // console.log(this.pickStartDate)
        this.pickStartDate = date;
      }
    }

}
</script>

<style>
html,body{
  overflow:hidden;
}
#trend-title{
  display: block;
  position: absolute;
  width: 33vw;
  font-size: 2.5vw;
  /* background-color: #FBDD4A; */
  border-color:#FBDD4A;
  border-bottom-width: 10px;
  border-bottom-style: solid;
  padding-bottom: 7px;
  margin-top: 46vw;
  margin-left: 10vw;
  font-weight:700;
  padding-top: 20px;
  padding-bottom: 20px;
}
.bg-container{
  background-image: url('~assets/b.png');
  background-size: 150% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100vw;
  height: 56.25vw;
}
.mask-back{
  display:block;
  position:absolute;
  z-index:-1;
  background-image: url('~assets/b.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 800px;
  height: 800px;
  /* margin-left:250px; */
}

.next-button{
  position: absolute;
  z-index: 55;
  margin-top:5vh;
  margin-left:51vw;
}
.back-button{
  position: absolute;
  z-index: 55;
  margin-top:5vh;
  margin-left:44vw;
}

#volume-line-chart{
  display: block;
  position: absolute;
  z-index: 2;
  margin-top: 5.625vw;
  margin-left: 8vw;
  width: 80vw;
}

  .date-range{
    position: absolute;
    display: block;
    margin-left: 55vw;
    margin-top: 49vw;
    z-index:50;
    font-size: 22px;
    font-family: "Garamond";
  }

  .el-radio-button__inner {
    white-space: nowrap;
    background: #FFF;
    border: 1px solid #DCDFE6;
    font-weight: 600;
    border-left: 0;
    color: #ABACAE;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    position: relative;
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    padding: 12px 20px;
    font-size: 22px;
    border-radius: 0
  }

  .el-radio-button__inner:hover {
    color: #FBDD4A
  }

  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid #DCDFE6;
    border-radius: 4px 0 0 4px;
    -webkit-box-shadow: none !important;
    box-shadow: none !important
  }

  .el-radio-button__orig-radio {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1
  }

  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #000;
    background-color: #FBDD4A;
    border-color: #FBDD4A;
    -webkit-box-shadow: -1px 0 0 0 #FBDD4A;
    box-shadow: -1px 0 0 0 #FBDD4A
  }

  .el-radio-button__orig-radio:disabled+.el-radio-button__inner {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #FFF;
    border-color: #EBEEF5;
    -webkit-box-shadow: none;
    box-shadow: none
  }

  .el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner {
    background-color: #F2F6FC
  }

  .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    -webkit-box-shadow: 0 0 2px 2px #FBDD4A;
    box-shadow: 0 0 2px 2px #FBDD4A
  }
</style>
