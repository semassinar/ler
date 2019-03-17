<template>
  <div class="main">
    <div>
      <loading
        id="loading"
        :active.sync="isLoading"
        :is-full-page="fullPage"
        :height="height"
        :width="width"
        :color="color"
        :loader="loader"
        :background-color="bgColor"
      ></loading>
      <div id="contentMetadata" v-show="pageContent">
        <section id="services" class="bg-light">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <h3>{{metadata.publisher}}</h3>
                <h2 id="titleMetadata">{{metadata.title}}</h2>
                <img id="imageMetadata" v-bind:src="metadata.image">
                <br>
                <p class="lead">{{metadata.description}}</p>

                <h6 v-for="(index,tab) in text" :key="tab">{{ index }}</h6>

                <br>
                <br>
                <h6
                  v-if="metadata.author != null"
                >Autor: {{ metadata.author[0]}} - {{metadata.date}}</h6>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div v-show="!pageContent">
      <b-input >
      <b-button @click="getContent" variant="primary" size="lg">Ler!</b-button>
    </div>
  </div>
</template>

<script>
import Router from "@/router/index.js";
import Loading from "vue-loading-overlay";
// Import stylesheet
import unfluff from "unfluff";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Readit",

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      page: "",
      erro_message: "",
      isLoading: false,
      fullPage: false,
      loader: "bars",
      color: "#eeae4a",
      bgColor: "#ffffff",
      height: 38,
      width: 38,
      pageContent: true,
      metadata: {},
      text: []
    };
  },
  components: {
    Loading
  },
  created() {
    try {
      this.isLoading = true;
      this.page = getQueryPage(this);
      if (this.page != "") {
        if (checkValidUrl(this.page)) {
          console.log("Valid URL :" + this.page);
          getPageContent(this);
        } else {
          this.pageContent = false;
          this.isLoading = false;
          console.log("Page content false");
        }
      } else {
        goToIndex(this);
      }
    } catch (error) {}
  },
  mounted() {},
  methods: {
    getContent() {
      getPageContent(this);
    }
  }
};
function checkValidUrl(url) {
  var validUrl = require("valid-url");
  return validUrl.isUri(url);
}
function pageNotFound(app) {
  erro_message = "Nenhuma página foi achada!";
}
function getPageContent(app) {
  var request = require("request");
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var x = new XMLHttpRequest();
  const proxyurl = "https://thingproxy.freeboard.io/fetch/";
  x.open("GET", proxyurl + app.page);
  x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  x.onreadystatechange = function() {
    if (x.readyState == 4) {
      var extractor = require("unfluff");
      var data = extractor(x.responseText);
      app.isLoading = false;
      app.metadata = data;
      app.text = data.text.split("\n");
      console.log(app.metadata);
      console.log(app.metadata.text);
    }
  };
  x.onload = function() {};
  x.send();
}
function getQueryPage(app) {
  try {
    return app.$route.query.page;
  } catch (error) {
    console.log(error);
    return null;
  }
}
function goToIndex(app) {
  app.isLoading = false;
  window.location.href = "/";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#contentMetadata {
  display: inline-block;
  font-family: opensans, helvetica, arial, sans-serif;
}
#titleMetadata {
  font-family: opensans, helvetica, arial, sans-serif;
  line-height: 2.25rem;
  letter-spacing: -0.09375rem;
}
#imageMetadata {
  margin: 13px;
  margin-bottom: 23px;
  max-width: 73%;
}
</style>
