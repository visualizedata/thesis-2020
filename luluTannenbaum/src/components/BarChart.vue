<template>
  <div id="flex-container">
    <div>
      <h2>People state...</h2>
      <p>The following bar chart is reflective of the consciously stated survey data. Participants were asked ‘What do you think are the most important issues this election?’ and were not limited to one selection. The results of the question highlight five key issues that are important to a minimum of 50% of the sample: healthcare, climate change, the economy, education and immigration.</p>
    </div>
    <div id="svg-container">
      <p id="percentage">{{ formattedPercentage }} state that they care about</p>
      <select v-model="selectedIssue">
        <option v-for="issue in issues" v-bind:key="issue.issue">{{ issue.issue }}</option>
      </select>
      <svg />
    </div>
  </div>
</template>

<script>
import {
  select,
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleBand,
  format,
} from 'd3'
import _ from 'lodash'
export default {
  props: ['issues'],
  data() {
    return {
      chart: null,
      selectedIssue: null,
    }
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
  watch: {
    issues(val) {
      if (this.chart !== null) this.chart.remove()
      this.renderChart(val, this.selectedIssue)
      this.selectedIssue = _.first(val).issue
    },
    selectedIssue(val) {
      if (this.chart !== null) this.chart.remove()
      this.renderChart(this.issues, val)
    },
  },
  methods: {
    renderChart(issuesVal, selectedIssue) {
      const container = select('#svg-container').node()
      const margin = 60
      const svgWidth = container.clientWidth

      const svgHeight = svgWidth * 0.6
      const chartWidth = svgWidth - 2 * margin
      const chartHeight = svgHeight - 2 * margin

      const svg = select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)

      this.chart = svg
        .append('g')
        .attr('transform', `translate(${margin},${margin})`)

      const yScale = scaleLinear()
        .range([chartHeight, 0])
        .domain([0, _.maxBy(issuesVal, 'percentage').percentage])

      this.chart.append('g').call(axisLeft(yScale).ticks(0))

      const xScale = scaleBand()
        .range([0, chartWidth])
        .domain(issuesVal.map(s => s.issue))
        .padding(0.2)

      this.chart
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(
          axisBottom(xScale)
            .ticks(0)
            .tickValues([])
        )

      const barGroups = this.chart
        .selectAll('rect')
        .data(issuesVal)
        .enter()

      barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', g => xScale(g.issue))
        .attr('y', g => yScale(g.percentage))
        .attr('height', g => chartHeight - yScale(g.percentage))
        .attr('width', xScale.bandwidth())
        .classed('selected', d => {
          return _.isEqual(d.issue, selectedIssue)
        })
    },
  },
}
</script>
<style>
#flex-container {
  padding-top: 150px;
  padding-bottom: 200px; 
  padding-left: 63px;
  display: flex;
  text-align: left;
}

#flex-container > div {
  flex: 50%;
}
#flex-container h2 {
  margin-bottom: 40px;
  font-weight: 700; 
}
#flex-container p {
  line-height: 125%;
  width: 65%;
}
#flex-container #percentage {
  display: inline;
  margin-right: 2px;
  font-size: 1.2rem;
  font-weight: 700;
}

#flex-container select {
  background-color: transparent;
  border: none;
  outline: none;
  color: #da3767;
  border-bottom: 1px white solid;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 0;
}
select::-ms-expand {
  display: none;
}

.bar {
  fill: #ffffff;
}

.bar.selected {
  fill: #da3767;
}
</style>
