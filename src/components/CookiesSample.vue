<template>
    <div>
        <h1>{{ message }}</h1>
        <el-button round type="info" @click="sampleClick">
            点击
        </el-button>
    </div>

</template>

<script>
  export default {
    name: "CookieSample",
    data() {
      return {
        message: "点击按钮根据keys获取value"
      }
    },
    created(){
      this.cookieMethod()
    },
    methods: {
      cookieMethod(){
        this.$cookies.set("cookie-test", "12")   //return this
      },
      sampleClick(){
        //测试cookie
        console.info(this.$cookies.get("cookie-test"))
        console.info(this.$cookies.keys())
      }

    }
  }
</script>


