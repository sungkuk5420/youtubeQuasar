<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <q-layout>
    <!-- your content -->
    <search-box class="fixed-top" data-role="header" data-position="fixed" data-tap-toggle="false" data-hide-during-focus="false" data-transition="none"></search-box>
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
  .z-fixed.fixed-top{
    z-index: 1;
  }
</style>
