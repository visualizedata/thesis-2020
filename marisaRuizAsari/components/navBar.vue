<template>
    <div class="nav-back">
        <nuxt-link to="/"><p class="nav-text navSiteTitle">Weapons of Mass Injustice</p></nuxt-link>
        <p class="nav-text navStoryTitle">{{story}}</p>
        <div class="nav-nums">
            <nuxt-link to="/one">
                <svg class="nav-num" @mouseover="changeStory" @mouseout="rmStory" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 135 160" style="enable-background:new 0 0 119.09 142.1;"
                xml:space="preserve">
                <filter id="shadow" x="0" y="0" width="110%" height="110%">
                    <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
                <path class="nav-1-path nav-path" filter="url(#shadow)" d="M0,82.55c0,32.89,26.66,59.55,59.55,59.55c0.04,0,0.09,0,0.13,0c32.86-0.05,59.47-26.73,59.42-59.6V0H0v82.5
                    C0,82.52,0,82.54,0,82.55z M61.12,36.95h0.06l5.86,0.78v35.3l7.03,0.78v4.24H48.35v-4.23l7.55-0.71V47.17l-0.01,0
                    c-2.7,0.69-5.44,1.21-8.2,1.56l-0.72-5.15C52.12,42.45,56.95,40.18,61.12,36.95z"/>
                </svg>
            </nuxt-link>
            <nuxt-link to="/two">
                <svg class="nav-num" @mouseover="changeStory" @mouseout="rmStory" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 135 160" style="enable-background:new 0 0 119.09 142.1;"
                xml:space="preserve">
                <filter id="shadow" x="0" y="0" width="110%" height="110%">
                    <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
                <path class="nav-2-path nav-path" filter="url(#shadow)" d="M0,82.66c0.03,32.86,26.69,59.47,59.55,59.44c0.04,0,0.07,0,0.1,0c32.86-0.03,59.47-26.69,59.44-59.55V0H0
                    v82.55C0,82.59,0,82.62,0,82.66z M53.69,46.74c-3.46,0.07-6.76,1.46-9.23,3.88l-0.34,0.29l-2.67-3.98
                    c4.19-4.59,10.07-7.27,16.28-7.42c4.04-0.23,8.03,1.04,11.19,3.57c2.3,2.11,3.58,5.1,3.52,8.22c0,4.05-2.12,8.29-6.32,12.59
                    c-4.38,4.27-9.33,7.9-14.72,10.79l18.11-1.89l2.61-5.41l4.5,0.98l-1.95,12.18H42.55l-1.56-3.97c7.4-4.46,19.8-13.44,19.8-23.38
                    C60.79,49.27,58,46.74,53.69,46.74z"/>
                </svg>
            </nuxt-link>
            <nuxt-link to="/three">
                <svg class="nav-num" @mouseover="changeStory" @mouseout="rmStory" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 135 160" style="enable-background:new 0 0 119.09 140.72;"
                xml:space="preserve">
                <filter id="shadow" x="0" y="0" width="110%" height="110%">
                    <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
                <path class="nav-3-path nav-path" filter="url(#shadow)" d="M0,81.27c0.03,32.86,26.69,59.48,59.55,59.45c0.03,0,0.07,0,0.1,0c32.86-0.03,59.47-26.69,59.45-59.55V0H0
                    v81.18C0,81.21,0,81.24,0,81.27z M59.27,34.26c3.58-0.17,7.13,0.71,10.23,2.53c2.73,1.79,4.32,4.89,4.17,8.15
                    c0,8.24-8.88,12.26-12.7,13.61c0.69-0.06,1.38-0.1,2.05-0.1c3.37-0.13,6.68,0.87,9.4,2.86c2.43,1.92,3.81,4.88,3.72,7.98
                    c-0.04,4.65-2.33,9-6.15,11.65c-5.05,3.36-11.04,5.03-17.1,4.76c-2.97-0.02-5.92-0.42-8.79-1.17v-5.47
                    c2.04,0.64,4.18,0.95,6.32,0.91c3.61,0.16,7.17-0.91,10.09-3.05c2.28-1.8,3.6-4.54,3.59-7.44c0-5.33-3.07-8.2-9.12-8.53l-3.78,0.98
                    l-1.43-4.36c1.82-0.3,3.6-0.85,5.28-1.63c4.64-2.14,7.29-5.51,7.29-9.25c0.1-1.72-0.66-3.38-2.02-4.43
                    c-1.34-0.91-2.94-1.37-4.56-1.3c-3.37-0.02-6.63,1.14-9.25,3.26l-2.61-4.56C48.3,36.23,53.69,34.33,59.27,34.26z"/>
                </svg>
            </nuxt-link>
        </div>
        </div>
</template>

<script>

import nav1 from '~/components/nav-1.vue'
import nav2 from '~/components/nav-2.vue'
import nav3 from '~/components/nav-3.vue'

export default {
    components : {
        nav1,
        nav2,
        nav3
    },
    data() {
        return {
            story: ""
        }
    },
    methods: {
        changeStory(e) {
            console.log(e.target.classList[0])
            let className = e.target.classList[0];
            if (className == 'nav-1-path') {
                this.story = "An American Tragedy"
            } else if (className == 'nav-2-path') {
                this.story = "Humanizing urban gun violence reduction"
            } else if (className == 'nav-3-path') {
                this.story = "Advancing Peace in Sacramento, CA"
            }
        },
        rmStory() {
            this.story = ""
        }
    }
}
</script>

<style lang="css" scoped>
* {
    font-family: 'Merriweather', serif;
}
.nav-back {
    width: 100vw;
    height: 50px;
    position: fixed;
    background: rgb(223, 223, 223);
}
.nav-text {
    position: absolute;
    top: 3px;
}

.navSiteTitle {
    color: rgb(82, 82, 82);
    left: 2%;
}

.navStoryTitle {
    color: rgb(143, 143, 143);
    left: 420px;
}


.nav-nums {
    position: absolute;
    left: 270px;
    top: -2px;
}
.nav-num {
    width: 35px;
}
.nav-path {   
    fill: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.nav-1-path:hover {
    fill:rgb(245, 120, 106);
}
.nav-2-path:hover {
    fill:rgb(152, 196, 99);
}
.nav-3-path:hover {
    fill:rgb(243, 171, 94);
}

</style>