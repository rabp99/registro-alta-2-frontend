'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SolicitudesAddCtrl
 * @description
 * # SolicitudesAddCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('SolicitudesAddCtrl', function ($scope, $utilsViewService, programacionesService, personasService) {
    $scope.init = function() {
        $scope.step = 1;
        $scope.dni_medico = '';
        $scope.searching = 'search';
        $scope.area_ingreso = null;
        $scope.gresotipo_epp = '';
        $scope.turno = '';
        $scope.tipo_epp = '';
        $scope.tipos_epps = [];
        $scope.cantidad = '1';
        $scope.trabajador = {};
        $scope.programacionesAvailables = [];
        $scope.programacionSelected = {};
        $scope.showEmergencia = false;
        $scope.onEmergencia = false;
        $scope.loadingTrabajador = false;
        $scope.loadingSolicitar = false;
    };
    
    $scope.search = function(dni_medico) {
        if (dni_medico.length < 8) {
            return;
        }
        $scope.searching = 'find_replace';
        $utilsViewService.disable('.btn-search');
        $scope.loadingTrabajador = true;
        
        personasService.get({dni: dni_medico}, function(data) {
            if (data.dni !== null) {
                $scope.trabajador.ndoc = data.dni;
                $scope.trabajador.full_name = data.apellidoPaterno + ' ' + data.apellidoMaterno + ', ' + data.nombres;
            } else {
                $scope.trabajador = {};
                Materialize.toast('No se encontró un trabajador con ese número de documento', 4000);
            }
            $scope.loadingTrabajador = false;
            $scope.searching = 'search';
            $utilsViewService.enable('.btn-search');
        }, function(err) {
            $scope.loadingTrabajador = false;
        });
    };
    
    $scope.onTurnoSelected = function(turno) {
        if (turno !== '') {
            $scope.programacionSelected = $scope.programacionesAvailables.filter(function(programacionAvailable) {
                return programacionAvailable.turno === turno;
            })[0];
        } else {
            $scope.programacionSelected = {};
        }
    };
    
    $scope.goTo = function(step) {
        if (step === 2) {
            // 
        }
        if (step === 3) {
            if ($scope.area_ingreso === null) {
                Materialize.toast('Aún no ha seleccionado el área al que va a ingresar', 4000);
                return;
            }
        }
        if (step === 4) {
            if ($scope.tipo_epp === '') {
                Materialize.toast('Aún no ha seleccionado el tipo de EPP ha solicitar', 4000);
                return;
            }
        }
        $scope.step = step;
    };
    
    $scope.$watch("area_ingreso", function(newValue, oldValue) {
        if (newValue !== null) {
            $scope.tipos_epps = [];
            $scope.tipo_epp = '';
            $scope.cantidad = '1';
            switch (newValue) {
                case 'ÁREAS DE HOSPITALIZACIÓN':
                    $scope.tipos_epps.push('EPP 5', 'EPP 8');
                    break;
                case 'ÁREAS EXTERNAS':
                    $scope.tipos_epps.push('EPP 0', 'EPP 2');
                    // $scope.tipo_epp = 'EPP 2';
                    break;
                case 'ÁREA HOSPITALIZACIÓN VILLA ES SALUD':
                    $scope.tipos_epps.push('EPP 5');
                    $scope.tipo_epp = 'EPP 5';
                    break;
                default:
                    $scope.tipos_epps = [];
                    break;
            }
        }
    });
    
    $scope.solicitar = function(trabajador, programacionSelected, area_ingreso, tipo_epp, cantidad) {
        if ($scope.step === 1) {
            $scope.search($scope.dni_medico);
            return;
        }
        if (!confirm('¿Está seguro de registrar esta solicitud?')) {
            return;
        }
        
        $utilsViewService.disable('.btn-submit');
        $scope.loadingSolicitar = true;
        programacionesService.solicitar({
            centro: programacionSelected.centro,
            dni_medico: trabajador.ndoc,
            fecha_programacion: programacionSelected.fecha_programacion,
            turno: programacionSelected.turno,
            area_ingreso: area_ingreso,
            tipo_epp: tipo_epp,
            cantidad: cantidad,
            profesional: trabajador.full_name,
            grupo_ocupacional: trabajador.grupo_ocupacional,
            cod_planilla: trabajador.cp,
            flag_interno: 0,
            emergencia: 1
        }, function(data) {
            Materialize.toast(data.message, 4000);
            $utilsViewService.enable('.btn-submit');
            $scope.init();
        }, function(error) {
            $utilsViewService.enable('.btn-submit');
            $scope.loadingSolicitar = false;
            Materialize.toast(error.data.message, 4000);
            Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
        });
    };
    
    $scope.init();
});