<template>
  <div id="unconscious">
    <h3>
      People <strong><em>unconsciously</em></strong> engage with messaging about The Economy, Healthcare, Education and Climate Change.
    </h3>
    <img src="../assets/issuesOverlap.png" />
    <h2>
      How does the economy <em>resonate unconsciously?</em>
    </h2>
    <p><strong>On aggregate for neural engagement (the key metric), the issue of the economy is 8% greater than benchmark.</strong> Neural engagement is a composite measure of beta, gamma and theta waves collected from the EEG. These waves are associated with audience attention, emotional resonance and encoding to memory. Thus, neural engagement presents a high level read on the engagement/persuasiveness of specific stimuli.</p>
    <p>The following graph highlights one-second segments in the advertisements, that relate to the economy.  Each of these scenes are strong performing, as they have a neural engagement score of 10% or higher. Many of these moments highlight effective use of superimposed text or graphics that are often linked directly to the subject matter.</p>
   <img src="../assets/economyMoments.png" />
  </div>
</template>

<script>
export default {
  name: 'Unconscious',
  data() {
    return {}
  },
}
</script>

<style>
#unconscious {
  background-color: white;
  text-align: left;
  padding-top: 200px;
  padding-left: 63px;
  position: relative;
}

#unconscious h3 {
  color: #305581;
  margin: 40px 0px 60px 0px;
  width: 90%;
}

#unconscious h2 {
  color: #305581;
  font-weight: 700;
  margin: 40px 0px;
  width: 80%;
}

#unconscious p {
  line-height: 125%;
  color: #305581;
  width: 50%;
}

#unconscious img:nth-of-type(1) {
  width: 100vh;
  padding-bottom: 210px;
}

#unconscious img:nth-of-type(2) {
  width: 120vh;
  margin-top: 40px; 
}

#unconscious #analysis {
  display: flex;
}

#unconscious #analysis > div {
  flex: 1;
}

#unconscious #analysis video {
  width: 100%;
}

#unconscious video {
  width: 200px;
  height: auto;
  margin: 10px;
}
</style>
