'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:WorkersAddCtrl
 * @description
 * # WorkersAddCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('WorkersAddCtrl', function (
        $scope, workersService,
        $state,
        workerOccupationalGroupsService,
        workerConditionsService,
        workerMedicalSpecialitiesService
    ) {
        $scope.init = function () {
            $scope.newWorker = {};
            $scope.newWorker.document_type = "DNI";
            $scope.newWorker.worker_occupational_group_id = "";
            $scope.newWorker.belongs_other_cas = "NO";

            $scope.worker_occupational_groups = [];
            $scope.worker_occupational_group_empty = "SELECCIONE UN GRUPO OCUPACIONAL";

            $scope.worker_conditions = [];
            $scope.worker_condition_empty = "SELECCIONE UNA CONDICIÓN LABORAL";

            $scope.worker_medical_specialities = [];
            $scope.worker_medical_speciality_empty = "SELECCIONE UNA ESPECIALIDAD";

            $scope.loading = false;
            getWorkerOccupationalGroups();
            getWorkerConditions();
            getWorkerMedicalSpecialities();
        };

        $scope.addWorker = function (newWorker) {
            $scope.loading = true;
            workersService.save(newWorker, function (data) {
                $state.go('admin.workersIndex');
                $scope.loading = false;
                Materialize.toast(data.message, 4000);
            }, function (err) {
                Materialize.toast(err.data.message, 4000);
            });
        };

        var getWorkerOccupationalGroups = function () {
            workerOccupationalGroupsService.getList(function (data) {
                $scope.worker_occupational_groups = data.worker_occupational_groups;
            });
        };

        var getWorkerConditions = function () {
            workerConditionsService.getList(function (data) {
                $scope.worker_conditions = data.worker_conditions;
            });
        }

        var getWorkerMedicalSpecialities = function () {
            workerMedicalSpecialitiesService.getList(function (data) {
                $scope.worker_medical_specialities = data.worker_medical_specialities;
            });
        }

        $scope.init();
    });