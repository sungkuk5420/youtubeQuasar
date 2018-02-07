<template>
  <q-infinite-scroll :handler="refresher" ref="infiniteScroll">
    <q-item
      v-for="item in youTubeResults" :key="item.id">
      <q-item-main class="flex items-center column ">
        <div class="row item-card-custom" v-on:click="videoPlay(item.id, item.imgWidth, item.imgHeight)">
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
  </q-infinite-scroll>
</template>

<script>
import { M } from '../store/types'
import { mapGetters } from 'vuex'
import { QList, QItem, QItemMain, QItemTile, QInfiniteScroll, QChip, QSpinnerDots } from 'quasar'
export default {
  components: { QList, QItem, QItemMain, QItemTile, QInfiniteScroll, QChip, QSpinnerDots },
  props: ['inline'],
  computed: {
    ...mapGetters({
      searchResults: 'getSearchResults',
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
    videoPlay (videoId, imgWidth, imgHeight) {
      this.$router.push({ path: '/playerPage/' + videoId + '&' + imgWidth + '&' + imgHeight })
      // location.href = 'https://www.youtube.com/watch?v=' + videoId
    }
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
}
</style>
