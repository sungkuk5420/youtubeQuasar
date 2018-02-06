<template>
  <iframe id="ytplayer" type="text/html" style=" width: 100%; height: 100%; height: 100%; position: fixed;"
    v-bind:src="'http://www.youtube.com/embed/'+ $route.params.id + '?autoplay=1&origin=http://example.com'"
    frameborder="0"/>
</template>


<script>
import { QBtn } from 'quasar'

export default {
  components: {
    QBtn
  },
  props: ['id'],
  data () {
    return {}
  },
  methods: {
    goSearch () {
      this.$router.push({path: '/search'})
    }
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>

<style>

.ytp-cued-thumbnail-overlay-image{
  background-size: contain !important;
}
</style>
