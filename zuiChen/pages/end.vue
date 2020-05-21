<template>
<div>

  <div class="bg-last"></div>
  <h1 class="title" v-html="titleText" v-on:click="changeText" :style="titleStyle">
  </h1>
  <BackButton routerLink="/beyond" />
</div>
</template>

<script>
import BackButton from '~/components/BackButton.vue'
export default {
  components: {
    BackButton
  },
  data() {
    return {
      titleText:"unmasking",
      bgStyle:{
        backgroundImage:"url('~assets/mask-front.png')"
      },
      titleStyle:{
        marginLeft: "31vw"
      }
    }
  },
  methods: {
    changeText(){
      this.titleText="  masks";
      this.bgStyle.backgroundImage="url('~assets/frontBack.gif')";
      this.titleStyle.marginLeft="40vw";
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
.title {
  position: absolute;
  font-family: 'Garamond';
  display: block;
  font-weight: 600;
  font-size: 8vw;
  color: black;
  letter-spacing: 1px;
  line-height: 0.8;
  z-index: 1;
  margin-top: 25.3vw;
  margin-left: 27vw;
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

.bg-last {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  z-index: 0;
  background-image: url('~assets/frontBack.gif');
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
  z-index: 1;
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
