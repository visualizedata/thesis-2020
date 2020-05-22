<template>
  <div id="interpretation" class="full-height">
    <button class="close" v-on:click="onClose">X</button>
    <div>
      <h2>What does the data mean?</h2>
      <p>Neural Engagement is a composite measure of beta, gamma and theta waves collected from the EEG. These waves are associated with audience attention, emotional resonance and encoding to memory. Neural engagement presents a high level read on the engagement/persuasiveness of specific stimuli.</p>
      <p>The <strong>Neural Engagement Trace</strong> charts the moment-by-moment aggregated neural engagement for the sample.  The <strong>Neural Engagement Score</strong> reports the performance of the content across the duration of the spot, relative to the content benchmark.</p>
    </div>
    <div>
      <img src="../assets/readTheData.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Interpretation',
  props: ['onClose'],
}
</script>

<style>
@keyframes slideDown {
  from {
    top: -100%;
  }
  to {
    top: 0px;
  }
}
#interpretation {
  background-color: white;
  text-align: left;
  display: flex;
  padding-top: 150px;
  padding-left: 63px;
  position: fixed;
  left: 0px;
  animation: slideDown 0.5s forwards;
}

#interpretation > div {
  flex: 50%;
  max-width: 50%;
}

#interpretation img {
  max-width: 90%;
}

#interpretation h2 {
  color: #305581;
  margin: 40px 0px;
  width: 90%;
}
#interpretation p {
  color: #305581;
  width: 90%;
}
</style>
