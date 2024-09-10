'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:WorkersEditCtrl
 * @description
 * # WorkersEditCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('WorkersEditCtrl', function (
        $scope, 
        workersService,
        $state,
        workerOccupationalGroupsService,
        workerConditionsService,
        workerMedicalSpecialitiesService,
        $utilsViewService,
        $stateParams,
        $q
    ) {
        var first = true;
        $scope.init = function () {
            $scope.worker = {};

            $scope.worker_occupational_groups = [];
            $scope.worker_occupational_group_empty = "SELECCIONE UN GRUPO OCUPACIONAL";

            $scope.worker_conditions = [];
            $scope.worker_condition_empty = "SELECCIONE UNA CONDICIÓN LABORAL";

            $scope.worker_medical_specialities = [];
            $scope.worker_medical_speciality_empty = "SELECCIONE UNA ESPECIALIDAD";

            $scope.loading = false;

            getWorkerOccupationalGroups().then(function() {
                getWorkerConditions().then(function() {
                    getWorkerMedicalSpecialities().then(function() {
                        getWorker();
                    });
                });
            });
        };

        var getWorker = function() {
            var documentType = $stateParams.document_type;
            var documentNumber = $stateParams.document_number;
            workersService.findByDocument({
                document_type: documentType,
                document_number: documentNumber
            }, function (data) {
                $scope.worker = data.worker;
            }, function (error) {
                Materialize.toast(error.data.message, 4000);
                $state.go('admin.workersIndex');
            });
        };

        $scope.editWorker = function (worker) {
            if (!validate()) {
                return;
            }
            
            $utilsViewService.disable('#editWorkerBtn');

            $scope.loading = true;
            var workerPayload = worker;
            delete workerPayload.worker_medical_speciality;
            delete workerPayload.worker_occupational_group;
            workersService.update({
                document_type: worker.document_type,
                document_number: worker.document_number
            }, worker, function (data) {
                $scope.loading = false;
                swal({
                    title: "¡Operación exitosa!",
                    text: data.message,
                    icon: "success",
                    closeOnClickOutside: false
                }).then(function(willProceed) {
                    $utilsViewService.enable('#editWorkerBtn');
                    $state.go('admin.workersIndex');
                });
            }, function (err) {
                $utilsViewService.enable('#editWorkerBtn');
                Materialize.toast(err.data.message, 4000);
            });
        };

        var getWorkerOccupationalGroups = function () {
            return $q(function(resolve, reject) {
                workerOccupationalGroupsService.getList(function (data) {
                    $scope.worker_occupational_groups = data.worker_occupational_groups;
                    resolve();
                });
            });
        };

        var getWorkerConditions = function () {
            return $q(function(resolve, reject) {
                workerConditionsService.getList(function (data) {
                    $scope.worker_conditions = data.worker_conditions;
                    resolve();
                });
            });
        }

        var getWorkerMedicalSpecialities = function () {
            return $q(function(resolve, reject) {
                workerMedicalSpecialitiesService.getList(function (data) {
                    $scope.worker_medical_specialities = data.worker_medical_specialities;
                    resolve();
                });
            });
        }

        var validate = function() {
            if (!$scope.worker.worker_occupational_group_id) {
                Materialize.toast("Seleccione el Grupo Ocupacional", 4000);
                return false;
            }
            if (!$scope.worker.worker_condition_id) {
                Materialize.toast("Seleccione la Condición Laboral", 4000);
                return false;
            }
            if (!$scope.worker.worker_medical_speciality_id) {
                Materialize.toast("Seleccione la Especialidad", 4000);
                return false;
            }
            return true;
        }

        $scope.$watch('worker.worker_occupational_group_id', function(newVal) {
            if (newVal) {
                var found = $scope.worker_occupational_groups.filter(function(workerOccupationalGroup) {
                    return workerOccupationalGroup.id == newVal;
                });
                if (found) {
                    if (first) {
                        first = false;
                    } else {
                        found = found[0];
                        if (found.type === "ASISTENCIAL") {
                            $scope.worker.type_asistencial = true;
                            $scope.worker.type_administrativo = false;
                        } else if (found.type === "ADMINISTRATIVO") {
                            $scope.worker.type_asistencial = false;
                            $scope.worker.type_administrativo = true;
                        }
                    }
                }
            }
        });
    
        $scope.init();
    });