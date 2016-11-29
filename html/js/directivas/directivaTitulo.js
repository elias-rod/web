angular
  .module('rspLab2016')
  .directive('utnTitulo', function() {
    return {
      scope:{
        titulo: '@titulo'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/titulo.html"
    };
  })
  ;//cierra modulo