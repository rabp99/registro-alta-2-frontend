'use strict';

/**
 * @ngdoc overview
 * @name registroAltaFrontendApp
 * @description
 * # registroAltaFrontendApp
 *
 * Main module of the application.
 */
angular
    .module('registroAltaFrontendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ui.materialize',
        'ngFileUpload',
        'pw.canvas-painter',
        'checklist-model',
        'firebase',
        'ngFileSaver'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('oauthHttpInterceptor');
        var config = {
            apiKey: 'AIzaSyAnnhkAPF_Jm7T9mOW03WjxtjaE3NPDk7g',
            authDomain: 'ralta-essalud.firebaseapp.com"',
            databaseURL: 'https://ralta-essalud-default-rtdb.firebaseio.com'
        };
        firebase.initializeApp(config);

        var adminState = {
            name: 'admin',
            abstract: true,
            templateUrl: 'admin.html',
            controller: 'AdminCtrl',
            controllerAs: 'admin'
        };

        var publicState = {
            name: 'public',
            abstract: true,
            templateUrl: 'public.html',
            controller: 'PublicCtrl',
            controllerAs: 'public'
        };

        var loginState = {
            name: 'login',
            abstract: true,
            templateUrl: 'login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        };

        var usersLoginState = {
            name: 'login.login',
            url: '/login',
            templateUrl: 'views/users/login.html',
            controller: 'UsersLoginCtrl',
            controllerAs: 'usersLogin',
            title: 'Login'
        };

        var adminMainState = {
            name: 'admin.main',
            url: '/admin',
            templateUrl: 'views/admin/main.html',
            controller: 'AdminMainCtrl',
            controllerAs: 'adminMain',
            title: 'Inicio'
        };

        var usersChangepasswordState = {
            name: 'admin.usersChangepassword',
            url: '/users/changepassword',
            templateUrl: 'views/users/changepassword.html',
            controller: 'UsersChangepasswordCtrl',
            controllerAs: 'usersChangepassword',
            title: 'Cambio de Contraseña'
        };

        var usersIndexState = {
            name: 'admin.usersIndex',
            url: '/users',
            templateUrl: 'views/users/index.html',
            controller: 'UsersIndexCtrl',
            controllerAs: 'usersIndex',
            title: 'Lista de Usuarios'
        };

        var usersAddState = {
            name: 'admin.usersAdd',
            url: '/users/add',
            templateUrl: 'views/users/add.html',
            controller: 'UsersAddCtrl',
            controllerAs: 'usersAdd',
            title: 'Nuevo Usuario'
        };

        var usersEditState = {
            name: 'admin.usersEdit',
            url: '/users/edit/:id',
            templateUrl: 'views/users/edit.html',
            controller: 'UsersEditCtrl',
            controllerAs: 'usersEdit',
            title: 'Modificar Usuario'
        };

        var usersViewState = {
            name: 'admin.usersView',
            url: '/users/:id',
            templateUrl: 'views/users/view.html',
            controller: 'UsersViewCtrl',
            controllerAs: 'usersView',
            title: 'Ver Usuario'
        };

        var programacionesLoadState = {
            name: 'admin.programacionesLoad',
            url: '/programaciones/load',
            templateUrl: 'views/programaciones/load.html',
            controller: 'ProgramacionesLoadCtrl',
            controllerAs: 'programacionesLoad',
            title: 'Cargar Datos'
        };

        var programacionesSolicitudState = {
            name: 'public.programacionesSolicitud',
            url: '/solicitud',
            templateUrl: 'views/programaciones/solicitud.html',
            controller: 'ProgramacionesSolicitudCtrl',
            controllerAs: 'programacionesSolicitud',
            title: 'Registrar Solicitud'
        };

        var programacionesExternoState = {
            name: 'public.programacionesExterno',
            url: '/solicitud/externo',
            templateUrl: 'views/programaciones/externo.html',
            controller: 'ProgramacionesExternoCtrl',
            controllerAs: 'programacionesExterno',
            title: 'Registrar Solicitud de Externo'
        };

        var programacionesEntregaState = {
            name: 'admin.programacionesEntrega',
            url: '/entrega',
            templateUrl: 'views/programaciones/entrega.html',
            controller: 'ProgramacionesEntregaCtrl',
            controllerAs: 'programacionesEntrega',
            title: 'Registrar Entrega'
        };

        var programacionesSalidaState = {
            name: 'public.programacionesSalida',
            url: '/salida',
            templateUrl: 'views/programaciones/salida.html',
            controller: 'ProgramacionesSalidaCtrl',
            controllerAs: 'programacionesSalida',
            title: 'Registrar Salida'
        };

        var programacionesEntradaState = {
            name: 'public.programacionesEntrada',
            url: '/entrada',
            templateUrl: 'views/programaciones/entrada.html',
            controller: 'ProgramacionesEntradaCtrl',
            controllerAs: 'programacionesEntrada',
            title: 'Registrar Entrada'
        };

        var reportesSolicitudesState = {
            name: 'admin.reportesSolicitudes',
            url: '/reportes/solicitudes',
            templateUrl: 'views/reportes/solicitudes.html',
            controller: 'ReportesSolicitudesCtrl',
            controllerAs: 'reportesSolicitudes',
            title: 'Reporte de Solicitudes'
        };

        var reportesIndumentariaState = {
            name: 'admin.reportesIndumentaria',
            url: '/reportes/indumentaria',
            templateUrl: 'views/reportes/indumentaria.html',
            controller: 'ReportesIndumentariaCtrl',
            controllerAs: 'reportesIndumentaria',
            title: 'Reporte de Indumentaria'
        };

        var reportesMarcacionesState = {
            name: 'admin.reportesMarcaciones',
            url: '/reportes/marcaciones',
            templateUrl: 'views/reportes/marcaciones.html',
            controller: 'ReportesMarcacionesCtrl',
            controllerAs: 'reportesMarcaciones',
            title: 'Reporte de Marcaciones'
        };

        var reportesProductosState = {
            name: 'admin.reportesProductos',
            url: '/reportes/productos',
            templateUrl: 'views/reportes/productos.html',
            controller: 'ReportesProductosCtrl',
            controllerAs: 'reportesProductos',
            title: 'Reporte de Productos'
        };

        var vestidoresRegisterState = {
            name: 'admin.vestidoresRegister',
            url: '/vestidores/register',
            templateUrl: 'views/vestidores/register.html',
            controller: 'VestidoresRegisterCtrl',
            controllerAs: 'VestidoresRegister',
            title: 'Registro en Vestidores'
        };

        var lavanderiaRegisterState = {
            name: 'admin.lavanderiaRegister',
            url: '/lavanderia/register',
            templateUrl: 'views/lavanderia/register.html',
            controller: 'LavanderiaRegisterCtrl',
            controllerAs: 'LavanderiaRegister',
            title: 'Registro en Lavandería'
        };

        var solicitudesAddState = {
            name: 'admin.solicitudesAdd',
            url: '/solicitudes/add',
            templateUrl: 'views/solicitudes/add.html',
            controller: 'SolicitudesAddCtrl',
            controllerAs: 'solicitudesAdd',
            title: 'Nueva Solicitud'
        };

        var solicitudesFirmaState = {
            name: 'public.solicitudesFirma',
            url: '/solicitudes/firma',
            templateUrl: 'views/solicitudes/firma.html',
            controller: 'SolicitudesFirmaCtrl',
            controllerAs: 'solicitudesFirma',
            title: 'Firmar Solicitud'
        };

        var solicitudesDevolverState = {
            name: 'admin.solicitudesDevolver',
            url: '/solicitudes/devolver',
            templateUrl: 'views/solicitudes/devolver.html',
            controller: 'SolicitudesDevolverCtrl',
            controllerAs: 'solicitudesDevolver',
            title: 'Registrar Devolución'
        };

        var productosEntregarState = {
            name: 'admin.productosEntregar',
            url: '/productos/entregar',
            templateUrl: 'views/productos/entregar.html',
            controller: 'ProductosEntregarCtrl',
            controllerAs: 'productosEntregar',
            title: 'Productos Entregar'
        };

        var indumentariaLiberarState = {
            name: 'admin.indumentariaLiberar',
            url: '/indumentaria/liberar',
            templateUrl: 'views/indumentaria/liberar.html',
            controller: 'IndumentariaLiberarCtrl',
            controllerAs: 'indumentariaLiberar',
            title: 'Liberar Indumentaria'
        };

        var lavanderiaRegularizarState = {
            name: 'admin.lavanderiaRegularizar',
            url: '/lavanderia/regularizar',
            templateUrl: 'views/lavanderia/regularizar.html',
            controller: 'LavanderiaRegularizarCtrl',
            controllerAs: 'lavanderiaRegularizar',
            title: 'Regularizar en Lavandería'
        };

        var productosIndexState = {
            name: 'admin.productosIndex',
            url: '/mantenimiento/productos',
            templateUrl: 'views/productos/index.html',
            controller: 'ProductosIndexCtrl',
            controllerAs: 'productosIndex',
            title: 'Mantenimiento de Productos'
        };

        var reportesAnexosState = {
            name: 'admin.reportesAnexos',
            url: '/reportes/anexos',
            templateUrl: 'views/reportes/anexos.html',
            controller: 'ReportesAnexosCtrl',
            controllerAs: 'reportesAnexos',
            title: 'Reporte de Anexos'
        };

        var reportesCuadroResumenState = {
            name: 'admin.reportesCuadroResumen',
            url: '/reportes/cuadro_resumen',
            templateUrl: 'views/reportes/cuadro_resumen.html',
            controller: 'ReportesCuadroResumenCtrl',
            controllerAs: 'reportesCuadroResumen',
            title: 'Cuadro Resumen'
        };

        var colaboradoresIndexState = {
            name: 'admin.colaboradoresIndex',
            url: '/colaboradores/',
            templateUrl: 'views/colaboradores/index.html',
            controller: 'ColaboradoresIndexCtrl',
            controllerAs: 'colaboradoresIndex',
            title: 'Colaboradores'
        };

        var colaboradoresAddState = {
            name: 'admin.colaboradoresAdd',
            url: '/colaboradores/add',
            templateUrl: 'views/colaboradores/add.html',
            controller: 'ColaboradoresAddCtrl',
            controllerAs: 'colaboradoresAdd',
            title: 'Nuevo Colaborador'
        };

        var reportesReporteSemanalState = {
            name: 'admin.reportesReporteSemanal',
            url: '/reportes/reporte_semanal',
            templateUrl: 'views/reportes/reporte_semanal.html',
            controller: 'ReportesReporteSemanalCtrl',
            controllerAs: 'reportesReporteSemanal',
            title: 'Reporte Semanal'
        };

        var supervisoresIndexState = {
            name: 'admin.supervisoresIndex',
            url: '/supervisores',
            templateUrl: 'views/supervisores/index.html',
            controller: 'SupervisoresIndexCtrl',
            controllerAs: 'supervisoresIndex',
            title: 'Lista de Supervisores'
        };

        var supervisoresAddState = {
            name: 'admin.supervisoresAdd',
            url: '/supervisores/add',
            templateUrl: 'views/supervisores/add.html',
            controller: 'SupervisoresAddCtrl',
            controllerAs: 'supervisoresAdd',
            title: 'Nuevo Supervisor'
        };

        var solicitudesIndexState = {
            name: 'admin.solicitudesIndex',
            url: '/solicitudes',
            templateUrl: 'views/solicitudes/index.html',
            controller: 'SolicitudesIndexCtrl',
            controllerAs: 'solicitudesIndex',
            title: 'Lista de Solicitudes'
        };

        $stateProvider.state(adminState);
        $stateProvider.state(publicState);
        $stateProvider.state(loginState);
        $stateProvider.state(usersLoginState);
        $stateProvider.state(adminMainState);
        $stateProvider.state(usersChangepasswordState);
        $stateProvider.state(usersIndexState);
        $stateProvider.state(usersAddState);
        $stateProvider.state(usersEditState);
        $stateProvider.state(usersViewState);
        // $stateProvider.state(programacionesLoadState);
        $stateProvider.state(programacionesSolicitudState);
        $stateProvider.state(programacionesExternoState);
        $stateProvider.state(programacionesEntregaState);
        $stateProvider.state(programacionesSalidaState);
        $stateProvider.state(programacionesEntradaState);
        $stateProvider.state(reportesSolicitudesState);
        $stateProvider.state(reportesIndumentariaState);
        $stateProvider.state(reportesMarcacionesState);
        $stateProvider.state(reportesProductosState);
        $stateProvider.state(reportesCuadroResumenState);
        $stateProvider.state(vestidoresRegisterState);
        $stateProvider.state(lavanderiaRegisterState);
        $stateProvider.state(solicitudesAddState);
        $stateProvider.state(solicitudesFirmaState);
        $stateProvider.state(solicitudesDevolverState);
        $stateProvider.state(productosEntregarState);
        $stateProvider.state(indumentariaLiberarState);
        $stateProvider.state(lavanderiaRegularizarState);
        $stateProvider.state(productosIndexState);
        $stateProvider.state(colaboradoresIndexState);
        $stateProvider.state(colaboradoresAddState);
        $stateProvider.state(reportesAnexosState);
        $stateProvider.state(reportesReporteSemanalState);
        $stateProvider.state(supervisoresIndexState);
        $stateProvider.state(supervisoresAddState);
        $stateProvider.state(solicitudesIndexState);
        $urlRouterProvider.otherwise('/admin');
    })
    .run(function ($rootScope, $transitions, $state, $window, $cookies) {
        $rootScope.logged = false;

        if ($cookies.get('registro-alta-token')) {
            $rootScope.logged = true;
            $rootScope.user = $cookies.getObject('registro-alta-user');
        } else {
            $rootScope.logged = false;
        }

        $rootScope.$state = $state;

        $transitions.onSuccess({}, function () {
            $rootScope.title = $state.current.title;
            $window.scrollTo(0, 0);
        });

        $transitions.onStart({}, function (trans) {
            var $state = trans.router.stateService;
            if (!$rootScope.logged) {
                if (trans.$to().name !== 'login.login' &&
                    trans.$to().name !== 'public.programacionesSolicitud' &&
                    trans.$to().name !== 'public.solicitudesFirma' &&
                    trans.$to().name !== 'public.programacionesExterno' &&
                    trans.$to().name !== 'public.programacionesSalida' &&
                    trans.$to().name !== 'public.programacionesEntrada') {
                    return $state.target('login.login');
                }
            }
        });

        $rootScope.logout = function () {
            if (confirm('¿Está seguro de cerrar sesión?')) {
                $cookies.remove('registro-alta-user');
                $cookies.remove('registro-alta-token');
                $rootScope.user = undefined;
                $rootScope.logged = false;
                $state.go('public.login', {}, { reload: true });
                $window.location.reload();
            }
        };

    });
