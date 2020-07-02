<template>
  <div class="home">
    <el-carousel height="795px" direction="vertical" :autoplay="true">
      <el-carousel-item v-for="item in urlItem" :key="item">
        <el-image :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      urlItem:[
        'http://47.94.103.120/cat/chijing.gif',
        'http://47.94.103.120/cat/zuibang.gif',
        'http://47.94.103.120/cat/bao.gif',
        'http://47.94.103.120/cat/heng.gif',
        'http://47.94.103.120/cat/jizhi.gif',
        'http://47.94.103.120/cat/kaixin.gif',
        'http://47.94.103.120/cat/xiu.gif',
        'http://47.94.103.120/cat/zantong.gif',
        'http://47.94.103.120/cat/chigua.gif'
      ]
    }
  }
};
</script>

<style lang="stylus">
  .el-carousel__item {
    align-items:center;
    display: table-cell;

  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-image{
    margin-top:200px;
    align-items:center;
  }
</style>
