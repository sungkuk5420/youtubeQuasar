<template>

      <q-toolbar>
        <q-search
          icon="ion-social-youtube"
          v-model="text"
          @change="search"
          class="searchDiv"
        />
        <q-btn flat  @click="" >
          <q-icon push name="more_vert" >
            <q-popover
              ref="popover2"
              :anchor="anchor"
              :self="self"
            >
              <q-list link style="min-width: 100px">
                <q-item @click="changeLocation('all'), $refs.popover2.close()">
                  <q-item-main label="All" />
                </q-item>
                <q-item @click="changeLocation('jp'), $refs.popover2.close()">
                  <q-item-main label="日本" />
                </q-item>
                <q-item @click="changeLocation('ko'), $refs.popover2.close()">
                  <q-item-main label="한국" />
                </q-item>
              </q-list>
            </q-popover>
          </q-icon>
        </q-btn>
      </q-toolbar>

</template>

<script>
import { M } from '../store/types'
import { QSearch, QIcon, QToolbar, QBtn, QPopover, QList, QItem, QItemMain } from 'quasar'
export default {
  components: {
    QSearch,
    QIcon,
    QToolbar,
    QBtn,
    QPopover,
    QList,
    QItem,
    QItemMain
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    search () {
      // console.log(this.text)
      this.$store.dispatch(M.CHANGE_SEARCH_STR, this.text)
    },
    changeLocation (locationStr) {
      this.$store.dispatch(M.CHANGE_LOCATION, locationStr)
    }
  },
  beforeCreate () {
    this.$store.dispatch(M.CHANGE_SEARCH_STR, 'mostPopularLoading')
  }
}
</script>
<style lang="scss">
  .q-toolbar{
    padding: 0px 10px;
    background-color: red;
    .q-btn{
      .q-icon{
        margin-right: 0;
      }
    }
  }
  .searchDiv.q-if:before, .searchDiv.q-if:after{
    background: none !important;
  }

  .searchDiv .q-input-target{
    color: white !important;
  }
  .ion-social-youtube,
  .material-icons{
    color: white !important;
    margin-right: 15px;
  }
</style>

<style lang="scss" scoped>

  .searchDiv{
    background-color: red;
    margin: 0;
    padding: 10px 0px 10px 10px;
    position: relative;


    ::placeholder {
      color: white;
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: white;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: white;
    }
  }
</style>
