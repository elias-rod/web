angular
.module('rspLab2016')
.controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
	console.log('LoginCtrl');
	$scope.usuario = {};
	$scope.usuario.nombre = "Administrador";
	$scope.usuario.correo = "admin@utn.com";
	$scope.usuario.clave = "123456";
	$scope.resultado = {};
	$scope.resultado.ver = false;
	$scope.Verificar = function(){
		try
		{
			$auth.login($scope.usuario)
				.then(function(response){
					if ($auth.isAuthenticated())
					{
						$state.go("inicio");
					}
					else
					{
						$scope.resultado.ver = true;
						$scope.resultado.estilo = "alert alert-danger";
						$scope.resultado.mensaje = "Los datos ingresados son incorrectos.";
					}
					
				}).catch(function(response){
					console.info("NO volvio bien", response);
				});
		}
		catch(error)
		{
			console.info(error);
		}
	}

	$scope.Acceso = function(nombre, correo, clave){
		$scope.usuario.correo = correo;
		$scope.usuario.clave = clave;
		$scope.usuario.nombre = nombre;
	}
})

.controller("RegistroCtrl", function($scope, $auth, $state, jwtHelper, FactoryUsuario, FactoryRutas) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.usuario={};
	    $scope.usuario.nombre = "Comprador";
	    $scope.usuario.correo = "comprador@gmail.com";
	    $scope.usuario.clave = "123456";
	    $scope.usuario.claveRepetida = "123456";
	    $scope.usuario.perfil = "comprador";

		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.logeado = true;
			$scope.admin = true;
		}

	}
	catch(error)
	{
		console.info(error);
	}
	$scope.Guardar = function(){
		try
		{
			FactoryUsuario.Guardar($scope.usuario).then(
				function(respuesta) { 
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Usuario Guardado";
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el usuario";
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
})

.controller("UsuarioModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.logeado = true;
			$scope.usuario = JSON.parse($stateParams.usuario);
		}
		else
		{
			$state.go("inicio");
		}
	}
	catch(error)
	{
		console.info(error);
	}

	$scope.Guardar = function(){
		try
		{
			FactoryUsuario.Editar($scope.usuario);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario editado";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 1000);
	 	}
		catch(error)
		{
			console.info(error);
		}
	};
})

.controller("UsuariosCtrl", function($scope, $state, $auth, $timeout, jwtHelper, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = true;
		$scope.buscarPerfil = "todos";
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		    $scope.editar = false;
		}
		else
		{
			$state.go("inicio");
		}

	 	FactoryUsuario.BuscarTodos().then(
	 		function(respuesta) {     	
	  			$scope.ListadoUsuarios = respuesta;
	    	},function(error) {
	 			$scope.ListadoUsuarios= [];
	 	});
	}
	catch(error)
	{
		console.info(error);
	}
 	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}

 	$scope.Borrar = function(usuario){
 		try
 		{
 			FactoryUsuario.Borrar(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario Eliminado";

	 		$timeout(function(){
	 			$state.go('inicio');
	 		}, 1000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al borrar un usuario";
	 	}
 	}

 	$scope.Buscar = function(){
 		try
 		{
 			if ($scope.buscarPerfil == "todos")
 			{
				$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarTodos().then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
 			}
 			else
 			{
	 			$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarPor("usuariosPorPerfil", $scope.buscarPerfil).then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
	 		}
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al bucar por perfil";
	 	}
 	}
});

;//Cierre modulo

