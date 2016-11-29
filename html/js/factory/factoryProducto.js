angular
  .module('rspLab2016')
  .factory('FactoryProducto', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Producto";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;
    objeto.Borrar = Borrar;

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      return Servicio.BuscarTodos('productos');
    }

    function Cargar(parametro){
      return Servicio.Cargar('producto', parametro);
    }

    function Borrar(parametro){
      return Servicio.Borrar('producto', parametro);
    }    

    function Guardar(parametro){
      return Servicio.Guardar('producto', JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Producto
