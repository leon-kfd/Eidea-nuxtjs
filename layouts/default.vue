<template>
  <div>
    <HomeHeader></HomeHeader>
    <div class="wraper">
      <nuxt />
    </div>
    <HomeFooter></HomeFooter>
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import HomeFooter from '@/components/HomeFooter'
export default {
  components: {
    HomeHeader,
    HomeFooter
  }
}
</script>

<style lang="scss">
@import "../assets/css/common.scss";
.wraper {
  min-height: calc(100vh - 100px);
}
</style>
