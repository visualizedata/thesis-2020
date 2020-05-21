<template>
  <div id="jetport">
    <img id="airplanes" src="../assets/airplanes.png" />
    <div id="jetport-text">
      <h3>the battle to defeat the jetport - saving the great swamp</h3>
      <p>“The swamp’s full of scumbags ‘n shiny things with price tags...<br>Everybody's makin' a deal. No, we don't want to fight but we'll stand up for our rights.<br>C Matthew Smith, The Patriot Song 2020</p>
      <p>The New York Port Authority announces plans to pave over The Great Swamp and destroy the area’s communities in order to build the world’s largest regional airport.</p>
    </div>
    <div id="jet-age-text">
      <h5>The Dawn of the 'Jet Age'</h5>
      <p>With the introduction of the Boeing 707 and Douglas DC-8 airliners, air travel, predictions show that 4x the amount of passengers would be traveling through the tri-state area by 1978.</p>
    </div>
  </div>
</template>
<script>
import { select } from 'd3'
import _ from 'lodash'
export default {
  name: 'JetportSection',
  props: ['xScale', 'keyDates'],
  mounted() {
    this.buildContent()
  },
  methods: {
    buildContent() {
      const scale = y => this.$props.xScale(y)
      select('#jetport')
        .selectAll('iframe')
        .data(this.keyDates)
        .enter()
        .append('div')
        .attr('class', 'key-date')
        .html(
          d => `<h5>${d.keyDate.title}</h5>
      <p>${d.keyDate.text}</p>`
        )
        .style('left', d => `${scale(d.year)}px`)
        .style('top', d => `${_.get(d.style, 'top', 100)}px`)
        .style('width', d => `${_.get(d.style, 'width', 400)}px`)
    },
  },
  // methods: {
  //     console.log('FILMS', this.films)
  //     select('#jetport')
  //       .selectAll('.film')
  //       .data(this.films)
  //       .enter()
  //       .append('figure')
  //       .html(d => {
  //         return `<img src=${require(d.film.imgSrc)} /><figcaption>${(d.film
  //           .title,
  //         d.year)}</figcaption>`
  //       })
  //       .style('left', d => {
  //         return `${scale(d.year)}px`
  //       })
  //       .style('top', '350px')
  //   },
  // },
}
</script>
<style>
#jetport {
  position: absolute;
  left: 5650px;
  top: 0px;
  height: 50vh;
  width: 5500px;
}
#jetport img#airplanes {
  position: absolute;
  top: -90px;
  left: 375px;
}
#jetport-text {
  position: absolute;
  line-height: 32px;
  left: 100px;
  top: 100px;
  text-align: left;
}
#jetport .key-date {
  position: absolute;
  left: 1400px;
  top: 50px;
  width: 800px;
  text-align: left;
}
#jetport .key-date h5 {
  color: var(--key-date-pink);
}
#jetport .key-date p {
  margin-left: 50px;
}
#jetport #jetport-text h3 {
  font-size: 22pt;
  font-weight: 700;
  color: var(--jetport-purple);
}
#jetport #jetport-text p {
  line-height: 32px;
  margin-left: 150px;
  width: 900px;
}
#jetport #jetport-text p:first-of-type {
  font-style: italic;
}
#jetport #jet-age-text {
  position: absolute;
  left: 1400px;
  top: 30px;
  text-align: left;
}
#jetport #jet-age-text h5 {
  color: var(--key-date-pink);
}
#jetport #jet-age-text p {
  width: 850px;
}
</style>
