<template>
<div>
  <div class="bg-f">
    <h1 class="title">
      <div id="title-line1">
        <div id="title-unmask">unmask</div>
        <div id="title-ing">ing</div>
      </div>
      <div id="title-masks">masks</div>
    </h1>

    <div id="stroke-container" v-on:click="revealStroke">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1062">
      <defs>
        <clipPath id="cut-off">
          <path id="Exclusion_1" data-name="Exclusion 1" d="M1920.5,1080.5H.5V.5h1920v1080ZM437.834,508.259V611.384H960.5V490.061l-32.482,18.2-41.341-33.364L848.29,508.259H437.834Z" transform="scale(0.73 0.73) translate(-2 0)" fill="#fff"
            stroke="none"></path>
        </clipPath>
      </defs>
      <polyline ref="strokeLine" points="0,154 131,0 0,348 269,0 0,562 437,0
	0,766 565,14 0,1062 719,0 289,1062 843,0 543,1062 995,0 729,1062 1161,0 947,1062 1307,0 1143,1062 1500,162 1299,1062 1500,830" onclick="this.style.strokeDashoffset=20000"  clip-path="url(#cut-off)" />
  <g v-show="!strokeRevealed">
      <rect x="1130" y="485" width="100" height="20" fill="white" ></rect>
      <text x="1000" y="500" class="click hint" font-size="30">[ click any yellow area ]</text>
</g>
    </svg>
  </div>
  <transition name="appear" :duration="18000">
<NextButton routerLink="/trend" v-show="strokeRevealed"/>
</transition>
</div>

</div>
</template>

<script>
import NextButton from '~/components/NextButton.vue'
export default {
  components: {
    NextButton
  },
  data() {
    return {
      slideLeft: false,
      strokeRevealed:false,
      maskStyle: {
        marginLeft: "50vw",
        transition: "2s"
      }
    }
  },
  watch: {

  },
  methods: {
    revealStroke() {
      const stroke = this.$refs.strokeLine;
      stroke.style.strokeDashoffset = 20000;
      this.strokeRevealed=true;
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
  overflow: hidden;
  font-family: 'Garamond';
  background-repeat: no-repeat;
}
#stroke-container{
  position:absolute;
  width: 100vw;
  height: 100vh;
  z-index:5;
}
/* .appear-enter-active, .appear-leave-active {
  transition: opacity 5s;
}

.appear-enter, .appear-leave-to{
  opacity: 0;
} */
.next-button{
  z-index: 4;
}
.bg-f {
  position: absolute;
  width: 100vw;
  height: 56.25vw;
  background-image: url('~assets/mask-front.png');
  background-size: contain;
  background-position: 50% 0%;
  background-repeat: no-repeat;
  /* z-index: 0; */
}

.click-hint {
  position: absolute;
  z-index: 3;
  background-color: white;
  margin-left: 80vw;
  margin-top: 60vh;
  font-size: 40px;
}

/* .bg-f svg {
  position: absolute;
  z-index: 2;
} */

#stroke-container svg polyline {
  fill: none;
  stroke: #FBDD4A;
  stroke-width: 200;
  stroke-dasharray: 20000;
  stroke-dashoffset: 0;
  transition: all 3s ease-out;
}

.mask {
  width: 100vw;
  height: 100vh;
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
