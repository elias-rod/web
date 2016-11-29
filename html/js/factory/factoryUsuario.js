angular
  .module('rspLab2016')
  .factory('FactoryUsuario', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Usuario";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;
    objeto.Borrar = Borrar;
    objeto.Editar = Editar;    

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      return Servicio.BuscarTodos("usuarios");
    }

    function Cargar(parametro){
      return Servicio.Cargar("usuario", parametro);
    }

    function Editar(parametro){
      return Servicio.Editar('usuario', JSON.stringify(parametro));
    }    

    function Borrar(parametro){
      return Servicio.Borrar('usuario', parametro);
    } 

    function Guardar(parametro){
      return Servicio.Guardar("usuario", JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Usuario
