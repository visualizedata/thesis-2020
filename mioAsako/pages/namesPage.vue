<template>
  <div id = "conclusion">
    <h3>EMPOWERING WOMEN IN STEM AND BEYOND</h3>
    <p> Women have experienced and still continue to experience the setbacks of a field still ingrained in socially backwards treatment of women. 
      There are deep systemic flaws that cannot be addressed overnight. On this page are names of female scientists pulled from the MEDLINE journal database, who have 
      successfully pursued careers in STEM despite these setbacks.</p>
    <p>Though institutions and scientific organizations have taken steps to address 
      these issues, we must continue to hold them accountable. And let us also continue to empower, mentor, and celebrate women both in STEM and beyond.</p>
  </div>
</template>

<script>

import womenInSTEM from "~/static/womeninSTEM_small.json";

export default {

  data() {
    return{
      womenInSTEM,
    };
  },
  mounted(){

     var theWords = Object.values(this.womenInSTEM); // .slice(0,600);

     theWords = theWords.map(function(d){ return d.toUpperCase() });

     const script = function (p5) {    
      var x = 20;
      var y = 50;
      var ysize = 25;
      var z = 0;
      var counter = 0;
      // var sourceText = "hello my name is Mio and I like boba and mango sticky rice. He is but just one example out of hundreds of men in STEM academia who have used their status and privilege to exploit women under their guidance and/or influence. Though the #MeToo movement has finally exposed the magnitude, breadth, and uniformity of the female experience of sexual misconduct globally, and ushered in a certain perspective shift in the way perpetrators of sexual misconduct are viewed, the playing field is still woefully uneven--women still must cope with the daily hazards of unearned male dominance. Women suffer financially, psychologically, and physically, especially in environments where men still dominate the field. The National Academy of Sciences reported in 2018 that the rate of sexual harassment in STEM is second only to that of the military. ";
      // var words = sourceText.split(" ");
    
      var words = theWords;

      // NOTE: Set up is here   
      p5.setup = _ => {      
        p5.createCanvas(window.innerWidth, window.innerHeight);
        p5.background(50);
        p5.textSize(24);
        p5.fill('#ff6767');   
      }
      // NOTE: Draw is here
      p5.draw = _ => {      
        if (z < words.length && counter == 1){
          p5.textSize(24);
          p5.fill('#ff6767');
          p5.textFont('Syncopate');
          if(x < window.innerWidth-100){
            p5.text(words[z], x, y);
            x += p5.textWidth(words[z])+10;
          }
          else{
            x = 20; 
            y += ysize + 2;
            p5.text(words[z], x, y);
            x += p5.textWidth(words[z]) + 10;
            p5.filter(p5.BLUR,1);
          }
          z++;
          counter = 0;
        }
        counter++;
      }  
    }   
    // NOTE: Use p5 as an instance mode
    const P5 = require('p5');
    new P5(script)
  }
};


</script>

<style>
  #conclusion{
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 50vh;
    background-color: (255,255,255,0.);
    margin: 5vh 5vh 5vh 5vh;
  }

  

</style>