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
    name: "VuexSample",
    data() {
      return {
        message: "123123"
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
        //console.info(this.$cookies.get("cookie-test"))
        //console.info(this.$cookies.keys())

        //测试store
        console.log(this.$store.getters.doneTodos) // -> 1
        console.log(this.$store.getters.doneTodosCount) // -> 1
        console.log(this.$store.getters.getTodoById(2)) // -> 1

      }

    }
  }
</script>


