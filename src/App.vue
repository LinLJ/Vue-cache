<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">home</router-link>|
      <router-link to="/cookies">cookies</router-link>|
      <router-link to="/store">store</router-link>|
      <router-link to="/excel">excel</router-link>|
        <router-link to="/kuayu">kuayu</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  font-size 30px
</style>
