<template>
  <div class="home">
    <el-carousel height="980px" direction="vertical" :autoplay="false">
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
        'http://47.94.103.120/cat/1.jpg',
        'http://47.94.103.120/cat/2.jpg',
        'http://47.94.103.120/cat/3.jpg'
      ]
    }
  }
};
</script>

<style lang="stylus">
  .home
    margin-top 50px
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
