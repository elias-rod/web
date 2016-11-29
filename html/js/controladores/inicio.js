angular
  .module('rspLab2016')
  .controller('InicioCtrl', function($scope, $state, $auth,jwtHelper) {
  	console.log('InicioCtrl'); 

  	 	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		if ($scope.usuarioLogeado.perfil != "comprador")
		{
			$scope.nuevoProducto = true;
		}
		else
		{
			$scope.nuevoProducto = false;
		}

		if ($scope.usuarioLogeado.perfil == "admin")
			$scope.admin = true;
		else
			$scope.admin = false;
	}

	$scope.Salir = function(){
		$auth.logout();
		console.log('saliste');
		$state.reload();
	};

  });
