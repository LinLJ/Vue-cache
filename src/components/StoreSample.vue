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
    name: "StoreSample",
    data() {
      return {
        message: "store"
      }
    },
    methods: {
      sampleClick(){
        //测试store
        console.log(this.$store.getters.doneTodos) // -> 1
        console.log(this.$store.getters.doneTodosCount) // -> 1
        console.log(this.$store.getters.getTodoById(2)) // -> 1
      }
    }
  }
</script>


