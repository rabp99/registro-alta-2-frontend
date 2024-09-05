'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:ConfigurationCtrl
 * @description
 * # ConfigurationCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('ConfigurationCtrl', function (
        $scope,
        parametersService,
        $window,
        $utilsViewService
    ) {
        $scope.init = function () {
            $scope.responsible = {};
            parametersService.getByKeys({
                keys: [
                    'responsible.full_name',
                    'responsible.job_position', 
                    'responsible.signature'
                ]
            }, function (data) {
                $scope.responsible.full_name = data.values['responsible.full_name'];
                $scope.responsible.job_position = data.values['responsible.job_position'];
                var signature = data.values['responsible.signature'];

                setCanvasFromBase64(signature);
            }, function (error) {
                Materialize.toast(error.data.message, 4000);
            });
        };

        $scope.clearSignature = function () {
            if ($scope.version === 0) {
                var canvas = document.getElementById('signature');
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            $scope.version = 0;
        };

        var setCanvasFromBase64 = function(base64Image) {
            var canvas = document.getElementById('signature');
            var context = canvas.getContext('2d');
        
            var image = new Image();
            image.onload = function() {
              context.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
            image.src = base64Image;
        };

        var convertCanvasToImage = function (canvas) {
            var image = new Image();
            image.src = canvas.toDataURL('image/png');
            return image;
        };

        $scope.save = function() {
            $utilsViewService.disable('#saveBtn');
            var canvas = document.getElementById('signature');
            var img = convertCanvasToImage(canvas);
            
            parametersService.saveConfiguration({
                responsibleFullName: $scope.responsible.full_name,
                responsibleJobPosition: $scope.responsible.job_position,
                responsibleSignature: img.src
            }, function (data) {
                swal({
                    title: '¡Operación exitosa!',
                    text: data.message,
                    icon: 'success',
                    closeOnClickOutside: false
                }).then(function(willProceed) {
                    $window.location.reload();
                    $utilsViewService.enable('#saveBtn');
                });
            }, function (error) {
                Materialize.toast(error.data.message, 4000);
                $utilsViewService.enable('#saveBtn');
            });

        };

        $scope.init();
    });