<template>
  <div>
    <Loading />
    <HomeHeader />
    <div class="wraper">
      <nuxt />
    </div>
    <Cart />
    <HomeFooter />
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader'
import HomeFooter from '@/components/HomeFooter'
import Cart from '@/components/Cart'
import Loading from '@/components/Loading'
export default {
  components: {
    HomeHeader,
    HomeFooter,
    Cart,
    Loading
  }
}
</script>

<style lang="scss">
@import "../assets/css/common.scss";
.wraper {
  min-height: calc(100vh - 100px);
}
</style>
