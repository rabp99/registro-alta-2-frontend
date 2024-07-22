'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProgramacionesRegisterCtrl
 * @description
 * # ProgramacionesRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProgramacionesEntregaCtrl', function ($scope, $utilsViewService, $window, solicitudesService, tiposService, $firebaseObject, $firebaseArray) {
        $scope.init = function () {
            $scope.dni_medico = '';
            $scope.searching = 'search';
            $scope.solicitudesFirmaWidth = 500;
            $scope.trabajador = {};
            $scope.solicitudes = [];
            $scope.version = 0;
            $scope.tipos = [];
            $scope.solicitudDetalleSelected = {};
            $scope.loadingSolicitudes = false;
            $scope.loadingRegister = false;
            $scope.showCodigo = false;
            getTipos();
            $scope.idFound = false;
            $scope.firmaValor = '';
            resize(700, 500, 280);
            $scope.last_epp0 = '';
        };

        $scope.search = function (dni_medico) {
            if (dni_medico.length < 8) {
                return;
            }
            $scope.searching = 'find_replace';

            $scope.solicitudes = [];
            $scope.loadingSolicitudes = true;
            solicitudesService.findSolicitudes({ dni_medico: dni_medico }, function (data) {
                if (data.solicitudes.length > 0) {
                    $scope.solicitudes = data.solicitudes;
                    $scope.trabajador.ndoc = $scope.solicitudes[0].programacion_dni_medico;
                    $scope.trabajador.full_name = $scope.solicitudes[0].profesional;
                    $scope.last_epp0 = data.last_epp0;
                } else {
                    $scope.trabajador = {};
                    $scope.solicitudes = [];
                    Materialize.toast(data.message, 4000);
                }
                $scope.searching = 'search';
                $scope.loadingSolicitudes = false;
            });
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

        $scope.registrarEntrega = function (solicitudes) {
            var reutilizables = [];
            angular.forEach(solicitudes, function (solicitud, key) {
                angular.forEach(solicitud.reutilizables, function (reutilizable, key) {
                    if ((solicitud.tipo_epp === "EPP 2" && reutilizable.tipo_id === 3) || solicitud.tipo_epp !== "EPP 2")
                        reutilizables.push({
                            solicitud_id: solicitud.id,
                            tipo_id: reutilizable.tipo_id,
                            codigo: reutilizable.codigo
                        });
                });
            });

            var countNotNullReutilizables = reutilizables.filter(function (reutilizable) {
                return reutilizable.codigo !== undefined;
            });

            if ($scope.trabajador.full_name === undefined) {
                $scope.search($scope.dni_medico);
                return;
            }

            if (solicitudes.length === 0) {
                Materialize.toast('No hay solicitudes que registrar', 4000);
                return;
            }

            if (countNotNullReutilizables.length !== getTotal(solicitudes)) {
                Materialize.toast('Aún no ha ingresado todos los números de la indumentaria en Detalle', 4000);
                return;
            }

            if ($scope.firmaValor === '' || $scope.firmaValor === undefined) {
                Materialize.toast('No ha ingresado la firma', 4000);
                return;
            }

            if (!confirm('¿Está seguro de registrar la entrega de EPP\'s?')) {
                return;
            }

            $scope.loadingRegister = true;

            $scope.firma.$remove().then(function (ref) {
            }, function (error) {
                console.log("Ocurrió un error:", error);
            });

            reutilizables = reutilizables.filter(function (reutilizable) {
                return (reutilizable.codigo !== 'D' && reutilizable.codigo !== 'd');
            });

            solicitudesService.entregar({
                solicitudes: solicitudes,
                firma: $scope.firmaValor,
                reutilizablesDetalles: reutilizables,
                dni_medico: $scope.trabajador.ndoc
            }, function (data) {
                Materialize.toast(data.message, 4000);
                $utilsViewService.enable('.btn-submit');
                $scope.init();
            }, function (error) {
                $utilsViewService.enable('.btn-submit');
                Materialize.toast(error.data.message, 4000);
                $scope.loadingRegister = false;
                // Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
                // $scope.init();
            });
        };

        $scope.changeCantidad = function (solicitud) {
            if (confirm('¿Está seguro de cambiar la cantidad de EPPs?')) {
                solicitud.cantidad--;
                solicitud.cantidad = 1 - solicitud.cantidad;
                solicitud.cantidad++;
            }
        };

        var getTipos = function () {
            tiposService.getEnabled(function (data) {
                $scope.tipos = data.tipos;
            });
        };

        $scope.setDetalleSolicitud = function (solicitud) {
            $scope.solicitudDetalleSelected = solicitud;
            if ($scope.solicitudDetalleSelected.reutilizables === undefined) {
                $scope.solicitudDetalleSelected.reutilizables = [];
            }
            if ($scope.solicitudDetalleSelected.reutilizables.length === 0) {
                angular.forEach($scope.tipos, function (tipo, key) {
                    var reutilizable = {
                        tipo_id: tipo.id,
                        solicitud_id: $scope.solicitudDetalleSelected.id
                    };
                    $scope.solicitudDetalleSelected.reutilizables.push(reutilizable);
                });
                if ($scope.solicitudDetalleSelected.cantidad === 2) {
                    angular.forEach($scope.tipos, function (tipo, key) {
                        var reutilizable = {
                            tipo_id: tipo.id,
                            solicitud_id: $scope.solicitudDetalleSelected.id
                        };
                        $scope.solicitudDetalleSelected.reutilizables.push(reutilizable);
                    });
                }
            } else if ($scope.solicitudDetalleSelected.reutilizables.length === $scope.tipos.length && $scope.solicitudDetalleSelected.cantidad === 2) {
                angular.forEach($scope.tipos, function (tipo, key) {
                    var reutilizable = {
                        tipo_id: tipo.id,
                        solicitud_id: $scope.solicitudDetalleSelected.id
                    };
                    $scope.solicitudDetalleSelected.reutilizables.push(reutilizable);
                });
            } else if ($scope.solicitudDetalleSelected.reutilizables.length === $scope.tipos.length * 2 && $scope.solicitudDetalleSelected.cantidad === 1) {
                $scope.solicitudDetalleSelected.reutilizables = $scope.solicitudDetalleSelected.reutilizables.slice(0, $scope.solicitudDetalleSelected.reutilizables.length - $scope.tipos.length);
            }
        };

        var getTotal = function (solicitudes) {
            var solicitudesFiltered = solicitudes.filter(function (solicitud) {
                return solicitud.tipo_epp === 'EPP 5' || solicitud.tipo_epp === 'EPP 8' || solicitud.tipo_epp === 'EPP 2';
            });

            var cantidades = solicitudesFiltered.map(function (solicitudFiltered) {
                if (solicitudFiltered.tipo_epp === 'EPP 5' || solicitudFiltered.tipo_epp === 'EPP 8') {
                    return solicitudFiltered.cantidad * $scope.tipos.length;
                } else if (solicitudFiltered.tipo_epp === 'EPP 2') {
                    return solicitudFiltered.cantidad * 1;
                }
            });

            if (cantidades.length) {
                var suma_cantidades = cantidades.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue;
                });
                return suma_cantidades;
            } else {
                return 0;
            }
        };

        $scope.waitFirma = function () {
            var today = new Date();

            var id = $utilsViewService.makeid(4) + $utilsViewService.formatDateToSql2(today);

            firebase.auth().signInAnonymously().then(function () {
                var ref = firebase.database().ref().child('firmas/' + id);
                $scope.firma = $firebaseObject(ref);
                $scope.firma.$loaded().then(function () {
                    if ($scope.firma.codigo === undefined) {
                        $scope.firma.$value = {
                            fecha: $utilsViewService.formatDateToSql(today),
                            codigo: id.substr(0, 4)
                        };
                        $scope.firma.$save().then(function (firma) {
                            $scope.idFound = true;
                            $scope.showCodigo = true;
                        }).catch(function (error) {
                            Materialize.toast('Error', 4000);
                        });
                    } else {
                        $scope.showCodigo = false;
                        $scope.waitFirma();
                    }
                });
            }).catch(function (error) {
                console.error('Error al autenticar anónimamente:', error);
            });
        };

        $scope.saveFirma = function () {
            $scope.firmaValor = $scope.firma.valor;
            $scope.firma.$remove().then(function (ref) {
            }, function (error) {
                console.log("Ocurrió un error:", error);
            });
        };

        $scope.removeSolicitud = function (solicitud) {
            if (!confirm('¿Está seguro de eliminar esta solicitud?')) {
                return;
            }

            solicitudesService.remove({ solicitud_id: solicitud.id }, function (data) {
                Materialize.toast(data.message, 4000);
                $scope.search($scope.dni_medico);
            }, function (err) {
                Materialize.toast('Error', 4000);
            });
        };

        $scope.init();
    });