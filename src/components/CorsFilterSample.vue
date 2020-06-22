<template>
    <div>
        <h1>{{ message }}</h1>
    </div>

</template>

<script>
  export default {
    name: "CorsFilterSample",
    data() {
      return {
        message: "跨域请求"
      }
    },
    created(){
      this.cookieMethod()
    },
    mounted () {
      this.$axios
        .get("http://127.0.0.1:8081/cors")
        .then(res=>{
          console.log(res)
          this.message=res.data;
        })
        .catch(err=>{
          console.log(err)
        })
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


