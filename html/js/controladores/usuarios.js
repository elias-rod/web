angular
.module('rspLab2016')
.controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
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
						$state.go("menu");
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

.controller("UsuariosCtrl", function($scope, $state, $auth, $timeout, jwtHelper, FactoryUsuario,uiGridConstants) {
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

		/*----*/

   			$scope.Listado = {

   			    enableGridMenu: true,
   			    enableSelectAll: true,
   			    exporterCsvFilename: 'Usuarios.csv',
   			    exporterPdfDefaultStyle: { fontSize: 9 },
   			    exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
   			    exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
   			    exporterPdfHeader: { text: "SUBA", style: 'headerStyle' },
   			    exporterPdfFooter: function (currentPage, pageCount) {
   			        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
   			    },
   			    exporterPdfCustomFormatter: function (docDefinition) {
   			        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
   			        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
   			        return docDefinition;
   			    },
   			    exporterPdfOrientation: 'portrait',
   			    exporterPdfPageSize: 'LETTER',
   			    exporterPdfMaxGridWidth: 400,
   			    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
   			    enableFiltering: false,
   			    enablePaginationControls: false,
   			  
   			    onRegisterApi: function (gridApi) {
   			        $scope.gridApi = gridApi;
   			        var cellTemplate = 'ui-grid/selectionRowHeader';
   			    },
   			    columnDefs: [
   			        {
   			            field: 'id', name: 'ID', type:'number',width: '7%', enableColumnResizing: true,cellClass: 'columnaUI',
   			            filters: [
   			                {
   			                    condition: uiGridConstants.filter.EXACT,
   			                    placeholder: 'igual'
   			                }
   			            ], headerCellClass: $scope.highlightFilteredHeader
   			        },
   			        {
   			            field: 'correo', cellTooltip: function (row, col) {
   			                return 'correo: ' + row.entity.correo;
   			            }, name: 'Correo'
   			            , filter: {
   			                condition: uiGridConstants.filter.CONTAINS,
   			                placeholder: 'contiene'
   			            }
   			        },
   			        {
            		    field: 'activo', name: 'Vigente', width: '7%',
            		    cellClass: 'columnaUI',
            		    cellFilter: 'mapGender',
            		    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
            		    filter: {
            		        term: '',
            		        options: [{ id: '', value: 'TODOS' },{ id: 1, value: 'SI' }, { id: 0, value: 'NO' }]     // custom attribute that goes with custom directive above 
            		    },
            		},
   			        {
   			            field: 'nombre', cellTooltip: function (row, col) {
   			                return 'nombre: ' + row.entity.nombre;
   			            }, name: 'Nombre'
   			            , filter: {
   			                condition: uiGridConstants.filter.CONTAINS,
   			                placeholder: 'contiene'
   			            }																																																																																																						
   			        },
   			        {
   			            field: 'perfil', cellTooltip: function (row, col) {
   			                return 'perfil: ' + row.entity.perfil;
   			            }, name: 'Perfil'
   			            , filter: {
   			                condition: uiGridConstants.filter.CONTAINS,
   			                placeholder: 'contiene'
   			            }																																																																																																						
   			        },    			        																																																																										//ng-click="Borrar({{producto}})" ng-if="borrarProducto"																																	
   			        { field: '',  cellClass: 'columnaUI',enableFiltering: false, name: 'Acciones', width: '15%', cellTemplate: '<a href="" ng-click="grid.appScope.goToModi(row.entity.codigo);">  <span class="glyphicon glyphicon-edit" data-toggle="tooltip" title="Modificar" aria-hidden="true"></span>   </a> &nbsp;&nbsp;<a href=""  ng-click="grid.appScope.Borrar(row.entity.id)"> <span class="glyphicon glyphicon-trash" data-toggle="tooltip" title="Eliminar" aria-hidden="true"></span></a>' }
   			    ]
   			};

   				$scope.Listado.selectAll = true;
   				$scope.Listado.paginationPageSizes = [5, 10, 20];
   				// Configuracion de la paginacion
   				$scope.Listado.paginationPageSize = 10;
   				$scope.toggleFiltering = function () {
   				    $scope.Listado.enableFiltering = !$scope.Listado.enableFiltering;
   				    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
   				};
				/*----*/

	 	FactoryUsuario.BuscarTodos().then(
	 		function(respuesta) {     	
	  			$scope.Listado.data = respuesta;
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
 			FactoryUsuario.Borrar(usuario);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario Eliminado";

	 		$timeout(function(){
	 			$state.reload;
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

