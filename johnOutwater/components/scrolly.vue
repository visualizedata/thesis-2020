<template>
  <div>
    <client-only>
    <Scrollama :offset="0.6" @step-enter="stepEnterHandler" id="flexed">
      <div slot="graphic" class="graphic">
        <img :src="steps[currStepId-1].image" width="700"/>
      </div>
      <div
        v-for="step in steps" :key="step.no"
        :data-step-id="step.id"
        class="step" :class="{'is-active': step.id === currStepId}">
        <h2 class="scroll_title">{{step.title}}</h2>
        <p class="text_wrapper">
        <span class="text_normal">{{step.text}}</span>
        <span class="text_high_bold">{{step.text2}}</span>
        <span class="text_normal">{{step.text3}}</span>
        <span class="text_high_bold">{{step.text4}}</span>
        <span class="text_normal">{{step.text5}}</span>
        <span class="text_high_bold">{{step.text6}}</span>
        <span class="text_normal">{{step.text7}}</span>
        </p>
        </div>
    </Scrollama>
    </client-only>
  </div>
</template>

<script>
// polyfill for IntersectionObserver
// import 'intersection-observer'
// import Scrollama from 'vue-scrollama'

export default {
  components: {
  },
  data() {
    return {
      currStepId: 1,
      steps: [
        {id: '1', title: "Appearance and Expectation", text: "Seeing our food is one of the first interactions we have in the process of food consumption.", text2: " Using our eyes, we judge our food", text3: " and decide whether or not we should eat it. Sometimes we even ponder how good the food will taste based on its appearance.", text4: " We set specific expectations", text5: "as we take a momentary but highly crucial and instinctual glance at the food prior to eating. Our pupils, irises, retinas and brain are an incredible system that can analyze very minute details in the texture, color, and shape of our environment, and we use this daily in analyzing the appearance of our food. In this process,", text6: "we can relate our immediate visual perception to what we have seen in the past", text7: "and what has been learned as regular or irregular in appearance. Therefore, our eyes are the first step in building comprehensive flavor perception.", image: "./flav_eye.png"},
        {id: '2', title: "Taste Transduction",text: "Our mouths are one of the many sense organs in our bodies. It is of especially high significance as it is one of the pathways through which we breathe and it transforms products of the external world to digestible matter. During this transition point from external to internal,", text2: "we use the tongue in our mouths to sense the taste and feel", text3: "of potentially ingestible food for our bodies. Once food touches our tongue,", text4: "receptors pass messages to the brain, giving us an understanding of the food,", text5: "whether or not it is safe to eat and, furthermore, what the food is generally composed of.", text6: "The tongue is able to sense five distinct tastes: sweet, sour, salt, bitter, and umami.", text7: "These tastes are all sensed and transduced to the brain by taste receptor cells  located within various papillae along the tongue’s surface. Collectively, the TRCs start to build a perception of flavor during a consumption experience.", image: "./flav_mouth.png"},
        {id: '3', title: "Retronasal Flow",text: "The nose is a sensory organ that has also adapted in different ways from our early existence as humans.", text2: "During evolution, our keen sense of smell transitioned from orthonasal to retronasal,", text3: "which originates from our mouths through the back-end of our nasal cavity. When a piece of edible matter enters the mouth, the retronasal sense engages almost immediately. As one chews food and breathes, small whiffs of the food are transported from the back of the mouth up to the retronasal passage as a primer.", text4: "When food is swallowed, a natural breath-out allows for an intense experience of the food’s odor retronasally,", text5: "where hundreds of volatile compounds can be translated and visualized by way of the olfactory bulb. This moment in consumption is when one experiencing food will have the most wholesome understanding of the food’s flavor.", image: "./flav_nasal.png"}
      ]
    }
  },
  methods: {
    stepEnterHandler({element, direction, index}) {
      console.log({element, direction, index});
      this.currStepId = element.dataset.stepId
    }
  }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
// overrides here
#scrollama-container-flexed {  // id="flexed" passed as prop to Scrollama in template
  display: flex;
  flex-direction: row-reverse;
  .scrollama-graphic {
    flex: 2.0;
    height: 80vh;
    top: 10vh;;
  }
  .scrollama-steps {
    flex: 1;
  }
}
</style>

<style scoped>
.step {
  width: 100%;
  padding: 15rem 0rem;
  margin: 5rem 0rem 15rem;
  /* border: 1px solid #0b4780;
  background-color: white; */
  display: block;
  justify-content: left;
}
.step.is-active {
  background-color: none;
}

.scroll_title{
  font-family: 'DM Serif Display';
  font-weight: 400;
  font-size: 29px;
  -webkit-text-fill-color: #0b4780;
  padding: 0 3rem 1rem;
  text-align: left;
}

.text_wrapper{
  margin-left: 3rem;
  margin-right: 3rem;
  text-align: justify;
  text-justify: inter-word;
}

.text_normal {
  font-family: 'HelveticaNeue-Light';
  -webkit-text-fill-color: #000000;
  font-weight: 400;
  font-size: 17px;
}

.text_high_bold{
  font-family: 'HelveticaNeue';
  -webkit-text-fill-color: #0b4780;
  background-color: rgba(11, 71, 128, 0.2);
  font-weight: 500;
  font-size: 17px;
}
.graphic {
  height: 80vh;
  width: 100%;
  /* border: 1px solid #333; */
  margin: 0 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
}
</style>