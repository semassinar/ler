function foo() {
    var request = require("request");
    const uri1 = "https://g1.globo.com/mundo/noticia/2019/03/16/sobe-para-50-numero-de-mortos-em-ataques-a-mesquitas-na-nova-zelandia.ghtml";
    const uri2 = "https://www.youtube.com/watch?v=pFxUEt49rRc";
    const uri3 = "https://twitter.com/felipeneto";
    const uri4 = "https://brasil.estadao.com.br/noticias/geral,moradores-de-rio-preto-na-zona-da-mata-sao-retirados-de-area-proxima-a-hidreletrica,70002757798";
    const uri5 = "https://www.folhavitoria.com.br/geral/noticia/03/2019/alerta-de-tempestade-de-raios-e-vendaval-para-35-cidades-do-es";
    const uri6 = "https://emais.estadao.com.br/blogs/ser-mae/a-senhora-se-sente-culpada-de-alguma-forma/";
    console.log(uri6);
    const proxyurl = "https://thingproxy.freeboard.io/fetch/";

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var x = new XMLHttpRequest();
    x.open("GET", uri6);
    // I put "XMLHttpRequest" here, but you can use anything you want.
    x.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    x.onreadystatechange = function () {
        if (x.readyState == 4) {
        }
    };
    x.onload = function () {
        try {

            var extractor = require("unfluff");
            var data = extractor(x.responseText);
            console.log(data)
        } catch (error) {
            console.log("Error" + error);
        }
    };
    x.send();


}
function getArticleMetadata(html) {

    try {

        console.log(data)
    } catch (error) {
        console.log(error)
    }

}
function getArticleHTML(url) {

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = require("request");
    var x = new XMLHttpRequest();
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    x.open("GET", proxyurl + url);
    x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    x.onload = function () {
        try {
            var extractor = require("unfluff");
            var data = extractor(x.responseText);
           console.log(data)
        } catch (error) {
            console.log("Error" + error);

        }
    };
    x.send();


}

export { getArticleHTML, getArticleMetadata }