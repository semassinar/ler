<template>
  <div id="app">
    <img id="logo" src="./assets/logo.png">

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  text-align: center;
  display: inline-block;
}
#logo{

  margin-top: 5%;
  max-width: 340px;
}
body {
  text-align: center;
  size: auto;
  min-width: 860px;
}
nav {
  align-self: auto;
  background-color: #eeae4ab0;
  display: inline;
}
</style>
