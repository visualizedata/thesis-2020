<template>
  <div id="intro">
    <div>
      <span>JANICE YAMANAKA&nbsp;</span>
      <img id="reeds" src="../assets/reeds1.png" />
      <span>&nbsp;MAY 2020</span>
    </div>
    <img id="main" src="../assets/swampWalk@2x.png" />
    <div id="intro-text">
      <h3>Stepping Into the Great Swamp</h3>
      <p class="main-intro">
        Swamps play an invaluable role in our ecosystem. They help prevent
        erosion, hold excess water to prevent flooding, filter our water and our
        pollution, provide fish nurseries, habitats for innumerable vegetation
        and wildlife and a refuge for more than one-third of all endangered
        species. With the earth’s increasing rainfall and droughts, swamps play
        an important part of our ecosystem, occupying around 5-8 percent of land
        surface on Earth, and holds almost up to 30 percent of carbon in its
        soil, which is better for our environment there than in our atmosphere.
        <br />
        <br />However, throughout history, swamps have been maligned as
        primordial, wild and mysterious -<br>a place that cause sickness, death and
        insanity, a haven for poisonous snakes, man-eating alligators and
        wild-eyed crazies.
      </p>
    </div>
  </div>
</template>
<style>
#intro {
  position: relative;
  height: 100vh;
  width: 1200px;
}

#intro > div:first-of-type {
  position: absolute;
  top: 18%;
  left: 125px;
  width: 395px;
}
#intro #intro-text {
  position: absolute;
  left: 310px;
  top: 50%;
}
#intro #intro-text h3 {
  font-size: 25pt;
  color: var(--green-text);
  font-weight: 700;
}
#intro #intro-text p {
  font-size: 13pt;
  line-height: 23pt;
  width: 800px;
  text-align: left;
  color: var(--dark-green-text);
}
#intro img#main {
  top: 28%;
  left: -300px;
  position: absolute;
  width: 1300px;
}

#intro span {
  color: var(--grey-text);
}

#intro #reeds {
  width: 95px;
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
