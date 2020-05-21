<template>
  <div id="hydrology">
    <div id="hydrology-text">
      <h3>swamps are sponges - swamp hydrology</h3>
      <p>“Crash on the levee, Mama...Water’s gonna overflow. Swamp’s gonna rise.<br>B. Dylan, Down in the Flood 2003</p>
      <p>The swamp ecosystems acts like giant sponges or reservoirs. When heavy rains cause flooding, swamps and other wetlands absorb excess water, mitigating the effects of flooding. The swamp also acts as a water treatment plant, filtering waste and purifying water naturally.</p>
    </div>
    <div id="barChart">
      <div id="tooltip">
        <p>Month Year</p>
        <p>
          Water table:
          <span></span>
        </p>
      </div>
      <svg />
    </div>
    <div id="bar-chart-explainer">
      <h3>water table level discharges and rising temperatures 1979-2019</h3>
      <p>Monitoring the water table discharges from The Great Swamp are one of the most important water management strategies for the swamp and for all global wetland environments. With the warming of global temperatures, a rise in sea levels and extreme weather patterns, the increasing amounts of water discharge is one of the markers that show the trends of climate change.</p>
      <h4>
        The importance of water and stormwater
        management in wetlands
      </h4>
      <p>The impact of the quantities of water with greater urbanization also alters the hydrologic response of The Great Swamp. The rate of stormwater runoff is accelerated, and the quality of stormwater runoff can be degraded also affecting the health of a wetland. This requires the management of stormwater runoff along with monitoring the water table level discharges from the swamp.</p>
      <h4>How to read the table</h4>
      <p>Monitoring the water table discharges from The Great Swamp are one of the most important water management strategies for the swamp and for all global wetland environments. With the warming of global temperatures, a rise in sea levels and extreme weather patterns, the increasing amounts of water discharge is one of the markers that show the trends of climate change.</p>
    </div>
    <img src="../assets/lizard.png" id="lizard" />
  </div>
</template>
<script>
import waterData from '../assets/waterData.json'
import * as d3 from 'd3'

const filteredWaterData = waterData.filter(
  d => new Date(d.monthYear) >= new Date(1975, 0)
)

export default {
  mounted() {
    this.buildBarChart()
  },
  methods: {
    buildBarChart: () => {
      const MARGINS = { left: 50, bottom: 50, right: 100, top: 0 }

      const container = d3.select('#barChart').node()

      const h = container.clientHeight
      const w = 3000
      const innerHeight = h - MARGINS.top - MARGINS.bottom
      const innerWidth = w - MARGINS.left - MARGINS.right

      // .attr('width', w)
      // .attr('height', h)

      const y = d3
        .scaleLinear()
        .range([innerHeight, 0])
        .domain([0, d3.max(filteredWaterData, d => d.mean_value)])

      const x = d3
        .scaleBand()
        .range([0, innerWidth])
        .domain(filteredWaterData.map(d => d.monthYear))
        .paddingInner(0)
        .align(0.5)

      const color = d3
        .scaleLinear()
        .range(['#2C3296', '#00FFEE'])
        .domain([0, 100])

      const svg = d3
        .select('#barChart svg')
        .attr('width', w)
        .attr('height', h)
        .append('g')
        .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`)

      svg
        .append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(
          d3
            .axisBottom(x)
            .tickValues(
              x.domain().filter(function(d, i) {
                return !(i % 50)
              })
            )
            .tickFormat(d => {
              return d3.timeFormat('%b-%d-%y')(new Date(d))
            })
        )

      const barGroups = svg
        .selectAll('.bar-group')
        .data(filteredWaterData)
        .enter()
        .append('g')
        .attr('class', 'bar-group')
        .attr('transform', d => `translate(${x(d.monthYear)},${y(0)})`)
        .each(function(d) {
          const heightBarGroup = innerHeight - y(d.mean_value)
          const numSquares = Math.ceil(heightBarGroup / x.bandwidth())
          const remainder = heightBarGroup % x.bandwidth()

          d3.select(this)
            .selectAll('.square')
            .data(d3.range(0, numSquares))
            .enter()
            .append('rect')
            .attr('class', 'square')
            .attr('y', (_d, i) => -1 * (1 + i) * x.bandwidth())
            .attr('width', x.bandwidth())
            .attr('height', (_d, i) =>
              i === numSquares.length - 1 ? remainder : x.bandwidth()
            )
            .attr('fill', (_d, i) => color(i))
        })
      barGroups.on('mouseenter', d => {
        const tooltip = d3
          .select('#barChart #tooltip')
          .style('visibility', 'visible')

        tooltip
          .transition()
          .style('left', () => `${x(d.monthYear) + MARGINS.left + 7.5}px`)
          .style('top', () => {
            return `${MARGINS.top + y(d.mean_value) - 20}px`
          })

        tooltip.select('p').html(d3.timeFormat('%B %Y')(new Date(d.monthYear)))
        tooltip.select('span').html(d.mean_value)
      })
    },
  },
}
</script>
<style>
#hydrology {
  position: absolute;
  left: 10600px;
  top: 0px;
  height: 100vh;
}
#hydrology #hydrology-text h3 {
  font-size: 22pt;
  font-weight: 700;
  color: var(--hydrology-blue);
}
#hydrology #hydrology-text {
  line-height: 32px;
  width: 800px;
  position: absolute;
  top: 150px;
  text-align: left;
}
#hydrology #hydrology-text p:first-of-type {
  font-style: italic;
  width: 580px;
}
#hydrology #hydrology-text p:nth-of-type(2) {
  width: 550px;
  margin-left: 50px;
}
#barChart .square {
  stroke: white;
  stroke-width: 0.5;
}
#barChart {
  position: relative;
  left: 750px;
  height: 50vh;
}
#barChart #tooltip {
  visibility: hidden;
  text-align: left;
  font-size: 0.75rem;
  position: absolute;
  background: white;
  padding: 0.5rem;
  border: 1px solid #2c3296;
}
#hydrology #bar-chart-explainer {
  font-size: 19pt;
  font-weight: 700;
  position: absolute;
  height: 50vh;
  left: 800px;
  top: 50%;
  text-align: left;
}
#hydrology #bar-chart-explainer h3,
#hydrology #bar-chart-explainer h4 {
  font-size: 19pt;
  font-weight: 700;
  color: var(--hydrology-blue);
  text-transform: uppercase;
  width: 750px;
}
#hydrology #bar-chart-explainer p {
  font-weight: 500;
  width: 750px;
}
#hydrology #bar-chart-explainer h4:last-of-type {
  font-size: 19pt;
  font-weight: 700;
  position: absolute;
  left: 900px;
  top: -10px;
  width: 500px;
}
#hydrology #bar-chart-explainer p:last-of-type {
  position: absolute;
  left: 900px;
  top: 70px;
    width: 750px;
}
#hydrology img#lizard {
  position: absolute;
  right: 100px;
  bottom: 250px;
  width: 145px;
}
</style>
