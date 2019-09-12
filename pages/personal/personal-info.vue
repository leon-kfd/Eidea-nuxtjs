<template>
  <div id="PersonalInfo">
    <ul class="title-nav">
      <li :class="statusActive==0?'active':''"
          @click="statusActive=0">基本信息</li>
      <li :class="statusActive==1?'active':''"
          @click="statusActive=1">地址管理</li>
    </ul>
    <div class="section-body">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      statusActive: 0
    }
  }
}
</script>
<style lang='scss' scoped>
ul.title-nav {
  border-bottom: 2px solid #111;
  li {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &.active {
      border: 2px solid #111;
      border-bottom: none;
      font-weight: bold;
    }
  }
}
</style>
