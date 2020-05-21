<template>
  <div id="timeline-two"></div>
</template>
<script>
import { select } from 'd3'
const getColor = d => {
  if (d.film) {
    return 'film-brown'
  }
  if (d.keyDate) {
    return 'key-date-pink'
  }
  if (d.iframeSrc) {
    return 'music-yellow'
  }

  return 'generic-grey'
}
export default {
  name: 'TimelineTwo',
  mounted() {
    this.drawTimeline()
  },
  props: ['xScale', 'dates'],
  methods: {
    drawTimeline() {
      const scale = this.xScale
      select('#timeline-two')
        .selectAll('.time-marker')
        .data(this.dates, d => d.year)
        .enter()
        .append('div')
        .attr('class', 'time-marker')
        .style('left', function(d) {
          return `${scale(d.year)}px`
        })
        .html(d => {
          const color = `var(--${getColor(d)})`
          const outlineColor = `var(--${getColor(d)}-outline)`
          return `<div class='circle' style="background-color: ${color}; border: 1.5px solid ${outlineColor}"}}></div><span>${d.year}</span>`
        })
    },
  },
}
</script>
<style>
#timeline-two {
  width: 10350px;
  height: 1.5px;
  background-color: var(--timeline-green);
  position: absolute;
  left: 5425px;
  top: 50%;
}
#timeline-two .time-marker {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#timeline-two .time-marker .circle {
  width: 15px;
  height: 15px;
  background-color: grey;
  border-radius: 50%;
  position: relative;
  top: -8.25px;
}
#timeline-two .time-marker .year {
}
</style>
