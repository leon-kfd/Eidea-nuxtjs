<template>
  <div class="footer">
    <div class="container">
      <p>
        &copy;2018 &nbsp;&nbsp;
        Created & Designed By <a href="http://kongfandong.cn/blog/about"
           target="_blank">Leon.D</a>
        <span class="footer-ps fr">PS: 本站仅作学习交流所用，不可作商业用途，所有图片来源于网上！</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.footer {
  background: #262626;
  height: 40px;
  min-width: 1080px;
  p {
    height: 40px;
    line-height: 40px;
    color: #f0f0f0;
    a {
      color: #ff9922;
    }
  }
  .footer-ps {
    color: #888;
  }
}
</style>
