angular
  .module('rspLab2016')
  .directive('utnListaUsuarios', function() {

    return {
      scope:{
        usuario: '=usuario'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/listaUsuarios.html"
    };

  })
  ;//cierra modulo