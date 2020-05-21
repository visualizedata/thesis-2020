<template>
  <div id="container">
    <Legend v-bind:data-types="dataTypes" />
    <Timeline />
    <IntroSection />
    <HistorySection />
    <WildlifeSection />
    <MapSection />
    <TimelineTwo v-if="xScale__Culture" :x-scale="xScale__Culture" :dates="cultureData" />
    <CultureSection
      v-if="xScale__Culture && cultureData"
      :data="cultureData"
      :x-scale="xScale__Culture"
    />
    <JetportSection v-if="xScale__Culture" :key-dates="keyDates" :x-scale="xScale__Culture" />
    <HydrologySection />
    <FutureSection />
  </div>
</template>

<script>
/* eslint-disable */
import { scaleLinear } from 'd3'
import _ from 'lodash'
import Legend from './components/Legend.vue'
import Timeline from './components/Timeline.vue'
import HydrologySection from './components/HydrologySection.vue'
import IntroSection from './components/IntroSection.vue'
import HistorySection from './components/HistorySection.vue'
import WildlifeSection from './components/WildlifeSection.vue'
import MapSection from './components/MapSection.vue'
import CultureSection from './components/CultureSection.vue'
import TimelineTwo from './components/TimelineTwo.vue'
import JetportSection from './components/JetportSection.vue'
import FutureSection from './components/FutureSection.vue'

export default {
  components: {
    Legend,
    Timeline,
    HydrologySection,
    IntroSection,
    HistorySection,
    WildlifeSection,
    MapSection,
    CultureSection,
    TimelineTwo,
    JetportSection,
    FutureSection,
  },
  data: () => ({
    dataTypes: [
      {
        name: 'Jetport',
        color: '#74438C',
        outline: '#8f73a4',
      },
      {
        name: 'Swamp Music',
        color: '#D08E14',
        outline: '#d6b167',
      },
      {
        name: 'Swamp Films',
        color: '#754C24',
        outline: '#927a5e',
      },
      {
        name: 'Key Dates',
        color: '#EC008C',
        outline: '#e26eb7',
      },
      {
        name: 'Hydrology',
        color: '#6DA5C6',
        outline: '#a1bed5',
      },
      {
        name: 'Wildlife/Habitat',
        color: '#6F922A',
        outline: '#98ac68',
      },
    ],
    cultureData: [
      {
        year: 1939,
        iframeSrc:
          'https://open.spotify.com/embed/track/4PN5gbJNYWx9yQ6hJepPbG',
      },
      {
        year: 1946,
        film: {
          title: 'Strangler of the Swamp',
          imgSrc: 'img/StrangleroftheSwamp.png',
        },
      },
      {
        year: 1954,
        film: {
          title: 'Creature from the Black Lagoon',
          imgSrc: 'img/creatures.gif',
        },
      },
      {
        year: 1956,
        keyDate: {
          title: 'The State Mosquito Control Commission (SMCC) is established',
          text:
            'A common misconception is that to completely eradicate mosquitos by paving over standing water will eliminate disease.  However, its later found that a healthy wetland provides a natural habitat for many unique animals including natural enemies of mosquitoes. These natural predators keep the mosquito population low and provide them food.',
        },
        style: {
          width: '450px',
        },
      },
      {
        year: 1948,
      },
      {
        year: 1942,
      },
      {
        year: 1959,
        film: {
          title: 'Alligator People',
          imgSrc: 'img/alligator.gif',
        },
      },
      {
        year: 1959,
        film: {
          title: 'Attack of the Giant Leeches',
          imgSrc: 'img/AttackoftheGiantLeeches.png',
        },
      },
      {
        year: 1964,
        keyDate: {
          title:
            'The Great Swamp National Wildlife Refuge and Wilderness Area is established.',
          text: `The first designation in the United State Refuge system.`,
        },
        style: {
          left: '2950px',
        },
      },
      {
        date: 1966,
        film: {
          title: 'Curse of the Swamp Creature',
          imgSrc: 'img/CurseoftheSwampCreature.png',
        },
      },
      {
        year: 1968,
        keyDate: {
          title:
            'The Great Swamp National Wildlife Refuge Wilderness becomes the first Fish and Wildlife Service wilderness to be added to the National Wildlife Preservation System.',
          text: `National Wilderness Areas are the most protected status any land in the U.S. can have.`,
        },
        style: {
          left: '3375px',
        },
      },
      {
        year: 1969,
        iframeSrc:
          'https://open.spotify.com/embed/track/5bUlFE9dGh7pX93PUEVAue?si=zZCnZXYfR86sJUYOLKygEw',
      },
      {
        year: 1970,
        keyDate: {
          title: 'The Federal Clean Air Act passes (CAA)',
          text: `The CAA results in a major shift in the federal government's role in air pollution control. This legislation authorized the development of comprehensive federal and state regulations to limit emissions from both stationary (industrial) sources and mobile sources.`,
        },
        style: {
          left: '3875px',
        },
      },
      {
        year: 1972,
        keyDate: {
          title: 'The Federal Clean Water Act passes (CWA)',
          text: `is the primary federal law in the United States governing water pollution. Its objective is to restore and maintain the chemical, physical, and biological integrity of the nation's waters; including funding for publicly owned treatment for the improvement of wastewater; and maintaining the integrity of wetlands. The Clean Water Act was one of the United States' first and most influential modern environmental laws.`,
        },
        style: {
          left: '4300px',
        },
      },
      {
        year: 1972,
        film: {
          title: 'Frogs',
          imgSrc: 'img/frog.gif',
        },
      },
      {
        year: 1976,
        iframeSrc:
          'https://open.spotify.com/embed/track/4c1QKtG7VHmhlOwJcA3Zcy?si=xmWB_pBsQ6KsIWTWVUEcYw',
      },
      {
        year: 1979,
      },

      {
        year: 2015,
        iframeSrc:
          'https://open.spotify.com/embed/track/0K1Npq5lQIp80BTMIQ2mVd?si=uuTd0gw5TcyWqK0aBrrjKQ',
      },
      {
        year: 2016,
        iframeSrc:
          'https://open.spotify.com/embed/track/6zwdorhTZt1ZF3jyMzGtP1?si=NoVQ_TcNQZO9f-mBz68aWg',
      },
      {
        year: 2019,
        film: {
          title: 'Swamp People',
          imgSrc: 'img/swamppeople.gif',
        },
      },
      {
        year: 2020,
      },
      {
        year: 2020,
      },
      {
        year: 2021,
      },
      {
        year: 2022,
      },
      {
        year: 2023,
      },
      {
        year: 2024,
      },
    ],
    xScale__Culture: null,
  }),
  mounted() {
    const scrollConverter = createScrollConverter(window, document)
    scrollConverter.activate()
    this.generateXScale__Culture()
  },
  computed: {
    keyDates: function() {
      return _.filter(this.cultureData, d => !!d.keyDate)
    },
  },
  methods: {
    generateXScale__Culture() {
      const xScale = scaleLinear()
        .domain([1938, 2024])
        .range([0, 10350])

      this.xScale__Culture = xScale
    },
  },
}

/*
scrollConverter 1.0.4
https://github.com/koggdal/scroll-converter
``
Copyright 2011–2020 Johannes Koggdal (http://koggdal.com/)
Developed for BombayWorks (http://bombayworks.com/)

Released under MIT license
*/

function createScrollConverter(e, t, n) {
  var o,
    r,
    a = t.documentElement,
    l = !1,
    i = !1,
    s = !1,
    c = function() {
      var t = !1
      try {
        var n = Object.defineProperty({}, 'passive', {
          get: function() {
            t = !0
          },
        })
        e.addEventListener('test', null, n),
          e.removeEventListener('test', null, n)
      } catch (e) {}
      return t
    },
    v = function(n) {
      var o,
        r = 'scroll' + (n = n.toUpperCase()),
        a = 'scroll' + ('X' === n ? 'Left' : 'Top')
      return (
        e['page' + n + 'Offset'] ||
        e[r] ||
        ('number' == typeof (o = t.documentElement || t.body.parentNode)[a]
          ? o
          : t.body)[a]
      )
    },
    d = function(n, i) {
      if (
        ((o = function(o) {
          if (
            ((o = o || e.event),
            !1 ===
              (function(n, o, r) {
                return (
                  !l ||
                  ((i = 0),
                  (v = (a ? a.offsetWidth : 0) || 0),
                  (d = t.body.scrollWidth || 0),
                  (u = a ? a.clientWidth : 0),
                  (f = Math.max(v, d) - u),
                  Math.abs(o.wheelDeltaX) >= Math.abs(o.wheelDeltaY) ||
                    Math.abs(o.deltaX) >= Math.abs(o.deltaY) ||
                    ('deltaY' in o
                      ? (i = -10 * o.deltaY)
                      : o.detail
                      ? (i = -240 * o.detail)
                      : o.wheelDelta && (i = 5 * o.wheelDelta),
                    (s = (i / 120) * 10),
                    (c = n.x - s) >= 0 && c <= f
                      ? ((n.x = c), (n.setByScript = !0), e.scrollTo(n.x, n.y))
                      : 0 !== n.x &&
                        n.x !== f &&
                        ((n.x = c > f ? f : 0),
                        (n.setByScript = !0),
                        e.scrollTo(n.x, n.y)),
                    'function' == typeof r && r(n),
                    !1))
                )
                var i, s, c, v, d, u, f
              })(n, o, i))
          ) {
            if (!o.preventDefault || !o.stopPropagation) return !1
            o.preventDefault(), o.stopPropagation()
          }
        }),
        (r = function() {
          n.setByScript || ((n.x = v('x')), (n.y = v('y'))),
            (n.setByScript = !1)
        }),
        e.addEventListener)
      ) {
        var s = !!c() && { capture: !1, passive: !1 }
        'onwheel' in e
          ? e.addEventListener('wheel', o, s)
          : 'onmousewheel' in e
          ? e.addEventListener('mousewheel', o, s)
          : e.addEventListener('DOMMouseScroll', o, s),
          e.addEventListener('scroll', r, s)
      } else t.attachEvent('onmousewheel', o), e.attachEvent('onscroll', r)
    },
    u = function(e) {
      return e.preventDefault(), e.stopPropagation(), !1
    }
  return {
    activate: function(t) {
      if (((l = !0), !s)) {
        d({ x: 0, y: 0 }, t), (s = !0)
      }
      if (i) {
        if (e.addEventListener) {
          var n = !c() || { capture: !0, passive: !1 }
          e.removeEventListener('scroll', u, n)
        } else e.detachEvent('onscroll', u)
        i = !1
      }
    },
    deactivate: function() {
      ;(l = !1),
        s &&
          (!(function() {
            if (o || r)
              if (e.removeEventListener) {
                var n = !!c() && { capture: !1, passive: !1 }
                'onwheel' in e
                  ? e.removeEventListener('wheel', o, n)
                  : 'onmousewheel' in e
                  ? e.removeEventListener('mousewheel', o, n)
                  : e.removeEventListener('DOMMouseScroll', o, n),
                  e.removeEventListener('scroll', r, n)
              } else
                t.detachEvent('onmousewheel', o), e.detachEvent('onscroll', r)
          })(),
          (s = !1))
    },
    deactivateAllScrolling: function() {
      if (((l = !1), (i = !0), e.addEventListener)) {
        var t = !c() || { capture: !0, passive: !1 }
        e.addEventListener('scroll', u, t)
      } else e.attachEvent('onscroll', u)
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,600,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
:root {
  --grey-text: #636162;
  --green-text: #638436;
  --timeline-green: #aebf94;
  --dark-green-text: #3e3d1c;
  --blue-text: #416f8d;
  --jetport-purple: #74438c;
  --jetport-purple-outline: #8f73a4;
  --music-yellow: #d08e14;
  --music-yellow-outline: #d6b167;
  --film-brown: #754c24;
  --film-brown-outline: #927a5e;
  --key-date-pink: #ec008c;
  --key-date-pink-outline: #e26eb7;
  --hydrology-blue: #6da5c6;
  --hydrologt-blue-outline: #a1bed5;
  --wildlife-green: #6f922a;
  --wildlife-green-outline: #98ac68;
  --generic-grey: #808080;
  font-family: 'Open Sans', sans-serif;
}

#container {
  margin: 0 auto;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 16218px;
  -webkit-font-smoothing: antialiased;
}

#container h3 {
  text-align: left;
  text-transform: uppercase;
  font-size: 27pt;
  font-weight: 600;
}

#container h5 {
  font-size: 18pt;
  margin-top: 0;
  margin-bottom: 0;
}

#container p {
  font-size: 14pt;
  line-height: 25pt;
}

#container .time-marker span {
  font-family: 'Playfair Display', serif;
  font-size: 18pt;
  color: var(--generic-grey);
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
