'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:EntradasRegisterCtrl
 * @description
 * # EntradasRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ProgramacionesSalidaCtrl', function ($scope, programacionesService, $utilsViewService, reutilizablesSolicitudesDetallesService, gruposService, supervisoresService, $timeout, colaboradoresService) {
    $scope.init = function() {
        $scope.dni_medico = '';
        $scope.turno = '';
        $scope.searching = 'search';
        $scope.trabajador = {};
        $scope.programacionesEntregados = [];
        $scope.programacionSelected = {};
        $scope.cuestionario = {
            supervisor_dni: '',
            supervisor_nombres: ''
        };
        $scope.reutilizablesSolicitudesDetalle_selected = [];
        $scope.grupos = [];
        $scope.loadingProgramaciones = false;
        $scope.loadingRegister = false;
        $scope.loadingReutilizables = false;
        $scope.loadingCuestionario = false;
        $scope.dni_search = '';
        $scope.loadingSupervisor = false;
        angular.element('#dni').focus();
        getGrupos();
        getSupervisores();
    };
    
    $scope.search = function(dni_medico) {
        $scope.searching = 'find_replace';
        $scope.loadingProgramaciones = true;
        $scope.programacionesEntregados = [];
        $scope.trabajador = {};
        $scope.programacionSelected = {};
        programacionesService.findEntregados({dni_medico: dni_medico}, function(data) {
            if (data.programaciones.length > 0) {
                $scope.programacionesEntregados = data.programaciones;
                $scope.trabajador.full_name = $scope.programacionesEntregados[0].profesional;
                if ($scope.programacionesEntregados.length === 1) {0
                    $scope.turno = $scope.programacionesEntregados[0].fecha_programacion + ' ' + $scope.programacionesEntregados[0].turno;
                    $scope.onTurnoSelected($scope.turno);
                }
            } else {
                $scope.programacionesEntregados = [];
                $scope.turno = '';
                Materialize.toast(data.message, 4000);
            }
            $scope.searching = 'search';
            $scope.loadingProgramaciones = false;
            $timeout(function() {
                if ($scope.programacionSelected.estado_id === 4) {
                    $scope.registerEntrada($scope.programacionSelected);
                }
                if ($scope.programacionSelected.estado_id === 10) {
                    $scope.registerBreakFinal($scope.programacionSelected);
                }
            }, 1000);
        });
    };
    
    $scope.onTurnoSelected = function(turno) {
        if (turno !== '') {
            $scope.programacionSelected = $scope.programacionesEntregados.filter(function(programacionEntregado) {
                return (programacionEntregado.fecha_programacion + ' ' + programacionEntregado.turno) === turno;
            })[0];
            if ($scope.programacionSelected.estado_id === 5 || $scope.programacionSelected.estado_id === 11) {
                $scope.loadingReutilizables = true;
                $scope.reutilizablesSolicitudesDetalles = [];
                reutilizablesSolicitudesDetallesService.findEntregadosSalida({dni_medico: $scope.dni_medico}, function(data) {
                    if (data.reutilizablesSolicitudesDetalles.length > 0) {
                        $scope.reutilizablesSolicitudesDetalles = data.reutilizablesSolicitudesDetalles;
                        if ($scope.reutilizablesSolicitudesDetalles.length === 1) {
                            setRespuestas($scope.reutilizablesSolicitudesDetalles[0].solicitud.tipo_epp);
                        } else {
                            setRespuestasAll();
                        }
                    } else {
                        $scope.reutilizablesSolicitudesDetalles = [];
                        setRespuestasAll();
                        Materialize.toast(data.message, 4000);
                    }
                    $scope.loadingReutilizables = false;
                }, function(err) {
                    Materialize.toast('Se produjo un error', 4000);
                    $scope.loadingReutilizables = false;
                });
            }
        } else {
            $scope.programacionSelected = {};
        }
    };
        
    $scope.registerSalida = function(programacionSelected, grupos) {
        if ($scope.reutilizablesSolicitudesDetalle_selected.length === 0) {
            alert('No ha seleccionado ninguna indumentaria');
        }
        
        if ($scope.cuestionario.supervisor_dni === '') {
            alert('No ha completado el cuestionario');
            return;
        }
        
        if (!confirm('¿Está seguro de registrar la salida?')) {
            return;
        }
        
        $scope.loadingRegister = true;
        programacionesService.registerSalida({
            centro: programacionSelected.centro,
            dni_medico: programacionSelected.dni_medico,
            fecha_programacion: programacionSelected.fecha_programacion,
            turno: programacionSelected.turno,
            cuestionario: $scope.cuestionario,
            grupos: grupos
        }, function(data) {
            Materialize.toast(data.message, 4000);
            if ($scope.reutilizablesSolicitudesDetalle_selected.length > 0) {
                reutilizablesSolicitudesDetallesService.devolverEnSalida({
                    reutilizables_solicitudes_detalles: $scope.reutilizablesSolicitudesDetalle_selected
                }, function(data) {
                    Materialize.toast(data.message, 4000);
                    $utilsViewService.enable('.btn-submit');
                    $scope.init();
                }, function(error) {
                    $utilsViewService.enable('.btn-submit');
                    Materialize.toast(error.data.message, 4000);
                    $scope.loadingRegister = false;
                });
            }
            $scope.init();
        }, function(error) {
            $utilsViewService.enable('.btn');
            Materialize.toast(error.data.message, 4000);
            Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
            $scope.loadingRegister = false;
        });
    };
    
    $scope.registerBreakStart = function(programacionSelected, grupos) {
        if ($scope.reutilizablesSolicitudesDetalle_selected.length === 0) {
            alert('No ha seleccionado ninguna indumentaria');
        }
        
        if ($scope.cuestionario.supervisor_dni === '') {
            alert('No ha completado el cuestionario');
            return;
        }
        
        if (!confirm('¿Está seguro de registrar el inicio del break?')) {
            return;
        }
        
        $scope.loadingRegister = true;
        programacionesService.registerBreakStart({
            centro: programacionSelected.centro,
            dni_medico: programacionSelected.dni_medico,
            fecha_programacion: programacionSelected.fecha_programacion,
            turno: programacionSelected.turno,
            cuestionario: $scope.cuestionario,
            grupos: grupos
        }, function(data) {
            Materialize.toast(data.message, 4000);
            if ($scope.reutilizablesSolicitudesDetalle_selected.length > 0) {
                reutilizablesSolicitudesDetallesService.devolverEnSalida({
                    reutilizables_solicitudes_detalles: $scope.reutilizablesSolicitudesDetalle_selected
                }, function(data) {
                    Materialize.toast(data.message, 4000);
                    $utilsViewService.enable('.btn-submit');
                    $scope.init();
                }, function(error) {
                    $utilsViewService.enable('.btn-submit');
                    Materialize.toast(error.data.message, 4000);
                    $scope.loadingRegister = false;
                });
            }
            $scope.init();
        }, function(error) {
            $utilsViewService.enable('.btn');
            Materialize.toast(error.data.message, 4000);
            Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
            $scope.loadingRegister = false;
        });
    };
    
    $scope.registerBreakFinal = function(programacionSelected) {
        if (!confirm('¿Está seguro de registrar el final del break?')) {
            return;
        }
        
        $scope.loadingRegister = true;
        programacionesService.registerBreakFinal({
            centro: programacionSelected.centro,
            dni_medico: programacionSelected.dni_medico,
            fecha_programacion: programacionSelected.fecha_programacion,
            turno: programacionSelected.turno
        }, function(data) {
            Materialize.toast(data.message, 4000);
            $utilsViewService.enable('.btn');
            $scope.init();
        }, function(error) {
            $utilsViewService.enable('.btn');
            Materialize.toast(error.data.message, 4000);
            Materialize.toast($utilsViewService.getErrors(error.data.errors), 4000);
            $scope.loadingRegister = false;
        });
    };
    
    var getGrupos = function() {
        $scope.loadingCuestionario = true;
        gruposService.getCuestionario(function(data) {
            $scope.grupos = data.grupos;
            $scope.loadingCuestionario = false;
        });
    };
    
    var getSupervisores = function() {
        $scope.loadingSupervisores = true;
        supervisoresService.getEnabled(function(data) {
            $scope.supervisores = data.supervisores;
            $scope.loadingSupervisores = false;
        });
    };
    
    var setRespuestas = function(tipo_epp) {
        angular.forEach($scope.grupos, function(grupo, key) {
            angular.forEach(grupo.preguntas, function(pregunta, key) {
                var tipos_epps = pregunta.si_case.split(',');
                if (tipos_epps.indexOf(tipo_epp) >= 0) {
                    pregunta.respuesta_valor = 1;
                } else {
                    pregunta.respuesta_valor = 0;
                }
            });
        });
    };
    
    var setRespuestasAll = function() {
        angular.forEach($scope.grupos, function(grupo, key) {
            angular.forEach(grupo.preguntas, function(pregunta, key) {
                pregunta.respuesta_valor = 1;
            });
        });
    };
    
    $scope.searchSupervisor = function(dni) {
        if (dni === undefined) {
            $scope.cuestionario.supervisor_dni = '';
            $scope.cuestionario.supervisor_nombres = '';
            return;
        }
        if (dni.length > 7) {
            $scope.loadingSupervisor = true;
            supervisoresService.findByDni({dni: dni}, function(data) {
                if (data.supervisor) { 
                    $scope.cuestionario.supervisor_dni = data.supervisor.nro_documento;
                    $scope.cuestionario.supervisor_nombres = data.supervisor.trabajador;
                } else {
                    $scope.cuestionario.supervisor_dni = '';
                    $scope.cuestionario.supervisor_nombres = '';
                }
                $scope.loadingSupervisor = false;
            });
        } else {
            $scope.cuestionario.supervisor_nombres = '';
        }
    };
    
    $scope.inTime = function(programacion) {
        var hour = 60*60*1000;
        var day = hour * 24;
        var hourAgo = new Date(Date.now() - (hour * 3));
        var hourPlus = new Date(Date.now() + (hour * 3));
        
        var hourAgoFormatted = $utilsViewService.formatDateTimeToSql(hourAgo);
        var hourPlusFormatted = $utilsViewService.formatDateTimeToSql(hourPlus);
        
        var horaFecha = '';
        if (programacion.hor_fin > programacion.hor_inicio) {
            horaFecha = programacion.fecha_programacion + ' ' + programacion.hor_fin;
        } else {
            var fecha = $utilsViewService.formatDateToJs(programacion.fecha_programacion);
            var nextFecha = new Date(fecha.getTime() + (day));
            var nextFechaFormatted = $utilsViewService.formatDateToSql(nextFecha);
            horaFecha = nextFechaFormatted + ' ' + programacion.hor_fin;
        }
        return horaFecha >= hourAgoFormatted && horaFecha <= hourPlusFormatted;
    };
    
    $scope.selectSupervisor = function(supervisorId) {
        if (supervisorId === '') {
            $scope.cuestionario.supervisor_dni = '';
            $scope.cuestionario.supervisor_nombres = '';
        } else {
            var supervisorSelected = $scope.supervisores.filter(function(supervisor) {
                return parseInt(supervisor.id) === parseInt(supervisorId);
            })[0];
            $scope.cuestionario.supervisor_dni = supervisorSelected.nro_documento;
            $scope.cuestionario.supervisor_nombres = supervisorSelected.trabajador;
        }
    };
    
    $scope.init();
});