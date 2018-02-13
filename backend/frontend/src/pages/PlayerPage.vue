<template>
  <div class="playerPageDiv">
    <q-toolbar>
      <q-btn flat  @click="goSearch" >
        <q-icon push name="ion-arrow-left-c" ></q-icon>
      </q-btn>
    </q-toolbar>
    <div class="ytplayerDiv">
      <iframe id="ytplayer" type="text/html"
        v-bind:src="getPlayerUrl()"
        frameborder="0" :style="{ width: `${this.playerSettings.iframeWidth}`, height: `${this.playerSettings.iframeHeight}`} " :class="`${this.playerSettings.respomsiveMode}`" />
    </div>
  </div>
</template>


<script>
import { M } from '../store/types'
import { QBtn, QToolbar, QIcon } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  components: {
    QBtn,
    QToolbar,
    QIcon
  },
  computed: {
    ...mapGetters({
      playerSettings: 'getPlayerSettings'
    })
  },
  data () {
    return {}
  },
  methods: {
    goSearch () {
      this.$router.push({path: '/'})
    },
    getPlayerUrl () {
      return `http://www.youtube.com/embed/${this.playerSettings.videoId || ''}?autoplay=1`
    },
    handleResize (event) {
      console.log('resize!!')
      let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      let videoWidth = `${this.playerSettings.videoWidth}`
      let videoHeight = `${this.playerSettings.videoHeight}`
      let windowHeightWithoutToolbarHiehgt = parseInt((windowHeight - 50))
      let windowRatio = windowWidth / windowHeightWithoutToolbarHiehgt
      let videoRatio = videoWidth / videoHeight
      let respomsiveMode = ''
      let iframeWidth = ''
      let iframeHeight = ''

      if (windowRatio < videoRatio) {
        let videoRatio = videoHeight / videoWidth

        iframeWidth = windowWidth + 'px'
        iframeHeight = (parseInt(videoHeight) + ((parseInt(windowWidth) - parseInt(videoWidth)) * parseFloat(videoRatio))) + 'px'
        respomsiveMode = 'widthMode'
      }
      else {
        let videoRatio = videoWidth / videoHeight

        iframeHeight = windowHeightWithoutToolbarHiehgt + 'px'
        iframeWidth = (parseInt(videoWidth) + ((windowHeightWithoutToolbarHiehgt - parseInt(videoHeight)) * parseFloat(videoRatio))) + 'px'
        respomsiveMode = 'heightMode'
      }

      console.log(iframeWidth)
      const settings = {
        iframeWidth: iframeWidth,
        iframeHeight: iframeHeight,
        respomsiveMode: respomsiveMode
      }
      this.$store.dispatch(M.CHANGE_PLAYER_SIZE, settings)
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}
</script>

<style lang="scss" scoped>

  .ytp-cued-thumbnail-overlay-image{
    background-size: contain !important;
  }


  .playerPageDiv{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: black;
    padding-top: 50px;
  }

  #ytplayer{
    // width: 100%;
    position: absolute;
    // top: 50%;
    // transform: translate(0,-50%);
    &.heightMode{
      width: auto;
      height: 100%;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 0;
      top: 0;
    }
    &.widthMode{
      bottom: 0;
      margin: auto;
      top: 0px;
    }
  }
  .q-toolbar{
    padding: 0px 20px;
    background-color: red;
    z-index: 100;
    position: absolute;
    top: 0;
    .q-btn{
      .q-icon{
        margin-right: 0;
      }
    }
  }
  .ytplayerDiv{
    position: relative;
    height: 100%;
  }
</style>
