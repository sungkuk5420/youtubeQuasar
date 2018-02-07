<template>
  <div class="playerPageDiv">
    <q-toolbar>
      <q-btn flat  @click="goSearch" >
        <q-icon push name="ion-arrow-left-c" ></q-icon>
      </q-btn>
    </q-toolbar>
    <div class="ytplayerDiv">
      <iframe id="ytplayer" type="text/html"
        v-bind:src="'http://www.youtube.com/embed/'+ $route.params.params.split('&')[0] + '?autoplay=1&origin=http://example.com'"
        frameborder="0"/>
    </div>
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
  props: ['id', 'imgWidth', 'imgHeight'],
  data () {
    return {}
  },
  methods: {
    goSearch () {
      this.$router.push({path: '/'})
    },
    handleResize (event) {
      console.log('resize!!')
      let playerDom = document.getElementById('ytplayer')
      let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      let imgWidth = this.$route.params.params.split('&')[1]
      let imgHeight = this.$route.params.params.split('&')[2]
      let windowRatio = windowWidth / windowHeight
      let imgRatio = imgWidth / imgHeight
      if (windowRatio < imgRatio) {
        let imgRatio = imgHeight / imgWidth

        playerDom.style.width = windowWidth + 'px'
        playerDom.style.height = (parseInt(imgHeight) + ((parseInt(windowWidth) - parseInt(imgWidth)) * parseFloat(imgRatio)) ) + 'px'
        playerDom.classList.remove('heightMode')
        playerDom.classList.add('widthMode')
      }
      else{
        let imgRatio = imgWidth / imgHeight

        playerDom.style.height = (windowHeight-50) + 'px'
        playerDom.style.width = (parseInt(imgWidth) + ((parseInt((windowHeight-50)) - parseInt(imgHeight)) * parseFloat(imgRatio)) ) + 'px'
        playerDom.classList.remove('widthMode')
        playerDom.classList.add('heightMode')
      }
    }
  },
  mounted () {
    console.log('aaa params!!' + JSON.stringify(this.$route.params))
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
      top: -50px;
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
