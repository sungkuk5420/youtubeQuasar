<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <q-layout>
    <!-- your content -->
    <search-box class="fixed-top"></search-box>
    <result-list></result-list>
  </q-layout>
</template>

<script>

import SearchBox from '../components/SearchBox.vue'
import ResultList from '../components/ResultList.vue'
import { QLayout, QFixedPosition } from 'quasar'

export default {
  components: {
    SearchBox,
    ResultList,
    QLayout,
    QFixedPosition
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .fixed-top{
    z-index: 1;
    -webkit-backface-visibility: hidden;
  }
</style>
