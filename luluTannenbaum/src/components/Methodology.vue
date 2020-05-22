<template>
  <div id="methodology">
    <h2>Methodology</h2>
    <p>
      This project was completed by Lulu Tanenbaum as part of a graduate thesis for the Master of Science in Data Visualization at the Parsons School of Design; Thesis advisor Daniel Sauter. The project was completed in partnership with Brainsights, a neuromarketing consultancy based in Toronto, Canada.  
    </p>
    <p>
      The data was collected by Brainsights during research studies in Manhattan, New York and Chattanooga, Tennessee between February 3–6, 2020. The data analysis was completed by Lulu Tanenbaum and the implementation of the visualization was produced by Lulu Tanenbaum and Katherine Mello. 
    </p>
    <p>
    Brainsights research team used electroencephalography (EEG) to measure the unconscious brain activity of participants as they watched a variety of content. Electroencephalography records brain response at the millisecond level. Brainsights presented content reels to research participants on television and mobile devices and in varied order to control for priming/ordering effects. All data is aggregated and reports are reflective of the entire sample, not an individual participant. All reports are stripped of any personal identification information. For complete methodological review, <a href="https://github.com/lulujordanna/thesis/blob/master/documentation/methodology.md">click here.</a>
    </p>
    <div id="img-row">
      <img src="../assets/brainsightsLogo.png" alt="brainsights logo" />
      <img src="../assets/parsonsLogo.png" alt="parsons logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Methodology',
}
</script>

<style>
#methodology {
  text-align: left;
  padding-top: 60px;
  padding-left: 63px;
  height: 100vh;
  position: relative;
}

#methodology h2 {
  margin: 40px 0px;
}

#methodology p {
  width: 60%;
  line-height: 125%;
}

#methodology #img-row {
  position: absolute;
  bottom: 100px;
}

#methodology img:nth-of-type(1) {
  width: 115px;
  margin-right: 30px;
}
#methodology img:nth-of-type(2) {
  width: 135px;
}

#methodology a {
  color: #da3767; 
}

#methodology a:hover {
  color: white;
  text-decoration: none; 
}
</style>
