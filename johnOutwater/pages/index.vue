<template>
  <div class="container">
    <div>
      <h1 class="title">
        <span>Sensing</span>
        Blue
      </h1>
      <h2 class="subtitle">
        The role of flavor perception in modern blueberry breeding
      </h2>
      <landing />
      <h5 class="scroll_text">Scroll</h5>
      <div class="tri_override">
        <triangle />
      </div>
      <div class="icon_scroll"></div>
      <article class="section_break">
        <h3 class="flavor_title">Is flavor quantifiable?</h3>
            <div class="flavor_text">Human food consumption - A daily necessity and primal, sensory experience. Our sensory systems have evolved greatly over time, allowing us to perceive flavor more effectively than any other organism. This ability allows us to recall and associate specific emotions with flavor experiences, making food an important part of our lives both physically and mentally. Using sensory data from an agriculture business specialized in growing berries, we will explore the sensory experience of blueberry consumption in an effort to quantify the qualitative components of the process and find patterns in flavor and quality. The goal of this research and berry flavor visualization is to create an analytical and comprehensive flavor data tool that will offer new insights in berry sensory analysis. This project is designed not only for agricultural specialists focused on berry cultivation but audience members of all types. The project will inform the audience of the meticulous measures taken in analyzing berry flavor and the visual potential that can be leveraged for communication of such subjective data. Furthermore, this project is meant to promote conscious nourishment and highlight the momentary beauty of food consumption during our busy, fast-paced lives.
          </div>
      </article>
      <div class="sensory_scroll">
          <scrolly />
      </div>
      <article class="section_break">
        <h3 class="flavor_title">Creation of the perfect blueberry</h3>
          <div class="flavor_text">Human food consumption - A daily necessity and primal, sensory experience. Our sensory systems have evolved greatly over time, allowing us to perceive flavor more effectively than any other organism. This ability allows us to recall and associate specific emotions with flavor experiences, making food an important part of our lives both physically and mentally. Using sensory data from an agriculture business specialized in growing berries, we will explore the sensory experience of blueberry consumption in an effort to quantify the qualitative components of the process and find patterns in flavor and quality. The goal of this research and berry flavor visualization is to create an analytical and comprehensive flavor data tool that will offer new insights in berry sensory analysis. This project is designed not only for agricultural specialists focused on berry cultivation but audience members of all types. The project will inform the audience of the meticulous measures taken in analyzing berry flavor and the visual potential that can be leveraged for communication of such subjective data. Furthermore, this project is meant to promote conscious nourishment and highlight the momentary beauty of food consumption during our busy, fast-paced lives.
          </div>
      </article>
      <div class="breeding_scroll">
          <scrolly2 />
      </div>
      <div class ="bar2_graph">
          <bar2 />
      </div>
      <div class ="radial_chart">
          <!-- <radialBack /> -->
          <radial v-for="(variety,i) in radialData" 
          :key="i" 
          :id="i" 
          :allData="radialData"/>
          <!-- <radial :allData="radialData"/> -->
      </div>
      <div class="footer">
        <radialBack />
        <div class="footer_text">
        <span><b>Thank you</b></span>
        <span>: Daniel Sauter, Aaron Hill, Neil Oliver, Marisa Asari, Henry Yeung, and Brie Smith</span>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import landing from '~/components/Logo.vue'
import triangle from '~/components/triangle_scroll.vue'
import scrolly from '~/components/scrolly.vue'
import scrolly2 from '~/components/scrolly2.vue'
import radial from '~/components/radial.vue'
import radialData from "~/assets/radialBerry.json"
import radialBack from '~/components/radial_background.vue'
import bar2 from '~/components/bar2.vue'
// import berryData from "~/assets/berry.csv"
export default {
  data(){
    return{
      radialData:radialData
      // berryData:berryData
    }
  },
  components: {
    landing,
    triangle,
    scrolly,
    scrolly2,
    radial,
    radialData,
    radialBack,
    bar2
  }
}

</script>

<style>

body{
  background-color: #fffcf6;
}

.container {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title span {
  font-family: 'DM Serif Display';
  font-weight: 300;
  font-size: 110px;
  -webkit-text-fill-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #0b4780;
  stroke-width: 5px;
  letter-spacing: 1px;
}

.title {
  font-family: 'DM Serif Display';
  font-weight: 300;
  font-size: 110px;
  -webkit-text-fill-color: #0b4780;
  -webkit-text-stroke-width: 0px;
  letter-spacing: 1px;
  margin-top: 30px
}

.subtitle {
  font-family: 'DM Serif Display';
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  -webkit-text-fill-color: #0b4780;
  letter-spacing: 1px;
  word-spacing: 10px;
  padding-bottom: 40px;
  padding-top: 0px;
}

.bar2_graph {
  justify-content: center;
  align-items: center;
  margin-bottom: 300px; 
}

.variety{
  letter-spacing: 1.7px;
}

.radial_chart {
 position: relative;
 height: 1000px;
 display: flex;
 /* flex-wrap: wrap; */
 bottom: 0px;
 margin-top: 50px;
 padding-bottom: 300px;
 /* align-content: space-between; */
 justify-content: center;
}

/* .legend5{
	transform: rotate(-90deg);
} */

.scroll_text{
  font-family: 'DM Serif Display';
  font-style: italic;
  font-size: 14px;
  -webkit-text-fill-color: #0b4780;
  letter-spacing: 1px;
  /* word-spacing: 10px; */
  padding-bottom: 0px;
  padding-top: 20px;
}

.tri_override{
  color: #0b4780;
  width: 35px;
  height: 40px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.icon_scroll,
.icon_scroll:before{
  position: absolute;
  left: 50%;
}

.icon_scroll{
  width: 40px;
  height: 70px;
  margin-left: -19px;
  top: 85%;
  margin-top: 30px;
  /* box-shadow: inset 0 0 0 1px #000; */
  border-radius: 25px;
}
.icon_scroll:before{
  content: '';
  width: 5px;
  height: 5px;
  background: #0b4780;
  margin-left: -3px;
  top: 65px;
  border-radius: 2px;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: scroll;
}

.section_break{
  padding: 0rem 0rem 15rem;
}

.flavor_title{
  font-family: 'DM Serif Display';
  font-weight: 400;
  font-size: 29px;
  -webkit-text-fill-color: #0b4780;
  padding: 20rem 16rem 1rem;
  text-align: left;
}

.flavor_text{
  column-count: 2;
  column-gap: 70px;
  font-family: 'HelveticaNeue-Light';
  font-weight: 400;
  font-size: 17px;
  padding: 0 16rem 20rem;
  text-align: justify;
  text-justify: inter-word;
}

.footer {
  font-family: "HelveticaNeue-Light";
  font-size: 16px;
  word-spacing: 10px;
  letter-spacing: 5px;
  -webkit-text-fill-color: #0b4780;
  margin-top: -60px;
  margin-bottom: 60px;
}

.footer_text {
  margin-top: 30px;
}

.sensory_scroll{
  padding-top: 100px;
  margin-bottom: 100px;
}

    @keyframes scroll {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(20px)
  }
}

</style>
