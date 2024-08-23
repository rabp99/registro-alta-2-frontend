'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ProductRequestsSignatureCtrl
 * @description
 * # ProductRequestsSignatureCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ProductRequestsSignatureCtrl', function ($scope, $utilsViewService, $window, solicitudesService, tiposService, $firebaseObject, $firebaseArray, webSocketService) {
        $scope.init = function () {        
            $scope.worker_document_type = "DNI";
            $scope.worker_document_number = null;
            webSocketService.connect('ws://localhost:8766');
        };

        $scope.clearSignature = function () {
            $scope.version = 0;
        };

        var convertCanvasToImage = function (canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        };

        $scope.sendSignature = function() {
            var canvas = document.getElementById('signature');
            var img = convertCanvasToImage(canvas);
            var payload = {
                worker_document_type: $scope.worker_document_type,
                worker_document_number: $scope.worker_document_number,
                signature: img.src
            };

            payload = JSON.stringify(payload);
            webSocketService.sendMessage(payload);
            swal({
                title: "¡Operación exitosa!",
                text: "La firma fue enviada correctamente",
                icon: "success",
                closeOnClickOutside: false
            }).then(function(willProceed) {
                $window.location.reload();
            });
        }

        $scope.init();
    });