<template>
  <div id="analysis">
    <h2>
      {{title}}
      <button class="more-info" v-on:click="onMoreInfoClick">i</button>
    </h2>
    <div class="flex-container">
      <div>
        <p>{{description}}</p>
        <video
          :id="id"
          controls
          :src="`${path}videos/${videoName}.mp4`"
          type="video/mp4"
          :poster="`${path}thumbnails/${videoName}.png`"
        />
        <Tags :tags="tags" />
      </div>
      <AnimatedLineChart
        v-if="content"
        :brainData="content"
        :reportXScale="reportXScale"
        :updateVideoTime="updateVideoTime"
        :id="id"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import AnimatedLineChart from './AnimatedLineChart'
import { select } from 'd3'
import Tags from './Tags'
import { percentageFormatter, findCurrentScore } from './PopUp'

export default {
  name: 'Analysis',
  components: {
    AnimatedLineChart,
    Tags,
  },
  computed: {
    path: () => window.location.pathname,
    name: function() {
      return _.get(_.head(this.content), 'name')
    },
    videoName: function() {
      return _.get(_.head(this.content), 'videoName')
    },
    tags: function() {
      return _.split(_.get(_.head(this.content), 'tags'), '-')
    },
  },
  props: ['content', 'id', 'title', 'description', 'onMoreInfoClick'],
  methods: {
    updateVideoTime(id, newTime) {
      const videoElement = select(`#analysis [id="${id}"]`).node()
      videoElement.pause()
      videoElement.currentTime = newTime
    },
    reportXScale(id, brainData, xScale, animationOverlay) {
      this.registerVideoPlayback(id, brainData, xScale, animationOverlay)
    },
    registerVideoPlayback(id, brainData, xScale, animationOverlay) {
      const videoElement = select(`#analysis [id="${id}"]`).node()
      videoElement.ontimeupdate = () => {
        animationOverlay
          .transition()
          .duration(250)
          .attr('x', xScale(videoElement.currentTime))
        const NES = findCurrentScore(videoElement.currentTime, brainData)
        select(`[id="${this.id}"] .time`).html(`${percentageFormatter(NES)}%`)
      }
    },
  },
}
</script>

<style>
#analysis {
  background-color: white;
  /* background: url('../assets/screenshot.png'); */
  color: #305581;
  text-align: left;
  padding-left: 63px;
  padding-top: 200px;
  padding-bottom: 200px;
  position: relative;
}
#analysis .more-info {
  font-size: 1.25rem;
  font-weight: bold;
  -webkit-appearance: none;
  color: #305581;
  border-radius: 50%;
  border: 1px solid #305581;
  height: 1.75rem;
  width: 1.75rem;
  vertical-align: middle;
}

#analysis h2 {
  margin-bottom: 2rem;
}
#analysis .flex-container {
  display: flex;
}
#analysis .flex-container > div {
  flex: 1;
}
#analysis video {
  width: 92%;
  height: auto;
  margin-bottom: 2.5rem;
}
#analysis #tags span {
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  border: #305581 solid 1px;
  margin: 0.25rem;
}

#analysis .linechart-svg-container {
  margin-top: 80px;
}
</style>
