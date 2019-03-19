<template>
  <div>
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
              <div id="fullContent" class="col-lg-8 mx-auto">
                <h3>Fonte: {{metadata.publisher}}</h3>
                <h2 id="titleMetadata">{{metadata.title}}</h2>
                <img id="imageMetadata" v-bind:src="metadata.image">
                <br>
                <h3>{{metadata.description}}</h3>

                <h6 v-for="(index,tab) in text" :key="tab">{{ index }}</h6>

                <br>
                <br>
                <h5
                  v-if="metadata.author != null"
                >Autor: {{ metadata.author[0]}} - {{metadata.date}}</h5>
                <h5 v-if="metadata.copyright != null">Copyright: {{ metadata.copyright}}</h5>
                <h5>
                  <a target="_blank" v-bind:href="page">{{page}}</a>
                </h5>

                <div class="fb-share-button" data-layout="button_count" data-size="large">
                  <a
                    target="_blank"
                    href="https://www.facebook.com/sharer/sharer.php?u&amp;src=sdkpreparse"
                    class="fb-xfbml-parse-ignore"
                  >Compartilhar</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div id="searchDiv" v-show="!pageContent">
      <b-alert :show="invalid_url" variant="danger">Invalid url!</b-alert>
      <b-form-input
        :state="erro_message"
        v-model="page"
        placeholder="Cole o link de um artigo ou notícia aqui!!"
      />
      <br>
      <b-button id="buttonSearch" @click="getContent" variant="primary" size="md">Ler!</b-button>
    </div>
  </div>
</template>
<style scoped>
#contentMetadata {
  text-align: center;
  display: inline-block;
}
#titleMetadata {
  line-height: 2.25rem;
  letter-spacing: -0.09375rem;
}
#imageMetadata {
  margin: 13px;
  margin-bottom: 23px;
  max-width: 73%;
}
#searchDiv {
  margin: 120px;
}
#buttonSearch {
  width: 120px;
}
#fullContent {
  min-width: 90%;
}
h6,
.h6 {
  font-size: 2ch;
}
</style>
<script>
import Router from "@/router/index.js";
import Loading from "vue-loading-overlay";
import unfluff from "unfluff";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Readit",

  data() {
    return {
      msg: "Welcome to the jungle baby! You gonna DIE!",
      page: "",
      fullUrl: "",
      invalid_url: false,
      erro_message: null,
      isLoading: false,
      fullPage: false,
      loader: "bars",
      color: "#eeae4a",
      bgColor: "#ffffff",
      height: 38,
      width: 38,
      pageContent: false,
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
          fetchWithget(this);
        } else {
          if (this.page != null) {
            showErro(this);
          }
          this.pageContent = false;
          this.isLoading = false;
        }
      } else {
        showErro(this);
        goToIndex(this);
      }
    } catch (error) {
      showErro(this);
    }
  },
  mounted() {
    this.erro_message = null;
  },
  methods: {
    getContent() {
      if (checkValidUrl(this.page)) {
        window.location.href = "/ler/?page=" + this.page;
      } else {
        showErro(this);
      }
    },
    search() {
      try {
        this.isLoading = true;
        if (this.page != "") {
          if (checkValidUrl(this.page)) {
            fetchWithget(this);
          } else {
            if (this.page != null) {
              showErro(this);
            }
            this.pageContent = false;
            this.isLoading = false;
          }
        } else {
          showErro(this);
          goToIndex(this);
        }
      } catch (error) {
        showErro(this);
      }
    }
  }
};

function showErro(app) {
  app.invalid_url = true;
  app.isLoading = false;
  app.page = "";
  app.erro_message = false;
  setTimeout(() => {
    app.invalid_url = false;
    app.erro_message = null;
  }, 2500);
}
function checkValidUrl(url) {
  var validUrl = require("valid-url");
  return validUrl.isUri(url);
}
function fetchWithget(app) {
  try {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", proxyurl + app.page, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var extractor = require("unfluff");
        var data = extractor(xhr.responseText);
        if (data.text != "") {
          app.metadata = data;
          app.text = data.text.split("\n");
          app.isLoading = false;
          app.pageContent = true;
          app.fullUrl =
            "https://www.facebook.com/sharer/sharer.php?u=" +
            window.location.href +
            "%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse";
        } else {
          showErro(app);
          app.isLoading = false;
          app.pageContent = false;
        }
      }
    };
    xhr.send();
  } catch (error) {
    goToIndex(this);
    app.isLoading = false;
  }
}
function getQueryPage(app) {
  try {
    return app.$route.query.page;
  } catch (error) {
    return null;
  }
}
function goToIndex(app) {
  app.isLoading = false;
  window.location.href = "/ler/";
}
</script>

