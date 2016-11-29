angular
  .module('rspLab2016')
  .controller("ProductosCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, $rootScope,FactoryProducto,uiGridConstants) {
  	 $scope.mensaje = {};

    if($rootScope.estado!=''){
        $scope.mensaje.estado = $rootScope.estado;
    }else{
        $scope.mensaje.estado= '';
    }
    $rootScope.estado='';

  	console.log('ProductosCtrl');
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{	//console.log('true');
				$scope.usuariologeado = jwtHelper.decodeToken($auth.getToken());
				$scope.logeado = true;
				console.log($scope.usuariologeado.perfil);
				if ($scope.usuariologeado.perfil == 'vendedor')
					$scope.borrarProducto = true;
				else
					$scope.borrarProducto = false;
			}
			else
			{ //console.log('else');
				$scope.logeado = false;
				$state.go("inicio");
			}
			/*----*/

   			$scope.Listado = {

   			    enableGridMenu: true,
   			    enableSelectAll: true,
   			    exporterCsvFilename: 'Productos.csv',
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
   			            field: 'nombre', cellTooltip: function (row, col) {
   			                return 'nombre: ' + row.entity.nombre;
   			            }, name: 'Nombre'
   			            , filter: {
   			                condition: uiGridConstants.filter.CONTAINS,
   			                placeholder: 'contiene'
   			            }
   			        },
   			        {
            		    field: 'vigente', name: 'Vigente', width: '7%',
            		    cellClass: 'columnaUI',
            		    cellFilter: 'mapGender',
            		    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
            		    filter: {
            		        term: '',
            		        options: [{ id: '', value: 'TODOS' },{ id: 1, value: 'SI' }, { id: 0, value: 'NO' }]     // custom attribute that goes with custom directive above 
            		    },
            		},
   			        {
   			            field: 'descripcion', cellTooltip: function (row, col) {
   			                return 'Descripcion: ' + row.entity.descripcion;
   			            }, name: 'Descripcion'
   			            , filter: {
   			                condition: uiGridConstants.filter.CONTAINS,
   			                placeholder: 'contiene'
   			            }																																																																																																						
   			        },   			        																																																																										//ng-click="Borrar({{producto}})" ng-if="borrarProducto"																																	
   			        { field: '',  cellClass: 'columnaUI',enableFiltering: false, name: 'Acciones', width: '15%', cellTemplate: '<a href=""  ng-click="grid.appScope.Borrar(row.entity.id)"> <span class="glyphicon glyphicon-trash" data-toggle="tooltip" title="Eliminar" aria-hidden="true"></span></a>' }
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

				FactoryProducto.BuscarTodos().then(
		 			function(respuesta) {     	
	      			$scope.Listado.data = respuesta;
		  		 	},function(error) {
	     				$scope.ListadoProductos= [];
		 		});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en el controlador productos.";
	 	}

	 	$scope.Borrar = function(producto){
	 		try
	 		{
	 			FactoryProducto.Borrar(producto);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-success";
				$scope.resultado.mensaje = "Producto Eliminado";

		 		$timeout(function(){
		 			$state.reload();
		 		}, 1000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al borrar un producto";
		 	}
	 	}
  })
  .controller("ProductoAltaCtrl", function($scope, $auth, $state, $http, jwtHelper, FactoryProducto, FactoryRutas) {
	console.log('ProductoAltaCtrl');
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		}
		else
		{
			$state.go("inicio");
		}
		
		$scope.producto={};
	    $scope.producto.nombre = "Producto 1";
	    $scope.producto.descripcion = "Producto 1";
	    $scope.producto.precio = "15";
	}
 	catch(error)
 	{
 		console.info(error);
 		$scope.resultado.estilo = "alert alert-danger";
		$scope.resultado.mensaje = "Error en el controlador producto.";
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryProducto.Guardar($scope.producto).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Producto Guardado";
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el producto";
					console.log(error);
			 });
		}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
  })
  

;// cierra modulo
