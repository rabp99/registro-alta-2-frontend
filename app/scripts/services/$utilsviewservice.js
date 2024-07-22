'use strict';

/**
 * @ngdoc service
 * @name registroAltaFrontendApp.$utilsViewService
 * @description
 * # $utilsViewService
 * Factory in the registroAltaFrontendApp.
 */
angular.module('registroAltaFrontendApp')
.factory('$utilsViewService', function () {
    return {
        enable: function(id) {
            $(id).removeClass('disabled');
            $(id).prop('disabled', false);
        },
        disable: function(id) {
            $(id).addClass('disabled');
            $(id).prop('disabled', true);
        },
        formatDateToSql: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return fecha.getFullYear() + '-' + this.strPad((fecha.getMonth() + 1), '00') + '-' + this.strPad(fecha.getDate(), '00');
        },
        formatDateToSql2: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return fecha.getFullYear() + this.strPad((fecha.getMonth() + 1), '00') + this.strPad(fecha.getDate(), '00');
        },
        strPad: function(str, pad) {
            return pad.substring(0, (pad.length - str.toString().length)) + str;
        },
        formatDateToJs: function(fecha) {
            var dateParts = fecha.split('-');
            var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
            return jsDate;
        },
        getErrors: function(errors) {
            var errorMessages = [];
            var properties = Object.getOwnPropertyNames(errors);
            angular.forEach(properties, function(v, k) {
                var property = Object.getOwnPropertyNames(errors[v])[0];
                errorMessages.push(errors[v][property]);
            });
            return errorMessages.join(', ');
        },
        differenceDates: function(fecha1, fecha2) {
            var date1 = this.formatDateToJs(fecha1);
            var date2 = this.formatDateToJs(fecha2);

            var diff = Math.floor(date2.getTime() - date1.getTime());
            var day = 1000 * 60 * 60 * 24;
            var daysCount = Math.floor(diff/day);

            var years = Math.floor(daysCount / 360);
            daysCount -= (years * 360);

            var months = Math.floor(daysCount / 30);
            daysCount -= (months * 30);

            var days = daysCount;

            return {
                years: years,
                months: months,
                days: days
            };
        },
        alterYearsDate: function(fecha, years) {
            var fechaJs = this.formatDateToJs(fecha);
            
            var year = fechaJs.getFullYear();
            var month = fechaJs.getMonth();
            var day = fechaJs.getDate();
            
            var fechaNew = new Date(year + years, month, day);
            
            return this.formatDateToSql(fechaNew);
        },
        formatDateTimeToSql: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return fecha.getFullYear() + '-' + this.strPad((fecha.getMonth() + 1), '00') + '-' + this.strPad(fecha.getDate(), '00') + ' ' + this.strPad(fecha.getHours(), '00') + ':' + this.strPad(fecha.getMinutes(), '00');
        },
        formatDateTimeToSqlWithoutSeconds: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return fecha.getFullYear() + '-' + this.strPad((fecha.getMonth() + 1), '00') + '-' + this.strPad(fecha.getDate(), '00') + ' ' + this.strPad(fecha.getHours(), '00') + ':' + this.strPad(fecha.getMinutes(), '00');
        },
        formatTimeToSql: function(fecha) {
            if (fecha === undefined) {
                return undefined;
            }
            return this.strPad(fecha.getHours(), '00') + ':' + this.strPad(fecha.getMinutes(), '00');
        },
        makeid: function(length) {
            var result           = [];
            var characters       = '123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            return result.join('');
        }
    };
});