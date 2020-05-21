<template>
    <div>
        <nuxt-link to="/one">
        <img class="polaroid" id="pol-1" src="~assets/bb-polaroid.svg" alt="polaroid" @mouseover="mouseoverPolaroid" @mouseout="mouseoutPolaroid">
        </nuxt-link>
        <nuxt-link to="/two">
        <img class="polaroid" id="pol-2" src="~assets/leaf-polaroid.svg" alt="polaroid" @mouseover="mouseoverPolaroid"  @mouseout="mouseoutPolaroid">
        </nuxt-link>
        <nuxt-link to="/three"> 
        <img class="polaroid" id="pol-3" src="~assets/network-polaroid.svg" alt="polaroid" @mouseover="mouseoverPolaroid"  @mouseout="mouseoutPolaroid">
        </nuxt-link>
    </div>
</template>

<script>
export default {
    methods: {
        mouseoverPolaroid(event) {
      console.log(event.target)
      let allPolaroids = document.querySelectorAll('.polaroid')
      let polaroid = event.target.getAttribute('id')
      console.log(polaroid)

      let selectStory = document.getElementById('select-story')
      console.log(selectStory)
      selectStory.style.fontSize = '30px'

      let memorial = document.querySelector('#memorial')
      let memorialPaths = memorial.querySelectorAll('path')
  
      for (let path of memorialPaths) {
          path.classList.add('greyedSVG') 
      }
   

      allPolaroids.forEach(pol => {
        if (pol.id != polaroid) {
          pol.style.opacity = 0.2;
        }
      })

      if (polaroid == "pol-1") {
        selectStory.innerHTML = 'An American Tragedy in the context of an American Pastime'
      } else if (polaroid == "pol-2") {
        selectStory.innerHTML = 'Two approaches to urban gun violence reduction'
      } else {
        selectStory.innerHTML = 'Advancing Peace in Sacramento, CA'
      }
    },
    mouseoutPolaroid(event) {
      let allPolaroids = document.querySelectorAll('.polaroid')
      allPolaroids.forEach(pol => {
          pol.style.opacity = 1;
      })
      
      let polaroid = event.target.getAttribute('id')
      let selectStory = document.getElementById('select-story')
      selectStory.innerHTML = 'Choose a story'
      selectStory.style.fontSize = '35px'

      let memorial = document.querySelector('#memorial')
      let memorialPaths = memorial.querySelectorAll('path')
  
      for (let path of memorialPaths) {
          path.classList.remove('greyedSVG') 
      }
    }
    }
}
</script>
<style>
.polaroid {
  width: 14vw;
  position: absolute;
  top: 0;
}

#pol-1 {
  left: 0;
}

#pol-2 {
  left: 16vw;
}

#pol-3 {
  left: 32vw;
}

</style>