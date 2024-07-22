'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SolicitudesFirmaCtrl
 * @description
 * # SolicitudesFirmaCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
    .controller('SolicitudesFirmaCtrl', function ($scope, $utilsViewService, $firebaseObject, $window) {
        $scope.init = function () {
            $scope.codigo = '';
            $scope.solicitudesFirmaWidth = 1200;
            $scope.version = 0;
            resize(700, 1200, 280);
            $scope.firma = {};
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

        $scope.searchCodigo = function (codigo) {
            var today = new Date();
            var id = codigo + $utilsViewService.formatDateToSql2(today);

            firebase.auth().signInAnonymously().then(function () {
                var ref = firebase.database().ref().child('firmas/' + id);
                $scope.firma = $firebaseObject(ref);
                $scope.firma.$loaded().then(function () {
                    if ($scope.firma.codigo === undefined) {
                        Materialize.toast('Código no encontrado', 4000);
                    } else {
                        Materialize.toast('Código encontrado', 4000);
                    }
                }, function (error) {
                    Materialize.toast('Error', 4000);
                });
            }).catch(function (error) {
                console.error('Error al autenticar anónimamente:', error);
            });
        };

        var convertCanvasToImage = function (canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        };

        $scope.sendFirma = function () {
            var canvas = document.getElementById('solicitudesFirma');
            var img = convertCanvasToImage(canvas);
            $scope.firma.valor = img.src;
            $scope.firma.$save().then(function () {
                Materialize.toast('Firma enviada', 4000);
                $scope.init();
            }, function (error) {
                Materialize.toast('Error', 4000);
            });
        };

        $scope.init();
    });