<template>
   <div class="tri" v-html="src"></div>
</template>
<script>
export default {
    computed: {
        src() {
            const src = require(`assets/round_tri_scroll.svg?raw`)
            return src
        }
    }
}
</script>
