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
    ])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('oauthHttpInterceptor');

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
            url: '/usuarios/cambiar-contraseña',
            templateUrl: 'views/users/changepassword.html',
            controller: 'UsersChangepasswordCtrl',
            controllerAs: 'usersChangepassword',
            title: 'Cambio de Contraseña'
        };

        var usersIndexState = {
            name: 'admin.usersIndex',
            url: '/usuarios',
            templateUrl: 'views/users/index.html',
            controller: 'UsersIndexCtrl',
            controllerAs: 'usersIndex',
            title: 'Lista de Usuarios'
        };

        var usersAddState = {
            name: 'admin.usersAdd',
            url: '/usuarios/nuevo',
            templateUrl: 'views/users/add.html',
            controller: 'UsersAddCtrl',
            controllerAs: 'usersAdd',
            title: 'Nuevo Usuario'
        };

        var usersEditState = {
            name: 'admin.usersEdit',
            url: '/usuarios/editar/:id',
            templateUrl: 'views/users/edit.html',
            controller: 'UsersEditCtrl',
            controllerAs: 'usersEdit',
            title: 'Modificar Usuario'
        };

        var usersViewState = {
            name: 'admin.usersView',
            url: '/usuarios/:id',
            templateUrl: 'views/users/view.html',
            controller: 'UsersViewCtrl',
            controllerAs: 'usersView',
            title: 'Ver Usuario'
        };

        var reportsProductRequestRecordsState = {
            name: 'admin.productRequestRecords',
            // url: '/reports/product-request-records',
            url: '/reportes/registro-entrega',
            templateUrl: 'views/reports/product-request-records.html',
            controller: 'ReportsProductRequestRecordsCtrl',
            controllerAs: 'reportsProductRequestRecords',
            title: 'Registro de Entrega'
        };

        var reportsReportRangeDates = {
            name: 'admin.reportRangeDates',
            // url: '/reports/range-dates',
            url: '/reportes/rango-fechas',
            templateUrl: 'views/reports/range-dates.html',
            controller: 'ReportsRangeDatesCtrl',
            controllerAs: 'reportsRangeDates',
            title: 'Reporte por Rango de Fechas'
        };
        
        var workersIndexState = {
            name: 'admin.workersIndex',
            // url: '/workers/',
            url: '/colaboradores/',
            templateUrl: 'views/workers/index.html',
            controller: 'WorkersIndexCtrl',
            controllerAs: 'workersIndex',
            title: 'Colaboradores'
        };

        var workersAddState = {
            name: 'admin.workersAdd',
            // url: '/workers/add',
            url: '/colaboradores/nuevo',
            templateUrl: 'views/workers/add.html',
            controller: 'WorkersAddCtrl',
            controllerAs: 'workersAdd',
            title: 'Nuevo Colaborador'
        };

        var workersEditState = {
            name: 'admin.workersEdit',
            // url: '/workers/edit',
            url: '/colaboradores/editar/:document_type/:document_number',
            templateUrl: 'views/workers/edit.html',
            controller: 'WorkersEditCtrl',
            controllerAs: 'workersEdit',
            title: 'Editar Colaborador'
        };

        var productRequestsRegisterState = {
            name: 'public.productRequestsRegister',
            // url: '/product-requests/register',
            url: '/solicitudes/registrar',
            templateUrl: 'views/product-requests/register.html',
            controller: 'ProductRequestsRegisterCtrl',
            controllerAs: 'productRequestsRegister',
            title: 'Registrar Solicitud'
        };

        var productRequestsAttendState = {
            name: 'admin.productRequestsAttend',
            // url: '/product-requests/attend',
            url: '/solicitudes/atención',
            templateUrl: 'views/product-requests/attend.html',
            controller: 'ProductRequestsAttendCtrl',
            controllerAs: 'productRequestsAttend',
            title: 'Atender Solicitud de EPP\'s'
        };

        var productRequestsSignatureState = {
            name: 'public.productRequestsSignature',
            // url: '/product-requests/signature',
            url: '/solicitudes/firma',
            templateUrl: 'views/product-requests/signature.html',
            controller: 'ProductRequestsSignatureCtrl',
            controllerAs: 'productRequestsSignature',
            title: 'Firma'
        };

        var configurationState = {
            name: 'admin.configuration',
            // url: '/configuration',
            url: '/configuración',
            templateUrl: 'views/configuration.html',
            controller: 'ConfigurationCtrl',
            controllerAs: 'configuration',
            title: 'Configuracióñ'
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
        $stateProvider.state(workersIndexState);
        $stateProvider.state(workersAddState);
        $stateProvider.state(workersEditState);
        $stateProvider.state(productRequestsRegisterState);
        $stateProvider.state(productRequestsAttendState);
        $stateProvider.state(productRequestsSignatureState);
        $stateProvider.state(reportsProductRequestRecordsState);
        $stateProvider.state(reportsReportRangeDates);
        $stateProvider.state(configurationState);
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
                    trans.$to().name !== 'public.productRequestsRegister' &&
                    trans.$to().name !== 'public.productRequestsSignature') {
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
