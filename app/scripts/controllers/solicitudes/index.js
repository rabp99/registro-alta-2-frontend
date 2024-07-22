'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SupervisoresIndexCtrl
 * @description
 * # SupervisoresIndexCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('SolicitudesIndexCtrl', function ($scope, solicitudesService, $utilsViewService, $filter, FileSaver, tiposService) {
    $scope.init = function() {
        $scope.inicio = true;
        
        $scope.tableSolicitudes = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getSolicitudes();
            }
        };
        
        $scope.tipo_epps = [{
                valor: "EPP 0",
                descripcion: "EPP 0"
            }, {
                valor: "EPP 2",
                descripcion: "EPP 2"
            }, {
                valor: "EPP 5",
                descripcion: "EPP 5"
            }, {
                valor: "EPP 8",
                descripcion: "EPP 8"
            }, {
                valor: "1",
                descripcion: "Reutilizable"
            }
        ];
        
        $scope.search = {
            dni: '',
            tipo_epp: ''
        };
        
        $scope.pre_fecha_inicio = new Date();
        $scope.pre_fecha_fin = new Date();
        
        $scope.solicitudes = [];
        getTipos();
        $scope.loading = false;
    };

    var getSolicitudes = function() {
        $scope.solicitudes = [];
        $scope.tableSolicitudes.loading = true;
        $scope.inicio = false;
        
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.report({
            dni: $scope.search.dni,
            tipo_epp: $scope.search.tipo_epp,
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || '',
            
            page: parseInt($scope.tableSolicitudes.page),
            itemsPerPage: $scope.tableSolicitudes.pagination.itemsPerPage
        },function(data) {
            $scope.solicitudes = data.solicitudes;
            
            $scope.tableSolicitudes.loading = false;
            $scope.tableSolicitudes.count = data.count;
            $scope.tableSolicitudes.pagination = data.pagination;
        });
    };
        
    $scope.searchSolicitudes = function() {
        $scope.tableSolicitudes.page = 1;
        getSolicitudes();
    };
        
    var getTipos = function() {
        tiposService.getEnabled(function(data) {
            $scope.tipos = data.tipos;
        });
    };
    
    $scope.remove = function(solicitud) {
        if (!confirm('¿Está seguro de eliminar esta solicitud?')) {
            return;
        }
        solicitudesService.removeBd({
            solicitud_id: solicitud.id
        }, function(data) {
            Materialize.toast(data.message, 4000);
            getSolicitudes();
        }, function(err) {
            Materialize.toast('Error', 4000);
        });
    };
    
    $scope.init();
});