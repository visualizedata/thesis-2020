import Vue from "vue";
import intersectionObserver from "intersection-observer"; // for cross-browser support
import Scrollama from "vue-scrollama";

Vue.component("Scrollama", Scrollama);
Vue.use(intersectionObserver);