<template>
  <div :id="id" class="linechart-svg-container">
    <svg />
    <span class="legend">Benchmark</span>
    <span class="legend">Neural Engagement</span>
    <h5>Top Neural Engagement Scores</h5>
    <p>
      Current Second
      <span class="time metadata">0%</span>
    </p>
    <p>
      Average Engagement
      <span class="avg metadata">+17%</span>Max Engagement
      <span class="max metadata">+54%</span>
    </p>
  </div>
</template>

<script>
import {
  select,
  scaleLinear,
  line,
  axisBottom,
  axisLeft,
  format,
  extent,
  timeFormat,
  event,
} from 'd3'
import _ from 'lodash'
export default {
  props: ['brainData', 'reportXScale', 'updateVideoTime', 'id'],
  mounted() {
    this.renderChart(this.brainData)
  },
  computed: {
    formattedPercentage: function() {
      if (_.isNil(this.selectedIssue)) {
        return ''
      }
      const issueObj = _.find(this.issues, i => i.issue === this.selectedIssue)
      return format('.0%')(issueObj.percentage)
    },
  },
  methods: {
    renderChart(brainData) {
      select(`[id="${this.id}"].linechart-svg-container svg`)
        .selectAll('*')
        .remove()
      const container = select(
        `[id="${this.id}"].linechart-svg-container`
      ).node()
      const margin = 30
      const svgWidth = container.clientWidth

      const svgHeight = svgWidth * 0.6
      const chartWidth = svgWidth - 2 * margin
      const chartHeight = svgHeight - 2 * margin

      const svg = select(`[id="${this.id}"] svg`)
        .attr('width', svgWidth)
        .attr('height', svgHeight)

      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin},${margin})`)

      const yScale = scaleLinear()
        .range([chartHeight, 0])
        .domain([-100, 100])
      // .domain([
      //   _.minBy(this.content, 'NES')['NES'],
      //   _.maxBy(this.content, 'NES')['NES'],
      // ])

      chart.append('g').call(axisLeft(yScale).ticks(0))

      const xScale = scaleLinear()
        .range([0, chartWidth])
        .domain(extent(brainData.map(d => d.offset)))

      chart
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .attr('class', 'axis')
        .call(
          axisBottom(xScale).tickFormat(d =>
            timeFormat('%M:%S')(new Date(0).setSeconds(d))
          )
        )
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')

      chart
        .append('g')
        .attr('transform', `translate(0, 0)`)
        .attr('class', 'axis')
        .call(
          axisLeft(yScale)
            .tickValues([-100, -75, -50, -25, 0, 25, 50, 75, 100])
            .tickFormat(d => `${d}%`)
        )

      chart
        .append('path')
        .datum(brainData)
        .attr('class', 'line')
        .attr(
          'd',
          line()
            .x(d => xScale(d.offset))
            .y(d => yScale(d.NES))
        )

      const progressOverlay = chart
        .append('rect')
        .attr('transform', 'translate(1, 0)')
        .attr('width', chartWidth)
        .attr('height', chartHeight)
        .attr('fill', 'white')

      // benchmark
      chart
        .append('path')
        .datum(brainData)
        .attr('class', 'benchmark-line')
        .attr(
          'd',
          line()
            .x(d => xScale(d.offset))
            .y(yScale(0))
        )

      svg.on('click', () => {
        const xOffset = event.offsetX - margin
        const newTime = xScale.invert(xOffset)
        this.updateVideoTime(this.id, newTime)
      })

      const first = _.head(brainData)
      const pFormat = format('+.0%')
      select(container)
        .select('.avg')
        .html(pFormat(_.get(first, 'average')))
      select(container)
        .select('.max')
        .html(pFormat(_.get(first, 'max')))

      this.reportXScale(this.id, brainData, xScale, progressOverlay)
    },
  },
}
</script>
<style>
.linechart-svg-container h5 {
  margin-top: 50px;
}
.linechart-svg-container span.metadata {
  color: #a44b6d;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0px 1.5rem;
}

.linechart-svg-container .axis path {
  stroke: #e8ebef;
}

.linechart-svg-container .axis .tick line {
  stroke: #e8ebef;
}
.linechart-svg-container .axis text {
  font-size: 0.5rem;
  fill: #5d697b;
  stroke: none;
}

path.benchmark-line {
  stroke: #3a3737;
  stroke-dasharray: 3 1;
  stroke-width: 0.75;
  fill: none;
}

.linechart-svg-container .line {
  stroke: #a44b6d;
  fill: none;
  stroke-width: 3;
}

.linechart-svg-container span.legend {
  position: relative;
  margin-left: 75px;
  font-size: 0.5rem;
  color: #5d697b;
}
.linechart-svg-container span.legend:nth-of-type(1) {
  margin-left: 200px;
}

.linechart-svg-container span.legend:before {
  content: '';
  position: absolute;
  bottom: 5px;
  left: -50px;
  width: 40px;
}
.linechart-svg-container span.legend:nth-of-type(1):before {
  border-bottom: 1px dashed #3a3737;
}
.linechart-svg-container span.legend:nth-of-type(2):before {
  border-bottom: 2px solid #a44b6d;
}
</style>
