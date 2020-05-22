<template>
  <div id="explore">
    <div id="conclusion">
    <h2>People unconsciously respond to creative techniques in advertising.</h2>
    <p>This neuro data gives us a window into these unconscious processes. Our analysis revealed that fear was the most powerful tone utilized in American political media. Secondly, messaging pertaining to social-political issues of the economy, healthcare, education and climate change resonate as they align in both datasets (conscious vs. unconscious). Based on these findings, political marketing has a demonstrable influence on the American voter.</p>
    </div>
    <h2>Explore the Data</h2>
    <p>Click on each piece of content to view the neural engagement trace of the spot.</p>
    <div>
      <video
        v-for="ad in iterativeAds"
        v-bind:key="ad.name"
        class="video"
        :src="`${path}videos/${ad.videoName}.mp4`"
        type="video/mp4"
        v-on:click="onClick(ad.content_id)"
        :poster="`${path}thumbnails/${ad.videoName}.png`"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Explore',
  props: ['onClick', 'ads'],
  computed: {
    path: () => window.location.pathname,
    iterativeAds: function() {
      return _.map(this.ads.entries(), ({ key, value }) => ({
        content_id: key,
        name: _.get(_.head(value), 'name'),
        videoName: _.get(_.head(value), 'videoName'),
      }))
    },
  },
}
</script>

<style>
#explore {
  background-color: white;
  text-align: left;
  padding-left: 63px;
  position: relative;
  padding-bottom: 200px;
}

#explore h2 {
  color: #305581;
  margin: 40px, 0px, 5px, 0px;
  width: 60%;
}

#explore #conclusion {
  color: #305581;
  display: flex;
  margin-bottom: 250px;
  padding-right: 63px;
}

#explore #conclusion h2 {
  color: #305581;
  width: 45%;
  flex-shrink: 0;
}

#explore #conclusion p {
  padding-left: 20px;
}

#explore p {
  color: #305581;
  margin-bottom: 40px;
}

#explore video {
  width: 200px;
  height: 110px;
  margin: 10px;
  filter: grayscale(100%);
}

#explore video:hover {
  cursor: pointer;
  filter: grayscale(0%);
}
</style>
