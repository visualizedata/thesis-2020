<template>
  <div id="legend">
    <div v-for="d in dataTypes" :key="d.name">
      <div
        class="circle"
        v-bind:style="{ backgroundColor: d.color, border: `1.5px solid ${d.outline}` }"
      />
      <span>{{d.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Legend',
  props: ['dataTypes'],
}
</script>
<style>
#legend {
  position: fixed;
  left: 1250px;
  top: 52vh;
  background-color: white;
  padding: 0.5rem;
  z-index: 10;
}
#legend > div {
  display: flex;
  align-items: flex-end;
  font-size: 14.75px;
  color: var(--grey-text);
  margin-bottom: 12px;
}
#legend .circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
}
</style>
