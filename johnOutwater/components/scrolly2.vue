<template>
  <div>
    <client-only>
    <Scrollama :offset="0.6" @step-enter="stepEnterHandler2" id="flexed2">
      <div slot="graphic" class="graphic">
        <img :src="steps[currStepId-1].image" width="800"/>
      </div>
      <div
        v-for="step in steps" :key="step.no"
        :data-step-id="step.id"
        class="step" :class="{'is-active2': step.id === currStepId}">
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
        {id: '1', title: "Sensory Data", text: "It is essential to conduct consumer surveys often and with new and varied products to understand", text2: "what is desired most and why.", text3: "Hundreds of blueberry are subjected to consumer flavor testing every year in order to find the individual components that constitute a perfect blueberry. In these flavor tests, ", text4: "blueberry-tasters provide their feedback on the flavor, aroma, visual appearance, and texture of the berries.", text5: "To help ensure unbiased feedback from testers, sensory analysts use measures such as filling the testing room with red light so the tasters cannot perceive the color of the berries. As these proprietary tests evolve, their", text6: "outcomes hone direct, nearly unbiased input from consumers that is statistically analyzed to highlight patterns of significance.", text7: "Such flavor patterns are then interpreted to be results of specific volatile compounds that would potentially create an exact flavor in a fruit. For example, a blueberry variety may provide a grape or grassy flavor.", image: "./berry_9.png"},
        {id: '2', title: "Desired Traits",text: "Like every living thing, plants have genes that reveal what characteristics they might develop. Plant geneticists scan more than 100,000 plants every year so they can tell", text2: "which varieties possess the perfect balance of genes that will offer the highest likelihood of producing desired flavors.", text3: "For example, following the earlier case of grape flavor in a blueberry, geneticists can screen through thousands of seedlings and identify all the plants capable of producing a grape flavor, and pass this information to the breeders. Another advantage of this screening is the ability to", text4: "make decisions when the blueberry plants are still seedlings, before fruit is ever produced.", text5: "That means the geneticists can predict which berries have the traits that reflect both the preferences of consumers and the demands of growers,", text6: "which saves time and resources otherwise spent in planting and tasting every single blueberry variety.", image: "./genes.png"},
        {id: '3', title: "Selecting Breeds",text: "Using the information from sensory analysts and plant geneticists,", text2: "breeders make important decisions in their natural breeding techniques that culminate in the creation of incredibly flavoral, proprietary blueberry varieties.", text3: "Cross-pollination is the optimal breeding process, which is the transfer of pollen from one plant to another. In the same way bees move pollen from plant to plant, breeders move the male pollen from one plant to the female part of a different plant. Cross-pollination is", text4: "important because it allows two separate plants with desirable characteristics to parent potentially even better children plants.", text5: "If one blueberry plant has ideal texture and color, and another blueberry plant has fruit that is especially delicious, breeders will choose to cross-pollinate the male and female versions of each plant. Ultimately, such", text6: "precise breeding techniques lead to the educated selection of varieties for planting,", text7: "which will produce fruit in a few years and undergo the same rigorous cycle of sensory, genetics, and breeding all over again.", image: "./breed.png"}
      ]
    }
  },
  methods: {
    stepEnterHandler2({element, direction, index}) {
      console.log({element, direction, index});
      this.currStepId = element.dataset.stepId
    }
  }
}
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss">
// overrides here
#scrollama-container-flexed2 {  // id="flexed" passed as prop to Scrollama in template
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
.step.is-active2 {
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