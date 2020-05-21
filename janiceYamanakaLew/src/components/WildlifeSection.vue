<template>
  <div id="wildlife">
    <div id="wildlife-text">
      <h3>swamp wildlife & habitats</h3>
      <p>
        Swamps are an important part of our ecosystem. Its current term
        “wetland” - is a broad term encompassing a variety of ecosystems and
        environments that filter water, brimming with wildlife and is a pure and
        pristine landform. Swamps/Wetlands are fragile ecosystems, continually
        ecologically threatened and endangereds - a place where water is
        filtered, biodiversity thrives, and a natural flood protection exists to
        protect the land, town, and cities around them.
      </p>
    </div>
    <img src="../assets/birds@2x.png" />
    <img src="../assets/turtles@2x.png" />
  </div>
</template>
<style>
#wildlife {
  position: absolute;
  left: 2400px;
  height: 100vh;
}
#wildlife #wildlife-text {
  position: absolute;
  top: 550px;
  left: 0px;
  display: flex;
  justify-content: space-between;
  width: 1750px;
}
#wildlife #wildlife-text h3 {
  font-size: 22pt;
  font-weight: 700;
  color: #afc928;
  margin-bottom: 0.5em;
  width: 600px;
  text-align: left;
}
#wildlife #wildlife-text p {
  width: 1300px;
  font-size: 17px;
  line-height: 32px;
  font-weight: 300;
  text-align: left;
  margin-top: 30px;
}
#wildlife img:nth-of-type(1) {
  height: 75%;
  position: absolute;
  bottom: 50%;
  left: 165px;
}
#wildlife img:nth-of-type(2) {
  height: 35%;
  position: absolute;
  left: 450px;
  bottom: 0px;
}

@keyframes melt {
  0% {
    bottom: 400px;
  }
  100% {
    opacity: 0px;
  }
}
</style>
