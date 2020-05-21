<template>
  <div id="history">
    <div id="history-text">
      <h3>the great swamp in new jersey is formed</h3>
      <p>
        15,000 years ago, the Great Wisconsin glacier retreated slowly northward
        leaving vast quantities of rock, soil, and glacial till. As it
        retreated, the melting waters of the glacier flowed into a basic forming
        a lake measuring 30 miles long by 10 miles wide. As the water continued
        to retreat and drain out towards the Hudson River,<br>The Great Swamp was
        formed, flanked by the Wachung Mountains
      </p>
    </div>
    <img src="../assets/newJersey@2x.png" />
    <div id="glaciers">
      <img src="../assets/glaciers@2x.png" />
    </div>
  </div>
</template>
<style>
#history {
  position: relative;
  height: 100vh;
  display: block;
}
#history #history-text {
  position: absolute;
  top: 7%;
  left: 35px;
  width: 800px;
}
#history #history-text h3 {
  font-size: 22pt;
  font-weight: 700;
  color: var(--blue-text);
  margin-bottom: 0.5em;
  text-align: left;
}
#history #history-text p {
  font-size: 17px;
  line-height: 32px;
  font-weight: 300;
  text-align: left;
  width: 80%;
  left: 5%;
  position: relative;
}
#history > img:nth-of-type(1) {
  height: 525px;
  position: absolute;
  left: 775px;
  top: 25px;
}
#history #glaciers {
  /* animation: melt 3s forwards; */
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: auto;
  width: auto;
}
#history #glaciers img:first-of-type {
  height: 645px;
  position: absolute;
  left: 0px;
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
