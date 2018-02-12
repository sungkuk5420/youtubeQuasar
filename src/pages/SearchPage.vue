<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <q-layout>
    <!-- your content -->
    <q-fixed-position corner="top" :offset="[0, 0]">
      <search-box></search-box>
    </q-fixed-position>
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
