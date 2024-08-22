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
            $scope.document_type = "DNI";
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
            console.log(img.src);
            webSocketService.sendMessage(img.src);
        }

        $scope.init();
    });