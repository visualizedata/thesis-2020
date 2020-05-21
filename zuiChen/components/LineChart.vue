<template>
<!-- Create a div where the graph will take place -->
<div>

  <svg ref="svgLineChart" class="line-chart"></svg>
  <NgramsGraph :currentDate="selectedDate" :rangeChanged="rangeChanged" class="n-gram"/>
</div>
</template>

<script>
  import * as d3 from "d3";
  import volume_intensity from "~/assets/volumeIntensity.json";
  import peaks from "~/assets/peaks.json";
  import NgramsGraph from '~/components/NgramsGraph.vue';

  export default {
    name: "LineChart",
    props:['selectedStartDate'],
    components: {
      NgramsGraph
    },
    data(){
      return {
        rangeChanged:false,
        data: [],
        svg:null,
        startDate: "Since 2017",
        margin: {
          top: 50,
          left: 50,
          right: 50,
          bottom: 50
        },
        height: 800,
        width: 1600,
        selectedDate: null
      }
    },
    watch:{
      selectedStartDate(val, oldVal){
        this.startDate = val;
        // this.updateChart(val);
        d3.selectAll("svg > *").remove();
        this.createChart();
        this.rangeChanged=true;
      }
    },
    computed:{
      parseStartDate(){
        console.log(this.startDate);
        if (this.startDate==="Since 2017"){
          return new Date("2017-04-06")
        } else if (this.startDate==="Since 2018"){
          return new Date("2018-01-01")
        } else if (this.startDate==="Since 2019 Hongkong Protest"){
          return new Date("2019-01-01")
        } else {
          return new Date("2020-01-01")
        }
      }
    },
    methods: {
      // formatDate(){
      //   return d3.timeParse("%Y-%m-%d");
      // },
      // x(){
      //   return d3.scaleTime()
      //     .domain([this.parseStartDate, d3.max(this.data, d => d.date)])
      //     .range([this.margin.left, this.width - this.margin.right]);
      // },
      // y(){
      //   return d3.scaleLinear()
      //     .domain([0, d3.max(this.data, d => d.value)]).nice()
      //     .range([this.height - this.margin.bottom, this.margin.top]);
      // },
      // xAxis(){
      //   return d3.axisBottom(this.x).ticks(this.width / 80).tickSizeOuter(0);
      // },
      // yAxis(){
      //   return d3.axisLeft(this.y);
      // },
      // updateChart(domainStart){
      //   const zx=this.x;
      //   const line = d3.line()
      //     .this.x(d=>zx(d.date))
      //     .this.y(d=>this.y(d.value));
      //
      //   const gx = svg.append("g")
      //     .call(this.xAxis, this.zx);
      //
      //   const gy = svg.append("g")
      //     .call(this.yAxis, this.y);
      //
      //   const t = this.svg.transition().duration(750);
      //
      //   zx.domain([domainStart, d3.max(this.data, d => d.date)]);
      //   gx.transition(t).call(this.xAxis, this.zx);
      //   this.svg.select("path").transition(t).attr("d", line(this.data));
      // },
      createChart() {
        var formatDate = d3.timeParse("%Y-%m-%d");
        const data = volume_intensity.map(({Date,VolumnIntensity})=>(
          {date: formatDate(Date), value: VolumnIntensity*100}
        ));
        const peak_data = peaks.map(({date,value,keywords})=>(
          {date: formatDate(date), value: value*100, keywords}
        ))
        const svgDOM = this.$refs.svgLineChart;


        const svg = d3.select(svgDOM)
          .attr("width", '100%')
          .attr("height", this.height)
          .attr("viewBox",[0,0,this.width,this.height]);

        svg.append("clipPath")
            .attr("id", "linechart-clip")
            .append("rect")
            .attr("x", this.margin.left)
            .attr("y", 0)
            .attr("width", this.width - this.margin.left - this.margin.right)
            .attr("height", this.height);


        const x = d3.scaleTime()
          .domain([this.parseStartDate, d3.max(data, d => d.date)])
          .range([this.margin.left, this.width - this.margin.right]);

        const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value)]).nice()
          .range([this.height - this.margin.bottom, this.margin.top]);

        const xAxis = d3.axisBottom(x)
          .ticks(this.width / 80)
          .tickSizeOuter(0);

        const yAxis = d3.axisLeft(y);

        // const line = d3.line()
        //   .x(d => x(d.date))
        //   .y(d => y(d.value));
        const line = d3.line()
          .x(d => d.cx)
          .y(d => d.cy);

        const t2 = svg.transition().duration(750);

        svg.append("g")
         .attr("class","xAxis")
         .style("font-size","22px")
         .style("font-family","Garamond")
         .attr("transform", `translate(0, ${this.height-this.margin.bottom})`)
         .call(xAxis);

       // svg.append("g")
       //  .attr("class","yAxis")
       //  .attr("transform", `translate(${this.margin.left},0)`)
       //  .call(yAxis);

        const circles = svg.selectAll("circle")
          .data(peak_data)
          .enter()
          .append("circle")
          .attr("class","circle")
          .attr("cx", d=>x(d.date))
          .attr("cy", d=>y(d.value))
          .attr("r",20)
          .attr("clip-path", "url(#linechart-clip)")
          .style("fill","#FBDD4A")
          .on('click',d=>{this.selectedDate=d.date});

        const path = svg.append("path")
            // .datum(data)
            .attr("fill", "none")
            .attr("stroke", "black ")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            // .attr("d", line)
            // .attr("class","trendLine")
            // .attr("clip-path", "url(#linechart-clip)")
            // .transition()
            // .duration(500)
            // .ease(d3.easeLinear)
            // .attrTween("stroke-dasharray", function() {
            //     const length = this.getTotalLength();
            //     return d3.interpolate(`0,${length}`, `${length},${length}`);
            // });

            const duration = 500;
            const delay = 2;

            const newData = data.map((d,i)=>{
              const xvalue = x(d.date);
              const yvalue = y(d.value);
              const sy = this.height - this.margin.bottom;
              const sx = xvalue;
              return {
                x:xvalue,
                y:yvalue,
                sx:sx,
                sy:sy,
                cx:sx,
                cy:sy
              }
            });


            const timer = d3.timer(absT => {
            if (absT > duration + delay * newData.length) {
              timer.stop();
            }
            newData.forEach((d, i, a) => {
              const elapsed = Math.min(duration, absT - delay * i);
              if (elapsed < 0) return;
              const t = d3.easeBackOut(elapsed / duration);
              a[i].cx = d.sx + (d.x - d.sx) * t;
              a[i].cy = d.sy + (d.y - d.sy) * t;
            });
            path.attr('d', line(newData));

          });
      }
    },
    mounted() {
      this.createChart();
    }

  }
</script>

<style>


  .line-chart{
    position:absolute;
    z-index: 0;
  }

  .n-gram{
    /* position:absolute; */
    z-index:5;
    padding-left: 400px;
    height: 1000px;
  }
  .xAxis path, .xAxis line, .yAxis path, .yAxis line{
    fill: none;
    stroke: none;
  }

</style>
