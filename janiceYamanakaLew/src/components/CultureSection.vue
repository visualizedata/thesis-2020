<template>
  <div id="culture">
    <div id="culture-text">
      <h3>swamps as evil</h3>
      <h5>Cursed, haunted, and filled with monsters</h5>
      <p>
        “Yeah, I’m back in the swamp... <br>those gators gonna get me” <br>
        Jim Allchin, Back in the Swamp 2011
      </p>
      <p>Throughout history, swamps have been demonized as primordial, wild and mysterious - a place that causes sickness, death and insanity, a haven for poisonous snakes man-eating alligators and wild-eyed crazies.</p>
    </div>
  </div>
</template>
<script>
import { select } from 'd3'
export default {
  name: 'CultureSection',
  mounted() {
    this.buildContents()
  },
  components: {},
  props: ['data', 'xScale'],
  computed: {
    iFrames: function() {
      return this.data.filter(d => d.iframeSrc)
    },
    films: function() {
      return this.data.filter(d => !!d.film)
    },
  },
  methods: {
    buildContents: function() {
      console.log(this.$props)
      const scale = y => this.$props.xScale(y)
      select('#culture')
        .selectAll('iframe')
        .data(this.iFrames)
        .enter()
        .append('iframe')
        .attr('src', d => d.iframeSrc)
        .attr('frameborder', 0)
        .attr('allowtransparency', true)
        .attr('allow', 'encrypted-media')
        .style('left', d => {
          return `${scale(d.year)}px`
        })
        .style('top', '650px')

      select('#culture')
        .selectAll('.film')
        .data(this.films)
        .enter()
        .append('figure')
        .html(d => {
          return `<img src="${d.film.imgSrc}" /><figcaption>${d.film.title}, 
          ${d.year}</figcaption>`
        })
        .style('left', d => {
          return `${scale(d.year)}px`
        })
        .style('top', '550px')
    },
  },
}
</script>
<style>
#culture {
  position: absolute;
  left: 5650px;
  height: 100vh;
  width: 5500px;
}
#culture #culture-text h3 {
  font-size: 22pt;
  color: var(--film-brown);
  font-weight: 700;
  line-height: 12px;
}
#culture #culture-text h5 {
    font-size: 17pt;
    width: 300px;
    color: var(--film-brown);
}
#culture #culture-text p {
  margin-left: 50px;
}
#culture #culture-text p:first-of-type {
  font-style: italic;
}
#culture #culture-text {
  width: 350px;
  position: absolute;
  left: 650px;
  top: 60%;
  text-align: left;
}
#culture iframe {
  width: 250px;
  height: 330px;
  position: absolute;
}
#culture figure {
  position: absolute;
}
#culture figure img {
  width: 250px;
  height: auto;
}
#culture figcaption {
  font-style: italic;
}
</style>
