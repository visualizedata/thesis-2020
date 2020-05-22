<template>
  <div id="popup">
    <button class="close" v-on:click="onClose">X</button>
    <h2>{{name}}</h2>
    <div class="flex-container">
      <div>
        <video
          :id="id"
          controls
          :src="`${path}videos/${videoName}.mp4`"
          type="video/mp4"
          :poster="`${path}thumbnails/${videoName}.png`"
        />
        <Tags v-bind:tags="tags" />
      </div>
      <AnimatedLineChart
        :id="id"
        v-if="content"
        :brainData="content"
        :reportXScale="reportXScale"
        :updateVideoTime="updateVideoTime"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import AnimatedLineChart from './AnimatedLineChart'
import Tags from './Tags'
import { select, bisector, format } from 'd3'

const bisectOffset = bisector(d => d.offset).left
export const findCurrentScore = (time, brainData) => {
  const closesIdx = bisectOffset(brainData, time)
  return _.get(brainData[closesIdx], 'NES')
}
export const percentageFormatter = format('+.2')

export default {
  name: 'PopUp',
  components: {
    AnimatedLineChart,
    Tags,
  },
  props: ['content', 'onClose'],
  computed: {
    path: () => window.location.pathname,
    id: function() {
      return _.get(_.head(this.content), 'contentId')
    },
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
  methods: {
    updateVideoTime(id, newTime) {
      const videoElement = select(`[id="${id}"]`).node()
      videoElement.pause()
      videoElement.currentTime = newTime
    },
    reportXScale(id, brainData, xScale, animationOverlay) {
      this.registerVideoPlayback(id, brainData, xScale, animationOverlay)
    },
    registerVideoPlayback(id, brainData, xScale, animationOverlay) {
      const videoElement = document.getElementById(id)
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
@keyframes slideInUp {
  from {
    top: 100%;
  }
  to {
    top: 0px;
  }
}
#popup {
  height: 100vh;
  background-color: white;
  /* background: url('../assets/screenshot.png'); */
  color: #305581;
  text-align: left;
  padding-left: 63px;
  padding-top: 60px;
  position: fixed;
  left: 0px;
  animation: slideInUp 0.5s forwards;
}

#popup h2 {
  margin-bottom: 2rem;
}
#popup .flex-container {
  display: flex;
}
#popup .flex-container > div {
  flex: 1;
}
#popup video {
  width: 92%;
  height: auto;
  margin-bottom: 2.5rem;
}
#popup #tags span {
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  border: #305581 solid 1px;
  margin: 0.25rem;
}
</style>
