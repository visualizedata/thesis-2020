<template>
  <div id="app">
    <Landing />
    <Description />
    <div class="alert alert-info" v-show="loading">Loading...</div>
    <BarChart :issues="issues"></BarChart>
    <UnconsciousEngagment />
    <Analysis
      :content="trumpAnalysis"
      id="trump"
      title="Trump's emphasis on the economy"
      description="This highly inspirational advertisement focuses on Trump’s achievements through the lens of the economy. The opening scenes (first 5 seconds) are the strongest moments with an aggregate +30% neural engagement score. Play the video or click on the chart to see the data transform."
      :onMoreInfoClick="toggleShowHowToRead"
    />
    <div id="tone">
      <h3>
        Tone of voice is another tool used to shape public opinion in political content. In the previous advertisement, Trump utilizes an inspirational tone, which our analysis found is an effective strategy. However, data indicated that a 
       <strong>fearful tone</strong> was even more <em><strong>engaging</strong></em>.
      </h3>
      <p>From an evolutionary psychology perspective, the emotion of fear can be adaptive because it focuses our attention to potential threats and, as a result, increases an organism’s odds of survival.</p>
    </div>
    <Analysis
      :content="bloombergAnalysis"
      id="bloomberg"
      title="Bloomberg utilized fear in advertising"
      description="Bloomberg utilizes a fearful tone by highlighting Trump’s erratic and irrational behavior. This highlights his inadequacies as President, inciting strong engagement. The creative tactic of audio/visual linkage underpins the success of the advertisement."
      :onMoreInfoClick="toggleShowHowToRead"
    />
    <Explore :onClick="exploreAd" :ads="advertisements" />
    <Methodology />
    <PopUp v-if="showPopup" :content="popupContent" :onClose="toggleShowPopup" />
    <Interpretation v-if="showHowToRead" :onClose="toggleShowHowToRead" />
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue'
import UnconsciousEngagment from './components/UnconsciousEngagment.vue'
import Landing from './components/Landing.vue'
import Description from './components/Description.vue'
import Analysis from './components/Analysis.vue'
import Explore from './components/Explore.vue'
import Methodology from './components/Methodology.vue'
import PopUp from './components/PopUp.vue'
import Interpretation from './components/Interpretation.vue'
import { csv, nest, timeParse } from 'd3'
import _ from 'lodash'

const getPercentDiff = (a, b) => ((a - b) / ((a + b) / 2)) * 100

export default {
  name: 'App',
  components: {
    BarChart,
    UnconsciousEngagment,
    Landing,
    Description,
    Analysis,
    Explore,
    Methodology,
    PopUp,
    Interpretation,
  },
  data() {
    return {
      loading: false,
      errored: false,
      issues: [],
      advertisements: [],
      showPopup: false,
      showHowToRead: false,
      popupContent: null,
    }
  },
  mounted() {
    this.getIssues()
    this.getAdvertisementData()
  },
  computed: {
    trumpAnalysis: function() {
      if (_.size(this.advertisements)) {
        return _.find(
          this.advertisements,
          (v, k) => k.slice(1) === '6gRl8mmKFzqSNJQKBOZRsu'
        )
      }
      return null
    },
    bloombergAnalysis: function() {
      if (_.size(this.advertisements)) {
        return _.find(
          this.advertisements,
          (v, k) => k.slice(1) === '2ZSfXfc4mZ71U4kB17iTIf'
        )
      }
      return null
    },
  },
  methods: {
    getIssues() {
      this.loading = true
      csv(`${window.location.pathname}data/surveyData.csv`, datum => ({
        issue: datum.Issue,
        percentage: +_.replace(datum.Percentage, '%', '') / 100,
      })).then(data => {
        this.loading = false
        this.issues = _.shuffle(data)
      })
    },
    async getAdvertisementData() {
      this.loading = true
      const tags = await csv(`${window.location.pathname}data/tagsData.csv`)
      const toplineData = await csv(
        `${window.location.pathname}data/toplineData.csv`
      )
      csv(`${window.location.pathname}data/braindata.csv`, datum => {
        const date = timeParse('%M:%S')(datum.offset)
        const toplineDatum = _.find(
          toplineData,
          d => d.content_id == datum.content_id
        )
        return {
          contentId: datum.content_id,
          name: datum.name,
          videoName: datum.videoName,
          samples: +datum.samples,
          NES: getPercentDiff(
            +datum['NES (Neural Engagement Score)'],
            +datum['Benchmark']
          ),
          tags: _.get(
            _.find(tags, t => t.content_id == datum.content_id),
            'issue'
          ),
          offset: date.getMinutes() * 60 + date.getSeconds(),
          average: toplineDatum.average,
          max: toplineDatum.max,
        }
      }).then(data => {
        this.loading = false
        this.advertisements = nest()
          .key(d => d.contentId)
          .map(data)
      })
    },
    toggleShowPopup() {
      this.showPopup = !this.showPopup
    },
    toggleShowHowToRead() {
      this.showHowToRead = !this.showHowToRead
    },
    updatePopupContent: function(contentId) {
      const ad = _.find(this.advertisements, (v, k) => k.slice(1) === contentId)
      this.popupContent = ad
    },
    exploreAd(contentId) {
      this.toggleShowPopup()
      this.updatePopupContent(contentId)
    },
  },
}
</script>

<style>
#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: #305581;
  position: relative;
}
#app h1 {
  font-size: 70px;
}
#app h2 {
  font-size: 40px;
  font-weight: 700;
}
#app h3 {
  font-size: 40px;
}
#app .full-height {
  height: 100vh;
}
#app .close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  -webkit-appearance: none;
  border-radius: 50%;
  border: 1px solid #305581;
  height: 2rem;
  width: 2rem;
}

#app #tone {
  padding-top: 250px;
  padding-bottom: 250px;
  padding-left: 63px;
  padding-right: 63px;
  text-align: left;
}

#app #tone p {
  width: 35%;
  padding-top: 40px;
}
</style>
