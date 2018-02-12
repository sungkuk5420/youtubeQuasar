<template>
  <q-layout style="padding-top: 60px;">
    <q-infinite-scroll :handler="refresher" ref="infiniteScroll">
      <q-item
        v-for="item in youTubeResults" :key="item.id">
        <q-item-main class="flex items-center column ">
          <div class="row item-card-custom" v-on:click="openPlayer(item.id, item.videoWidth, item.videoHeight)">
            <div class="col-5"><img :src="item.thumb || ''" class="full-width"></div>
            <div class="col-7" style="word-wrap: break-word;">
              <q-item-tile label><p class="ellipsis">{{ item.title }}</p></q-item-tile>
              <q-item-tile sublabel><p class="ellipsis">{{ item.body }}</p></q-item-tile>
            </div>
          </div>
        </q-item-main>
      </q-item>
      <div slot="message" class="row justify-center" style="margin-bottom: 50px;">
        <q-spinner-dots :size="40" />
      </div>
      <q-fixed-position corner="bottom-right" :offset="[18, 18]">
        <q-btn
          color="red"
          round
          v-back-to-top.animate="{offset: 500, duration: 1000}"
          class="animate-pop"
        >
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-fixed-position>
    </q-infinite-scroll>
  </q-layout>
</template>

<script>
import { M } from '../store/types'
import { mapGetters } from 'vuex'
import { QList, QItem, QItemMain, QItemTile, QInfiniteScroll, QChip, QSpinnerDots, QBtn, QLayout, QIcon, BackToTop, QFixedPosition, Ripple } from 'quasar'
export default {
  components: { QList, QItem, QItemMain, QItemTile, QInfiniteScroll, QChip, QSpinnerDots, QBtn, QLayout, QIcon, BackToTop, QFixedPosition, Ripple },
  props: ['inline'],
  computed: {
    ...mapGetters({
      youTubeResults: 'getYouTubeResults'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    refresher (index, done) {
      console.log(index)
      let thisObj = this
      setTimeout(() => {
        if (thisObj.$store.getters.getYouTubeResults.length !== 0) {
          thisObj.$store.dispatch(M.CHANGE_SEARCH_STR, thisObj.$store.getters.getSearchStr)
        }
        done()
      }, 2500)
    },
    openPlayer (videoId, videoWidth, videoHeight) {
      const settings = {
        videoId: videoId,
        videoWidth: videoWidth,
        videoHeight: videoHeight,
        respomsiveMode: 'widthMode',
        iframeWidth: '',
        iframeHeight: ''
      }
      this.$store.dispatch(M.OPEN_PLAYER, settings)
    }
  },
  directives: {
    BackToTop,
    Ripple
  }
}
</script>

<style lang="scss" scoped>

.item-card-custom{
  /* height: 100px; */
  width: 100%;
  .col-7{
    padding:2px 5px;
    div{
      margin: 0;
      p{
        margin: 0;
        // font-size: 3vw !important;
        // height: 10vw;
        // max-height: 24px;
      }
    }
  }
  .col-5{

  }

  .q-icon.material-icons{
    margin: 0;
  }

}
</style>
