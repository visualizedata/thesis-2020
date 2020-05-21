<template>
  <div>
    <div>
      <el-row class = "container" :style= "{backgroundImage: 'url(' + images.cover + ')' }">
        <el-col :span="24">
          <h1 class="title">
          <b>Women in STEM: </b><br/>A Lesson in Perseverance 
          </h1>
          <h2 class="subtitle">
            Overcoming sexual misconduct, harassment, and discrimination in STEM Academia
          </h2>
          <p id = "author">by Mio Akasako | Parsons School of Design MS Data Visualization | May 2020</p>
        </el-col>
      </el-row>
    </div>
    <el-row id = "intro" :style= "{backgroundImage: 'url(' + images.tarana + ')' }">
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
        <div class = "intro_text">
          <h2 class = "header">INTRODUCTION</h2>
          <p>It is now almost three years since the #MeToo movement sparked a global phenomenon that changed the 
          cultural landscape of how we perceive sexual misconduct. A term originally coined in 2006 by civil rights 
          activist Tarana Burke, #MeToo reemerged on Twitter in October 2017, where actress Alyssa Milano used it as 
          a hashtag to highlight sexual abuse by the Hollywood titan Harvey Weinstein. With this, she called out for 
          fellow survivors of sexual violation to step forward and join in on highlighting similar experiences. What 
          ensued was nothing short of extraordinary--by sheer number and persistence, the voices of women were finally 
          being legitimized in the public lense.</p>
          <p>The act of sexual misconduct has been ever present in our society--it involves a certain lack of respect 
          for other humans, and yet time and time again those who engage in it have been told it is , by virtue of inaction, 
          or lenient sentences. Why is this so?</p>
          </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <div id = "consent" >
      <el-row>
        <el-col :span="12">
          <img :src = "images.consent" style = "max-width: 100%">
        </el-col>
        <el-col :span="12" class = "consent_text">
            <h2 class = "header">THE LANGUAGE OF CONSENT</h2>
            <p>Part of the reason is that we do not have a stable foundation of education around these matters. There is a 
            severe lack of uniform understanding of boundaries, consent, and what comprises sexual misconduct across all 
            demographics in society. In a Planned Parenthood survey conducted in 2015, a nationally representative group 
            of adults age 18-95 across the US were asked questions about their views on consent and sexual assault.</p>
            <p>Women overall showed a better understanding of the definition of consent, regardless of age, marital status, 
            age, and ethnicity. However, people still held varying perspectives on what actions constituted sexual consent.</p>
        </el-col>
      </el-row>
    </div>
    <el-row id = "assault">
      <el-col :span="12">
        <div class = "assault_text">
          <h2 class = "header">AND THE CIRCUMSTANCES OF SEXUAL ASSAULT</h2>
          <p>People also held differing views on what entailed sexual assault, and who was to blame for it. This causes 
          significant problems on a macroscale level when law and order are decreed by those who do not have an understanding 
          on these matters. Most reported that they did not get education about consent and sexual assault in middle or high 
          school, and that their parents did not talk to them about these issues when growing up. </p>
        </div>
      </el-col>
      <el-col :span="12">
        <img :src = "images.assault" style = "max-width: 100%;git">
      </el-col>
    </el-row>
    <el-row id = "stem_intro" :style= "{backgroundImage: 'url(' + images.lab + ')' }">
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
        <div class = "intro_text">
          <p>The environment is especially harsh for women who work in fields that have been historically male dominated. 
            One of those fields is STEM. Women in STEM experience the highest rate of sexual harassment of any profession 
            outside of the military.  In STEM academia, though the effect of the #MeToo movement have been observed, more 
            must be done to provide a fair, equal, and respectful environment for women in the field.</p>
          </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <el-row id = "stem_intro_2">
      <el-col :span="8">
      </el-col>
      <el-col :span="8">
        <div class = "intro_text">
        <h2 class = "header">HOW SEVERE IS THE PROBLEM?</h2>
          <p>Sexual misconduct, harassment, and discrimination in STEM academia is a problem that requires change at the 
            institutional and national level. It has and still causes extensive damage to women who choose to pursue STEM 
            academia as a career. Here you can explore the breakdown of sexual misconduct cases on a macro and micro scale, 
            and also celebrate the women who have persevered through this to establish their careers.</p>
          <el-button type = "info" class="el-button-home"><NuxtLink to="chronologyPage" style = "text-decoration: none; color: #ffffff">Take a look<i class="el-icon-arrow-right el-icon-right"></i></NuxtLink></el-button>

          </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data(){
    return{
      images: {
        consent: require("~/assets/consent_v4_background.png"),
        assault: require("~/assets/assault_v4_background.png"),
        tarana: require("~/assets/tarana_march.png"),
        lab: require("~/assets/lab.png"),
        cover: require("~/assets/cover.png")
      }
    }
  }
}
</script>

<style>

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #333333;
  max-width: 100%;
  /* background: rgb(179,179,255);
  background: linear-gradient(90deg, rgba(179,179,255,1) 0%, rgba(255,179,179,1) 100%);*/
} 

.title {
  font-family: 'Syncopate', 'Lato', 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-size: 5rem;
  color: #ff6767;
  font-weight: 400;
  text-transform: uppercase;
}

.subtitle {
  color: #ffffff;
  padding-bottom: 15px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 2rem;
  text-transform: uppercase;
}

.header{
  justify-content: center;
  text-align: center;
  font-size: 3rem;
}

.links {
  padding-top: 15px;
}

.el-row {
  /* margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  min-height: 36px;
}

.el-button-home{
  position:absolute;
  left: 40%;
  margin-bottom: 5vh;
  color: #ffffff;
  text-decoration: none;
  font-family: "Lato";
}

.a{
  color: #ffffff;
}

#cover{
  min-height: 100vh;
}

#intro{
  min-height: 100vh;
}

#consent{
  max-height: 100vh;
  max-width: 100%;
}

#assault{
  min-height: 100vh;
}

#stem_intro{
  min-height: 100vh;
}

#stem_intro_2{
  min-height: 100vh;
}

.intro_text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 50vh;
}

.consent_text{
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  max-width: 50vh;
}

.assault_text{
  position: absolute;
  top: 50%;
  left: 25%;
  max-width: 50vh;
  transform: translate(-50%, -50%);
}

.ppsurvey_question{
  justify-content: center;
  text-align: center;
  margin-top: 5vh;
}

 .nuxt-link-active{
   text-decoration: none;
   font-family: 'Lato';
 }
 .a{
   text-decoration: none;
   font-family: 'Lato';
 }

 li.el-menu-item{
   text-decoration: none;
   font-family: 'Lato';
 }


</style>
