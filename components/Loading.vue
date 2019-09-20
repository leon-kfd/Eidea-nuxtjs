<template>
  <div v-if="loading"
       class="loading"></div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>
<style lang='scss' scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 200%;
  height: 3px;
  background: linear-gradient(
    90deg,
    #21bf12,
    #4488ff,
    #c12bff,
    #fb7800,
    #21bf12,
    #4488ff,
    #c12bff,
    #fb7800
  );
  animation: movingColor 2s linear 0s infinite alternate;
}
</style>
<style>
@keyframes movingColor {
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
}
</style>
