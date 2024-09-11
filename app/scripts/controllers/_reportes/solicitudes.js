'use strict';

/**
 * @ngdoc function
 * @name registroAltaFrontendApp.controller:SolicitudesReporteCtrl
 * @description
 * # SolicitudesReporteCtrl
 * Controller of the registroAltaFrontendApp
 */
angular.module('registroAltaFrontendApp')
.controller('ReportesSolicitudesCtrl', function ($scope, solicitudesService, $utilsViewService, $filter, FileSaver, tiposService) {
    $scope.init = function() {
        $scope.inicio = true;
        
        $scope.tableSolicitudes = {
            loading: false,
            count: 0,
            page: 1,
            pagination: {
                itemsPerPage: 10,
                totalItems: 0
            },
            pageChanged: function(page) {
                this.page = page;
                getSolicitudes();
            }
        };
        
        $scope.tipo_epps = [{
                valor: "EPP 0",
                descripcion: "EPP 0"
            }, {
                valor: "EPP 2",
                descripcion: "EPP 2"
            }, {
                valor: "EPP 5",
                descripcion: "EPP 5"
            }, {
                valor: "EPP 8",
                descripcion: "EPP 8"
            }, {
                valor: "1",
                descripcion: "Reutilizable"
            }
        ];
        
        $scope.search = {
            dni: '',
            tipo_epp: ''
        };
        
        $scope.pre_fecha_inicio = new Date();
        $scope.pre_fecha_fin = new Date();
        
        $scope.solicitudes = [];
        getTipos();
        $scope.loading = false;
    };

    var getSolicitudes = function() {
        $scope.solicitudes = [];
        $scope.tableSolicitudes.loading = true;
        $scope.inicio = false;
        
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.report({
            dni: $scope.search.dni,
            tipo_epp: $scope.search.tipo_epp,
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || '',
            
            page: parseInt($scope.tableSolicitudes.page),
            itemsPerPage: $scope.tableSolicitudes.pagination.itemsPerPage
        },function(data) {
            $scope.solicitudes = data.solicitudes;
            
            $scope.tableSolicitudes.loading = false;
            $scope.tableSolicitudes.count = data.count;
            $scope.tableSolicitudes.pagination = data.pagination;
        });
    };
        
    $scope.searchSolicitudes = function() {
        $scope.tableSolicitudes.page = 1;
        getSolicitudes();
    };
    
    $scope.solicitudesExportToPdf = function(solicitud) {
        var today = new Date();
        var header1 = [];
        var row1 = [];
        row1.push({text: 'Fecha y Hora: ' + $filter('date')(today, 'dd/MM/yyyy hh:mm a', 'America/Lima'), fontSize: 9, alignment: 'right'});
        header1.push(row1);
        
        var datos = [];
        var row = [];
        row.push({text: 'Área de ingreso:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.area_ingreso, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Tipo de EPP:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.tipo_epp, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Cantidad:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.cantidad, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Fecha de Solicitud:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: $filter('date')(solicitud.fecha_solicitud, 'dd/MM/yyyy hh:mm a', 'America/Lima'), fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Fecha de Entrega:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: $filter('date')(solicitud.fecha_entrega, 'dd/MM/yyyy hh:mm a', 'America/Lima'), fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'DNI:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.programacion_dni_medico, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Turno:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.programacion_turno, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Estado:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.estado.descripcion, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Trabajador:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.profesional, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        row = [];
        row.push({text: 'Grupo Ocupacional:', fontSize: 9, alignment: 'left', bold: true});
        row.push({text: solicitud.grupo_ocupacional, fontSize: 9, alignment: 'left'});
        datos.push(row);
        
        var firmas = [];
        row = [];
        row.push({text: '', fontSize: 9, alignment: 'left'});
        row.push({text: 'Firma del Trabajador', fontSize: 9, alignment: 'center'});
        row.push({text: '', fontSize: 9, alignment: 'left'});
        firmas.push(row);
        
        var detalle = [];
        if (solicitud.reutilizables_solicitudes_detalles.length > 0) {
            row = [];
            row.push({text: 'Item', fontSize: 9, alignment: 'center', bold: true});
            row.push({text: 'Tipo', fontSize: 9, alignment: 'center', bold: true});
            row.push({text: 'N°', fontSize: 9, alignment: 'center', bold: true});
            detalle.push(row);
        
            var indumentaria = [];
            var reutilizablesSolicitudesDetalles = solicitud.reutilizables_solicitudes_detalles;

            var tipos = $scope.tipos;
            angular.forEach(tipos, function(tipo, k_tipo) {
                var found = false;
                angular.forEach(reutilizablesSolicitudesDetalles, function(reutilizablesSolicitudesDetalle, k_reutilizablesSolicitudesDetalles) {
                    if (tipo.id === reutilizablesSolicitudesDetalle.reutilizable.tipo_id && !found) {
                        indumentaria.push(reutilizablesSolicitudesDetalle.reutilizable.codigo);
                        var index = reutilizablesSolicitudesDetalles.indexOf(reutilizablesSolicitudesDetalle);
                        delete reutilizablesSolicitudesDetalles[index];
                        found = true;
                    }
                });
                if (!found) {
                    indumentaria.push('D');
                }
            });

            if (solicitud.cantidad === 2) {
                angular.forEach(tipos, function(tipo, k_tipo) {
                    var found = false;
                    angular.forEach(reutilizablesSolicitudesDetalles, function(reutilizablesSolicitudesDetalle, k_reutilizablesSolicitudesDetalles) {
                        if (tipo.id === reutilizablesSolicitudesDetalle.reutilizable.tipo_id && !found) {
                            indumentaria.push(reutilizablesSolicitudesDetalle.reutilizable.codigo);
                            var index = reutilizablesSolicitudesDetalles.indexOf(reutilizablesSolicitudesDetalle);
                            delete reutilizablesSolicitudesDetalles[index];
                            found = true;
                        }                   
                    });
                    if (!found) {
                        indumentaria.push('D');
                    }
                });
            }
            
            var i = 0;
            angular.forEach(tipos, function(tipo, key) {
                row = [];
                row.push({text: i + 1, fontSize: 9, alignment: 'center'});
                row.push({text: tipo.descripcion, fontSize: 9, alignment: 'center'});
                row.push({text: indumentaria[i], fontSize: 9, alignment: 'center'});
                detalle.push(row);
                i++;
            });
            
            if (solicitud.cantidad === 2) {
                angular.forEach(tipos, function(tipo, key) {
                    row = [];
                    row.push({text: i + 1, fontSize: 9, alignment: 'center'});
                    row.push({text: tipo.descripcion, fontSize: 9, alignment: 'center'});
                    row.push({text: indumentaria[i], fontSize: 9, alignment: 'center'});
                    detalle.push(row);
                    i++;
                });
            }
        } else {
            row = [];
            row.push({text: '', fontSize: 9, alignment: 'center', bold: true});
            row.push({text: '', fontSize: 9, alignment: 'center', bold: true});
            row.push({text: '', fontSize: 9, alignment: 'center', bold: true});
            detalle.push(row);
        }
        
        var docDefinition  = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [ 40, 40, 40, 40],
            info: {
                title: 'Detalle de Registro',
                author: 'Essalud',
                subject: 'Registro de ',
                keywords: 'essalud'
            },
            header: {
                columns: [{
                    image: 'data:image/jpeg;base64,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',
                    width: 150,
                    style: 'headerPDFImage'
                }, {
                    text: ''
                }, {
                    text: 'Oficina de Soporte Informático',
                    style: 'headerPDF'
                }]
            },
            footer: function(currentPage, pageCount) {
                return { text: currentPage.toString() + '/' + pageCount.toString(), alignment: 'center' };
            },
            content: [
                { text: 'Reporte de Solicitud de EPP', style: 'header' },
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: [ 496],
                        body: header1
                    }
                },
                {
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: [ 80, 200],
                        body: datos
                    }
                },
                { text: '', style: 'paragraph' },
                {
                    columns: [
                        { width: '*', text: '' },
                        {
                            width: 'auto',
                            layout: 'lightHorizontalLines',
                            table: {
                                widths: [ 30, 70, 60],
                                body: detalle,
                                alignment: "center"
                            }
                        },
                        { width: '*', text: '' }
                    ]
                },
                { text: '', style: 'paragraph' },
                { text: '', style: 'paragraph' },
                { text: '', style: 'paragraph' },
                { text: '', style: 'paragraph' },
                {
                    image: solicitud.firma || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAChCAIAAADyRhWQAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADA1LzIwLzIxcxTJswAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAHXSURBVHic7dMxAQAgDMAwwL/nTUYPEgV9emfmAJ1XB8DvTAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBAzIcRMCDETQsyEEDMhxEwIMRNCzIQQMyHETAgxE0LMhBBbUb0EP8MB+ucAAAAASUVORK5CYII=',
                    width: 180,
                    height: 80,
                    alignment: 'center'
                },
                {
                    canvas: [
                        { type: 'line', x1: 160, y1: 0, x2: 345, y2: 0, lineWidth: 1 }, //Up line
                    ]
                }, {
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: [ 165, 166, 165],
                        body: firmas
                    }
                }
            ],
            styles: {
                headerPDFImage: {
                    alignment: 'left',
                    margin: [35, 10, 15, 15]
                },
                headerPDF: {
                    alignment: 'left',
                    margin: [-18, 25, 15, 15]
                },
                contentImage: {
                    margin: [-45, 20, 0, 0]
                },
                header: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 30, 0, 20]
                },
                header2: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 10, 0, 10]
                },
                paragraph: {
                    fontSize: 11,
                    margin: [0, 4, 0, 8]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 11,
                    alignment: 'center'
                }
            }
        };
        pdfMake.createPdf(docDefinition).open();
    };
    
    $scope.exportExcel = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.exportExcel({
            dni: $scope.search.dni,
            tipo_epp: $scope.search.tipo_epp,
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        },function(data) {
            var datos = new Blob([data.data], { type: 'application/vnd.ms-excel;charset=utf-8' });
            var date = new Date();
            var filename = 'reporte_solicitudes_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.xls';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    $scope.exportCsv = function() {
        $scope.loading = true;
        var fecha_inicio = $utilsViewService.formatDateToSql($scope.pre_fecha_inicio);
        var fecha_fin = $utilsViewService.formatDateToSql($scope.pre_fecha_fin);
        
        solicitudesService.exportCsv({
            dni: $scope.search.dni,
            tipo_epp: $scope.search.tipo_epp,
            fecha_inicio: fecha_inicio || '',
            fecha_fin: fecha_fin || ''
        },function(data) {
            var datos = new Blob([data.data], { type: 'text/csv'});
            var date = new Date();
            var filename = 'reporte_solicitudes_' + date.getFullYear() + $utilsViewService.strPad((date.getMonth() + 1), '00') + $utilsViewService.strPad(date.getDate(), '00') + '.csv';
            FileSaver.saveAs(datos, filename, true);
            $scope.loading = false;
        });
    };
    
    var getTipos = function() {
        tiposService.getEnabled(function(data) {
            $scope.tipos = data.tipos;
        });
    };
    
    $scope.init();
});