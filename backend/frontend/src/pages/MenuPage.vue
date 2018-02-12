<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <Q-btn
      v-on:click="goSearch"
    >
    　検索画面へ
    </Q-btn>
  </div>
</template>


<script>
import { QBtn } from 'quasar'

export default {
  components: {
    QBtn
  },
  data () {
    return {}
  },
  methods: {
    goSearch () {
      this.$router.push({path: '/search'})
    }
  }

}
</script>

<style>
</style>
