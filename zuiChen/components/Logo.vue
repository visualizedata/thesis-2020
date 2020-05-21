<template>
  <img class="Mask" src="/mask-front.png" width="245" height="180"/>
</template>
<style>
.Mask {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
