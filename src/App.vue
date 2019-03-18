<template>
  <div id="app">
    <img id="logo" @click="gotoIndex" v-bind:src="logoSrc">

    <router-view id="readit"/>
    <v-footer id="footer" light>
      <v-card flat tile class="indigo lighten-1 white--text text-xs-center">
        <v-card-text>
          <br>
          <v-card-text
            class="white--text pt-0"
          >Leia artigos e notícias sem interrupções nem propagandas !</v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          <strong>
            Leia-me - 2019
            Created by GH
          </strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      logoSrc: "/ler/static/logo.png"
    };
  },
  methods: {
    gotoIndex() {
      window.location.href = "/ler/";
    }
  },
  mounted() {
    if (window.location.href.indexOf("github") > -1) {
      this.logoSrc = "/ler/static/logo.png";
    } else {
      this.logoSrc = "/static/logo.png";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  text-align: center;
  height: 100%;
  min-height: 100%;
}
#logo {
  margin-top: 5%;
  max-width: 340px;
}
body {
  text-align: center;
}
nav {
  align-self: auto;
  background-color: #eeae4ab0;
  display: inline;
}
#footer {
  display: inline-block;
  width: 100%;
}

#readit {
  min-height: 30%;
  margin: 12px;
}
body,
html {
  height: 100%;
  min-height: 100%;
  text-align: center;
  font-family: opensans, helvetica, arial, sans-serif;
}
</style>
