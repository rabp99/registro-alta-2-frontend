'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProductRequestsRegisterCtrl
 * @description
 * # ProductRequestsRegisterCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ProductRequestsRegisterCtrl', function (
    $scope, 
    workersService, 
    workplacesService, 
    workAreasService,
    workAreaDetailsService,
    kitsWorkAreaDetailsService,
    productRequestsService,
    $window,
    $timeout
) {
    $scope.init = function() {
        $scope.step = 1;
        $scope.worker_document_type = "DNI";
        $scope.worker_document_number = null;
        $scope.selectedWorker = null;

        $scope.selectedWorkplaceId = null;
        $scope.selectedWorkplace = null;

        $scope.selectedWorkAreaId = null;
        $scope.selectedWorkArea = null;

        $scope.workAreaDetailId = null;
        $scope.workAreaDetail = null;
        
        $scope.workplaces = [];
        $scope.workAreas = [];
        $scope.workAreaDetails = [];

        $scope.searchingWorker = false;
        $scope.kits = [];
    }

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
        workplacesService.getListByWorkerType({
            worker_type: worker.worker_occupational_group.type
        }, function (data) {
            $scope.workplaces = data.workplaces;
            $scope.step = 2;
        }, function (error) {
            Materialize.toast(error.data.message, 4000);
        });
    }

    $scope.backToSelectWorker = function() {
        $scope.selectedWorkplaceId = null;
        $scope.selectedWorkplace = null;
        $scope.step = 1;
    }

    $scope.onSelectWorkplace = function (selectedWorkplace, worker) {
        workAreasService.getListByWorkplaceAndWorkerType({
            workplace_id: selectedWorkplace.id,
            worker_type: worker.worker_occupational_group.type
        }, function (data) {
            $scope.workAreas = data.workAreas;
            $scope.step = 3;
        }, function (error) {
            Materialize.toast(error.data.message, 4000);
        });
    }

    $scope.backToSelectWorkplace = function() {
        $scope.selectedWorkAreaId = null;
        $scope.selectedWorkArea = null;
        $scope.workAreaDetails = [];
        $scope.selectedWorkAreaDetail = null;
        $scope.step = 2;
    }

    $scope.backToSelectWorkArea = function() {
        $scope.step = 3;
    }
    
    $scope.onSelectWorkArea = function(selectedWorkAreaId) {
        workAreaDetailsService.getByWorkArea({
            work_area_id: selectedWorkAreaId
        }, function (data) {
            $scope.workAreaDetails = data.workAreaDetails;
            if ($scope.workAreaDetails.length === 1) {
                $scope.selectedWorkAreaDetail = $scope.workAreaDetails[0];
                fixTextarea()
            }
        }, function (error) {
            Materialize.toast(error.data.message, 4000);
        })
    }

    $scope.selectWorkAreaDetail = function(selectedWorkAreaDetailId) {
        var found = $scope.workAreaDetails.filter(function(workAreaDetail) {
            return workAreaDetail.id == selectedWorkAreaDetailId;
        });
        if (found) {
            $scope.selectedWorkAreaDetail = found[0];
        }
    }

    $scope.onSelectWorkAreaDetail = function(selectedWorkAreaDetail) {
        kitsWorkAreaDetailsService.getKitsByWorkAreaDetail({
            work_area_detail_id: selectedWorkAreaDetail.id
        }, function (data) {
            $scope.kits = data.kits;
            $scope.step = 4;
        }, function (error) {
            Materialize.toast(error.data.message, 4000);
        })
    }

    $scope.$watch('selectedWorkplaceId', function(newVal) {
        if (newVal) {
            var found = $scope.workplaces.filter(function(workplace) {
                return workplace.id == newVal;
            });
            if (found) {
                $scope.selectedWorkplace = found[0];
            }
        }
    });

    $scope.$watch('selectedWorkAreaId', function(newVal) {
        if (newVal) {
            var found = $scope.workAreas.filter(function(workArea) {
                return workArea.id == newVal;
            });
            if (found) {
                $scope.selectedWorkArea = found[0];
            }
        }
    });

    $scope.save = function() {
        var kitsProductRequests = $scope.kits.map(function(kit) {
            var productRequestDetails = kit.products.map(function (product) {
                return {
                    product_id: product.id,
                    amount: product.amount
                };
            });

            return {
                kit_id: kit.id,
                amount: kit.amount,
                product_request_details: productRequestDetails
            };
        });
        var productRequest = {
            document_type: $scope.selectedWorker.document_type,
            document_number: $scope.selectedWorker.document_number,
            work_area_detail_id: $scope.selectedWorkAreaDetail.id,
            kits_product_requests: kitsProductRequests
        };

        productRequestsService.save(productRequest, function (data) {
            swal({
                title: "¡Operación exitosa!",
                text: data.message,
                icon: "success",
                closeOnClickOutside: false
            }).then(function(willProceed) {
                $window.location.reload();
            });
        }, function (error) {
            Materialize.toast(error.data.message, 4000);
        });
    }

    var fixTextarea = function() {
        $timeout(function () {
            var inputElement = document.querySelector('#selected_work_area_detail_description'); // Reemplaza '#miInput' con el selector correcto
            
            var event = new KeyboardEvent('keydown', {
                key: 'ArrowUp',
                code: 'ArrowUp',
                keyCode: 40,
                which: 40,
                bubbles: true
            });
        
            inputElement.dispatchEvent(event);
            inputElement.dispatchEvent(event);
            inputElement.dispatchEvent(event);
        }, 0);    
    }

    $scope.init();
});