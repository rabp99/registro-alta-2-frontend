'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProductRequestsAttendCtrl
 * @description
 * # ProductRequestsAttendCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProductRequestsAttendCtrl', function (
        $scope, 
        workersService,
        productRequestsService,
        $window, solicitudesService, tiposService, $firebaseObject, $firebaseArray, webSocketService,
    ) {
        $scope.init = function () {
            $scope.step = 1;
            $scope.worker_document_type = "DNI";
            $scope.worker_document_number = null;
            $scope.searchingWorker = false;
            $scope.selectedWorker = null;
            $scope.productRequests = [];
            $scope.selectedProductRequestCode = null;
            $scope.selectedProductRequest = null;

            $scope.signature = null;
            webSocketService.connect('ws://localhost:8766');
            webSocketService.onMessage = function(message) {
                $scope.signature = message;
            };
        };

        $scope.checkEnter = function(event) {
            if (event.which === 13) { // Enter key code
                $scope.searchWorker($scope.worker_document_type, $scope.worker_document_number);
            }
        };
    
        $scope.searchWorker = function(document_type, document_number) {
            $scope.searchingWorker = true;
            workersService.findByDocument({
                document_type: document_type,
                document_number: document_number,
            }, function (data) {
                $scope.searchingWorker = false;
                $scope.selectedWorker = data.worker;
            }, function (error) {
                $scope.searchingWorker = false;
                Materialize.toast(error.data.message, 4000);
            });
        }
    
        $scope.onSelectWorker = function (worker) {
            productRequestsService.getActiveByWorker({
                document_type: worker.document_type,
                document_number: worker.document_number,
            }, function (data) {
                $scope.productRequests = data.productRequests;
                $scope.step = 2;
            }, function (error) {
                Materialize.toast(error.data.message, 4000);
            });
        }
    
        $scope.backToSelectWorker = function() {
            $scope.selectedProductRequest = null;
            $scope.step = 1;
        }
    
        /*
        $scope.$watch('selectedProductRequestId', function(newVal) {
            if (newVal) {
                var found = $scope.productRequests.filter(function(productRequest) {
                    return productRequest.id == newVal;
                });
                if (found) {
                    $scope.selectedProductRequest = found[0];
                }
            }
        });*/
    
        /*
        $scope.search = function(product_request) {
            $scope.searchingWorker = true;
            console.log(product_request);
            console.log('show grupo ocupacional y medical speciality');
            console.log('paso 2 seleccionar el lugar de trabajo');
            console.log('paso 3 seleccionar area');
            console.log('paso 4 mostrar los productos que se le entregarán y todos los datos y habilitar botón Registrar');
            $scope.searching = 'find_replace';
            $utilsViewService.disable('.btn-search');
            $scope.worker.id = 1;
            $scope.worker = {
                id: 1,
                full_name: 'JIMÉNEZ MENDOZA, MIGUEL EDUARDO',
                worker_occupational_group: {
                    description: "MÉÐICO"
                },
                worker_medical_speciality: {
                    description: "CIRUGIA GENERAL"
                }
            }
            $scope.searchingWorker = false;
        }
        */

        $scope.onSelectProductRequest = function(productRequestId) {
            console.log(productRequestId);
            $scope.step = 3;
        }

        $scope.onSign = function() {
            $scope.step = 4;
        }

        $scope.onRadioChange = function(selectedProductRequestCode) {
            if (selectedProductRequestCode) {
                var found = $scope.productRequests.filter(function(productRequest) {
                    return productRequest.year == selectedProductRequestCode.year && productRequest.number == selectedProductRequestCode.number;
                });
                if (found) {
                    $scope.selectedProductRequest = found[0];
                }
            }
        };

        $scope.init();
    });