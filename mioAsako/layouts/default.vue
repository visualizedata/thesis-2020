<template>
  <div>
    <navbar />
    <nuxt />
  </div>
</template>

<script>
import navbar from '~/components/navbar'
export default {
  head:{
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Syncopate:400,700&display=swap' },

    ]
  },
  components: {
    navbar
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Syncopate:400,700&display=swap');


html {
  font-family: 'Lato', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: #ffffff;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body{
  background-color: #333333;
  font-size: 1.7em;
  line-height: 1.6;
  font-family: 'Lato', sans-serif;
  letter-spacing: -0.025rem;
}

p{
  margin-bottom: 1.25em;
}


h4,
h5,
h6 {
  font-family: 'Lato';
}

h1,
h2,
h3{
  font-family: 'Syncopate';
  text-transform: uppercase
}

h1 {
  font-size: 4rem;
  line-height: 1.2;
  letter-spacing: -0.1rem;
}

h2 {
  font-size: 3.6rem;
  line-height: 1.25;
  /* letter-spacing: -0.125rem; */
  color: #ff6767;
}

h3 {
  font-size: 3rem;
  line-height: 1.3;
  letter-spacing: -0.1rem;
  color: #ff6767;
}

h4 {
  font-size: 2.5rem;
  /* line-height: 1.35; */
  line-height: 1.28;
  /* letter-spacing: -0.08rem; */
  letter-spacing: -0.1rem;
  color: #ff6767;
}

h5 {
  font-size: 1.75rem;
  line-height: 1.3;
  letter-spacing: -0.08rem;
}

h6 {
  font-size: 1.5rem;
  line-height: 1.6;
  letter-spacing: 0;
}

p{
  font-family: 'Lato';
  font-size: 18px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>
