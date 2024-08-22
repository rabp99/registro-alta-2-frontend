'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.webSocketService
 * @description
 * # webSocketService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
    .factory('webSocketService', function ($rootScope) {
        var service = {};
        var socket;

        service.connect = function(url) {
            socket = new WebSocket(url);

            socket.onopen = function() {
                console.log('WebSocket connected');
            };

            socket.onmessage = function(event) {
                $rootScope.$apply(function() {
                    service.onMessage(event.data);
                });
            };

            socket.onerror = function(error) {
                console.error('WebSocket error:', error);
            };

            socket.onclose = function() {
                console.log('WebSocket connection closed');
            };
        };

        service.sendMessage = function(message) {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(message);
            } else {
                console.error('WebSocket is not open');
            }
        };

        service.onMessage = function(message) {
            // Override this function in your controller to handle incoming messages
            console.log('Received:', message);
        };

        service.disconnect = function() {
            if (socket) {
                socket.close();
            }
        };

        return service;
    });