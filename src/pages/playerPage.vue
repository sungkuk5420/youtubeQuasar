<template>
  <div class="">
    <q-toolbar>
      <q-btn flat  @click="goSearch" >
        <q-icon push name="ion-arrow-left-c" ></q-icon>
      </q-btn>
    </q-toolbar>
    <iframe id="ytplayer" type="text/html"
      v-bind:src="'http://www.youtube.com/embed/'+ $route.params.id + '?autoplay=1&origin=http://example.com'"
      frameborder="0"/>
  </div>
</template>


<script>
import { QBtn, QToolbar, QIcon } from 'quasar'

export default {
  components: {
    QBtn,
    QToolbar,
    QIcon
  },
  props: ['id'],
  data () {
    return {}
  },
  methods: {
    goSearch () {
      this.$router.push({path: '/'})
    }
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>

  .ytp-cued-thumbnail-overlay-image{
    background-size: contain !important;
  }

  #app{
    width: 100%;
    height: 100%;
    position: fixed;
  }

  #ytplayer{
    width: 100%;
    height: 100%;
    padding-top: 60%;
    padding-bottom: 60%;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    background-color: black;
  }
  .q-toolbar{
    padding: 0px 20px;
    background-color: red;
    z-index: 100;
    .q-btn{
      .q-icon{
        margin-right: 0;
      }
    }
  }
</style>
