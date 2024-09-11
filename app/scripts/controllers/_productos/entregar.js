'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProductosEntregarCtrl
 * @description
 * # ProductosEntregarCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProductosEntregarCtrl', function ($scope, $utilsViewService, consumiblesService, trabajadoresService, gruposOcupacionalesService, solicitudesService, $window, colaboradoresService, programacionesService) {
        $scope.init = function () {
            $scope.dni_medico = '';
            $scope.searching = 'search';
            $scope.solicitudesFirmaWidth = 500;
            $scope.trabajador = {};
            $scope.version = 0;
            $scope.entregas = [];
            $scope.consumibles = [];
            $scope.gruposOcupacionales = [];
            $scope.newEntrega = {
                cantidad: 1
            };
            $scope.loadingEntregas = false;
            $scope.loadingRegister = false;
            $scope.area_opciones = [
                'ÁREA DE HOSPITALIZACIÓN', 'ÁREAS EXTERNAS', 'ÁREA HOSPITALIZACIÓN VILLA ES SALUD'
            ];
            $scope.firmaValor = '';
            $scope.tipo_epp = '';
            $scope.ultimos = 10;
            resize(700, 500, 280);
            getConsumibles();
            getGruposOcupacionales();
        };

        $scope.search = function (dni_medico) {
            if (dni_medico.length < 8) {
                return;
            }

            $scope.searching = 'find_replace';

            /*
            trabajadoresService.getByDni({ texto: dni_medico }, function (data) {
                if (data.trabajador !== null) {
                    $scope.trabajador = data.trabajador;
                    $scope.trabajador.full_name = $scope.trabajador.apa + ' ' + $scope.trabajador.ama + ', ' + $scope.trabajador.nom;
            
                    $scope.loadingEntregas = true;
                    solicitudesService.findLastEntregas({ dni_medico: dni_medico, numero: $scope.ultimos }, function (data) {
                        $scope.entregas = data.solicitudes;
                        $scope.searching = 'search';
                        $scope.loadingEntregas = false;
                    });
                } else {
                    colaboradoresService.findByDni({ dni: dni_medico }, function (data) {
                        if (data.colaborador !== null) {
                            $scope.trabajador.ndoc = data.colaborador.nro_documento;
                            $scope.trabajador.full_name = data.colaborador.trabajador;
                            $scope.newEntrega.grupo_ocupacional = data.colaborador.grupo_ocupacional;
            
                            solicitudesService.findLastEntregas({ dni_medico: dni_medico, numero: $scope.ultimos }, function (data) {
                                $scope.entregas = data.solicitudes;
                                $scope.searching = 'search';
                                $scope.loadingEntregas = false;
                            });
                        } else {
                            $scope.trabajador = {};
                            $scope.entregas = [];
                            Materialize.toast('No se encontró un trabajador con ese número de documento', 4000);
                        }
                        $scope.searching = 'search';
                    });
                }
            }, function (err) {
            */
            programacionesService.findToTrabajador({ dni_medico: dni_medico }, function (data) {
                if (data.programacion !== null) {
                    $scope.trabajador.ndoc = data.programacion.dni_medico;
                    $scope.trabajador.full_name = data.programacion.profesional;
                    $scope.newEntrega.grupo_ocupacional = data.programacion.grupo_ocupacional;

                    solicitudesService.findLastEntregas({ dni_medico: dni_medico, numero: $scope.ultimos }, function (data) {
                        $scope.entregas = data.solicitudes;
                        $scope.searching = 'search';
                        $scope.loadingEntregas = false;
                    });
                } else {
                    colaboradoresService.findByDni({ dni: dni_medico }, function (data) {
                        if (data.colaborador !== null) {
                            $scope.trabajador.ndoc = data.colaborador.nro_documento;
                            $scope.trabajador.full_name = data.colaborador.trabajador;
                            $scope.newEntrega.grupo_ocupacional = data.colaborador.grupo_ocupacional;

                            solicitudesService.findLastEntregas({ dni_medico: dni_medico, numero: $scope.ultimos }, function (data) {
                                $scope.entregas = data.solicitudes;
                                $scope.searching = 'search';
                                $scope.loadingEntregas = false;
                            });
                        } else {
                            $scope.trabajador = {};
                            $scope.entregas = [];
                            Materialize.toast('No se encontró un trabajador con ese número de documento', 4000);
                        }
                        $scope.searching = 'search';
                    });
                }
            });
            // });
        };

        $scope.clearFirma = function () {
            $scope.version = 0;
        };

        var resize = function (limit, maxWidth, minWidth) {
            if ($window.innerWidth < limit) {
                $scope.solicitudesFirmaWidth = minWidth;
                $('#solicitudesFirma').attr('width', minWidth);
                $('#solicitudesFirmaTmp').attr('width', minWidth);
            } else {
                $scope.solicitudesFirmaWidth = maxWidth;
                $('#solicitudesFirma').attr('width', maxWidth);
                $('#solicitudesFirmaTmp').attr('width', maxWidth);
            }
        };

        $scope.registrarEntrega = function (newEntrega) {
            if ($scope.trabajador.full_name === undefined) {
                $scope.search($scope.dni_medico);
                return;
            }

            if (!newEntrega.grupo_ocupacional) {
                Materialize.toast('No ha seleccionado el grupo ocupacional', 4000);
                return;
            }

            if (!newEntrega.area_ingreso) {
                Materialize.toast('No ha seleccionado el área a la que va a ingresar', 4000);
                return;
            }

            if (!$scope.tipo_epp) {
                Materialize.toast('No ha seleccionado el tipo de Producto a entregar', 4000);
                return;
            }

            if ($scope.firmaValor === '' || $scope.firmaValor === undefined) {
                Materialize.toast('No ha ingresado la firma', 4000);
                return;
            }

            if (!confirm('¿Está seguro de registrar la entrega de los productos de protección?')) {
                return;
            }

            newEntrega.programacion_dni_medico = $scope.trabajador.ndoc;
            newEntrega.profesional = $scope.trabajador.full_name;
            newEntrega.flag_consumible = 1;
            newEntrega.firma = $scope.firmaValor;

            $scope.firma.$remove().then(function (ref) {
            }, function (error) {
                console.log("Ocurrió un error:", error);
            });

            $scope.loadingRegister = true;
            solicitudesService.saveEntrega({
                solicitud: newEntrega,
                consumible_id: $scope.tipo_epp
            }, function (data) {
                Materialize.toast(data.message, 4000);
                $utilsViewService.enable('.btn-submit');
                $scope.init();
            }, function (error) {
                $utilsViewService.enable('.btn-submit');
                Materialize.toast(error.data.message, 4000);
                $scope.loadingRegister = false;
            });
        };

        var getConsumibles = function () {
            consumiblesService.getEnabled(function (data) {
                $scope.consumibles = data.consumibles;
            });
        };

        var getGruposOcupacionales = function () {
            gruposOcupacionalesService.getAllowShow(function (data) {
                $scope.grupos_ocupacionales = data.gruposOcupacionales;
            });
        };

        $scope.waitFirma = function () {
        };

        $scope.saveFirma = function () {
            $scope.firmaValor = $scope.firma.valor;
            $scope.firma.$remove().then(function (ref) {
            }, function (error) {
                console.log("Ocurrió un error:", error);
            });
        };

        $scope.init();
    });