<template>
  <div class="home">
    <VuexSample />
  </div>
</template>

<script>
// @ is an alias to /src
import VuexSample from "@/components/VuexSample.vue";

export default {
  name: "Home",
  components: {
    VuexSample
  }
};
</script>
