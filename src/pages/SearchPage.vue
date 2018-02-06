<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="">
    <!-- your content -->
    <search-box></search-box>
    <result-list></result-list>
  </div>
</template>

<script>

import SearchBox from '../components/SearchBox.vue'
import ResultList from '../components/ResultList.vue'

export default {
  components: {
    SearchBox,
    ResultList
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
