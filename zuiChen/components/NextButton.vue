<template>
  <div class="next-button">
    <div id="text-container">
    [ <n-link :to="routerLink">next</n-link> ]
    </div>
  </div>
</template>

<script>
export default {
  name: "NextButton",
  props:['routerLink']
}
</script>

<style>

@font-face {
  font-family: 'Garamond',cursive;
  src: url('~assets/Garamond.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.next-button{
  display:flex;
  font-family: 'Garamond';
  font-size: 30px;
  width: 120px;
  height: 120px;
  color: black;
  justify-content: center;
  align-items: center
}

.next-button:hover{
  background-image:url('~assets/turnRight.gif');
  background-size: 120% 120%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: none;
}

/* #text-container{
  position: absolute;
  top:25%;
} */

a, a:link, a:visited, a:link, a:visited{
  color: black;
  text-decoration:none;
}
a:hover{
  border-bottom-width: 3px;
  border-bottom-style: solid;
  padding-bottom: 4px;
}
</style>
