<template>
  <div id="future">
    <img id="herons" src="../assets/herons.svg" />
    <div id="acknowledgements">
      <h4>Acknowledgments</h4>
      <p>This essay was written by Janice Yamanaka in partial fulfillment of the requirements for the degree of Master of Science in Data Visualization, at Parsons School of Design | The New School. Thank you to the professors at Parsons: Aaron Hill, Daniel Sauter, Christian Swinehart, Richard The and Alec Barrett; and both of the graduate classes of 2019/20.</p>

      <p>Data was mostly collected from US governmental organizations, including: the New Jersey Department of Environmental Protection's Bureau of GIS (NJDEP GIS) Land Open Data, the U.S. Geological Survey (USGS), National Water Information System, the U.S. Fish and Wildlife Service (FWS), Spotify, and the Internet Movie Database (IMDB) for which you can find the direct links to the data in the sources section below.</p>

      <p>This visual essay was built with Vue CLI 3, D3, and Mapbox Studio. I also used the help of the scrollConverter 1.0.4 for scroll events.</p>

      <p>A special thanks to my children, Kian, Cole and Galen for always keeping it real and always giving critical and constructive evaluations of my work (and my frame of mind).</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FutureSection',
}
</script>
<style>
#future {
  position: absolute;
  left: 15300px;
  top: 0px;
  height: 100vh;
  text-align: start;
}
#future #herons {
  width: 383px;
  position: absolute;
  top: -40px;
}
#future #acknowledgements {
  position: absolute;
  bottom: -75px;
  left: 450px;
  width: 640px;
}
#future #acknowledgements h4 {
  font-size: 17pt;
  color: var(--hydrology-blue);
  text-transform: uppercase;
}
#future #acknowledgements p {
  font-size: 11pt;
  line-height: 18pt;
  width: 540px;
}
</style>
