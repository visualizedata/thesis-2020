<template>
  <div id="tags">
    <span v-for="tag in tags" v-bind:key="tag">{{tag}}</span>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  props: ['tags'],
}
</script>
<style>
#tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#tags span {
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  border: black solid 1px;
  margin: 0.25rem;
}
</style>