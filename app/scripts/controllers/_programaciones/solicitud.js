'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProgramacionesRegisterCtrl
 * @description
 * # ProgramacionesRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProgramacionesSolicitudCtrl', function ($scope, $utilsViewService, programacionesService, colaboradoresService) {
        $scope.init = function () {
            $scope.step = 1;
            $scope.dni_medico = '';
            $scope.searching = 'search';
            $scope.area_ingreso = null;
            $scope.gresotipo_epp = '';
            $scope.turno = '';
            $scope.tipo_epp = '';
            $scope.tipos_epps = [];
            $scope.cantidad = '1';
            $scope.cantidad_options = [1, 2];
            $scope.trabajador = {};
            $scope.programacionesAvailables = [];
            $scope.programacionSelected = {};
            $scope.showEmergencia = false;
            $scope.onEmergencia = false;
            $scope.loadingProgramacionesAvailables = false;
            $scope.loadingSolicitar = false;
        };

        $scope.search = function (dni_medico) {
            if (dni_medico.length < 8) {
                return;
            }
            $scope.searching = 'find_replace';
            $scope.turno = '';
            $scope.programacionesAvailables = [];
            $scope.programacionSelected = {};
            $scope.loadingProgramacionesAvailables = true;
            $utilsViewService.disable('.btn-search');
            /*
            switch (window.location.hostname) {
                case 'ralta.ralalibertad.com':
            */
            $scope.cantidad_options = [1, 2];

            colaboradoresService.checkColaboradorProgramadoHoy({ dni_medico: dni_medico }).$promise
                .then(function (data) {
                    $scope.colaborador = data.colaborador;

                    if (data.turno) {
                        $scope.turno = data.turno;
                        $scope.onTurnoSelected($scope.turno);
                    }

                    $scope.showEmergencia = false;
                    $scope.onEmergencia = false;
                })
                .catch(function (error) {
                    Materialize.toast(error.data.message, 4000);
                })
                .finally(function () {
                    $scope.searching = 'search';
                    $utilsViewService.enable('.btn-search');
                    $scope.loadingProgramacionesAvailables = false;

                });
        };

        $scope.onTurnoSelected = function (turno) {
            if (turno !== '') {
                $scope.programacionSelected = $scope.programacionesAvailables.filter(function (programacionAvailable) {
                    return programacionAvailable.turno === turno;
                })[0];
            } else {
                $scope.programacionSelected = {};
            }
        };

        $scope.goTo = function (step) {
            if (step === 2) {
                if ($scope.trabajador.ndoc === undefined && !$scope.onEmergencia) {
                    Materialize.toast('Aún no ha seleccionado un profesional con programación actual', 4000);
                    return;
                }
                if ($scope.programacionesAvailables.length === 0 && !$scope.onEmergencia) {
                    Materialize.toast('No tiene programaciones para el día de hoy', 4000);
                    return;
                }
                if ($scope.onEmergencia) {
                    step = 1;
                    $scope.showEmergencia = true;
                }
            }
            if (step === 3) {
                if ($scope.programacionSelected.area === undefined && !$scope.onEmergencia) {
                    Materialize.toast('Aún no ha seleccionado un turno', 4000);
                    return;
                }
                $scope.showEmergencia = false;
            }
            if (step === 4) {
                if ($scope.area_ingreso === null) {
                    Materialize.toast('Aún no ha seleccionado el área al que va a ingresar', 4000);
                    return;
                }
            }
            if (step === 5) {
                if ($scope.tipo_epp === '') {
                    Materialize.toast('Aún no ha seleccionado el tipo de EPP ha solicitar', 4000);
                    return;
                }
            }
            $scope.step = step;
        };

        $scope.$watch("area_ingreso", function (newValue, oldValue) {
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

        $scope.solicitar = function (trabajador, programacionSelected, area_ingreso, tipo_epp, cantidad) {
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
                flag_interno: 1,
                emergencia: $scope.onEmergencia
            }, function (data) {
                Materialize.toast(data.message, 4000);
                $utilsViewService.enable('.btn-submit');
                $scope.init();
            }, function (error) {
                $utilsViewService.enable('.btn-submit');
                Materialize.toast(error.data.message, 4000);
                Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
                $scope.loadingSolicitar = false;
            });
        };

        $scope.init();
    });