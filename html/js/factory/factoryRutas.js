angular
  .module('rspLab2016')
  .factory('FactoryRutas', function () {
    var objeto = {};
    objeto.Nombre = "Factory Rutas";
    objeto.UrlWebService = "http://localhost:8080/pro/public_html/service/";
    objeto.UrlArchivos = "http://localhost:8080/Mirotta.SPLab42016/SPLab42016WebService/archivos";

    return objeto;
  })//Cierra Fatory Rutas
