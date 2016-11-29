var App = angular.module('rspLab2016', ['ui.router', 'oc.lazyLoad', 'angularFileUpload','satellizer', 'angular-jwt','ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);



App.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost:8080/pro/public_html/service/jwt/php/auth.php';
	$authProvider.tokenName = 'MiTokenGeneradoEnPHP';
	$authProvider.tokenPrefix = 'Aplicacion';
	//$authProvider.authReader = 'data';


	$stateProvider
		.state(
			"inicio",
			{
				url:"/inicio",
				cache:false,
				templateUrl:"vistas/inicio.html",
				controller:"InicioCtrl"
			}
		)

		.state(
			"utn",
			{
				url:"/utn",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/inicio.html"
			}
		)

		.state(
			"utn.login",
			{
				url:"/login",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuarios/login.html",
					controller:"LoginCtrl",
					  resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'lzldctrllogin',
                                files: [
                                    'js/controladores/login.js',
                                ]
                            })
                        }
                    }
					}
				}
			}
		)

		.state(
			"utn.registro",
			{
				url:"/registro",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuarios/registro.html",
					controller:"RegistroCtrl",
					  resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'lzldctrlUsuarios',
                                files: [
                                    'js/controladores/usuarios.js',
                                ]
                            })
                        }
                    }
					}
				}
			}
		)

		.state(
			"utn.usuario",
			{
				url:"/usuario/:usuario",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/modificarUsuario.html",
					controller:"UsuarioModificarCtrl"
					}
				}
			}
		)

		.state(
			"utn.usuarios",
			{
				url:"/usuarios",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuarios/usuarios.html",
					controller:"UsuariosCtrl",
					  resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'lzldctrlUsuarios',
                                files: [
                                    'js/controladores/usuarios.js',
                                ]
                            })
                        }
                    }
					}
				}  
			}
		)

		.state(
			"utn.usuariosDirectiva",
			{
				url:"/usuarios",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/usuariosConDirectiva.html",
					controller:"UsuariosCtrl"
					}
				}
			}
		) 
		.state(
			"utn.productos",
			{
				url:"/productos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/productos/productos.html",
					controller:"ProductosCtrl",
					  resolve: {
                        loadMyFiles: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'lzldctrllogin',
                                files: [
                                    'js/controladores/productos.js',
                                ]
                            })
                        }
                    }
					}
				} 
			}
		)		
		.state(
			"utn.altaProducto",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/productos/alta.html",
					controller:"ProductoAltaCtrl"
					}
				}
			}
		)

		.state(
			"utn.productosDirectiva",
			{
				url:"/productos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/productos/productosConDirectiva.html",
					controller:"ProductosCtrl"
					}
				}
			}
		) 
	$urlRouterProvider.otherwise("/inicio");
});

App.filter('mapGender', function () {
    var genderHash = {
        0: 'NO',
        1: 'SI'

    };
    return function (input) {
        if (!input) {
            return 'NO';
        } else {
            return genderHash[input];
        }
    };
});


App.run(function ($rootScope) {    
    $rootScope.estado = '';
    $rootScope.typeOf = function (value) {
        return typeof value;
    };
});




