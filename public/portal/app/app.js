/*
*  Altair Admin AngularJS
*/
;"use strict";

var altairApp = angular.module('altairApp', [
    'ui.router',
    'ngResource',
    'oc.lazyLoad',
    'ngSanitize',
    'ngRetina',
    'ncy-angular-breadcrumb',
    'ConsoleLogger',
    'ngStorage',
    'ng-token-auth',
    'userCourseModule',
]);


altairApp.constant('variables', {
    header_main_height: 48,
    easing_swiftOut: [ 0.4,0,0.2,1 ],
    bez_easing_swiftOut: $.bez([ 0.4,0,0.2,1 ])
});

altairApp.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://w.soundcloud.com/**'
    ]);
});

// breadcrumbs
altairApp.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'restricted.dashboard',
        templateUrl: 'app/templates/breadcrumbs.tpl.html'
    });
});

altairApp.config(function($authProvider) {
    $authProvider.configure({
        apiUrl: '',
        tokenValidationPath: '/auth/validate_token',
        signOutUrl: '/auth/sign_out',
        emailRegistrationPath: '/auth',
        accountUpdatePath: '/auth',
        accountDeletePath: '/auth',
        confirmationSuccessUrl: window.location.href,
        passwordResetPath: '/auth/password',
        passwordUpdatePath: '/auth/password',
        passwordResetSuccessUrl: window.location.href,
        emailSignInPath: '/auth/sign_in',
        storage: 'localStorage',
        forceValidateToken: false,
        validateOnPageLoad: true,
        proxyIf: function() {
            return false;
        },
        proxyUrl: '/proxy',
        omniauthWindowType: 'sameWindow',
        authProviderPaths: {
            // alphaloan: '/auth/alphaloan',
            github: '/auth/github',
            facebook: '/auth/facebook',
            google: '/auth/google'
        },
        tokenFormat: {
            "access-token": "{{ token }}",
            "token-type": "Bearer",
            "client": "{{ clientId }}",
            "expiry": "{{ expiry }}",
            "uid": "{{ uid }}"
        },
        cookieOps: {
            path: "/",
            expires: 9999,
            expirationUnit: 'days',
            secure: false,
            domain: 'domain.com'
        },
        createPopup: function(url) {
            return window.open(url, '_blank', 'closebuttoncaption=Cancel');
        },
        parseExpiry: function(headers) {
            // convert from UTC ruby (seconds) to UTC js (milliseconds)
            return (parseInt(headers['expiry']) * 1000) || null;
        },
        handleLoginResponse: function(response) {
            return response.data;
        },
        handleAccountUpdateResponse: function(response) {
            return response.data;
        },
        handleTokenValidationResponse: function(response) {
            return response.data;
        }
    });
});


altairApp.run(function($rootScope, $state, $auth, $location, $window) {

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        $auth.validateUser().then(function(resp) {
            $rootScope.userProfile = resp;
        }).catch(function(resp) {
            if ($location.$$path.indexOf("access") > -1) {
            } else {
            console.log(resp);
                event.preventDefault();
            }
        })
    });

})


/* Run Block */
altairApp
    .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$window',
        '$timeout',
        'preloaders',
        '$auth',
        'variables',
        
        function ($rootScope, $state, $stateParams,$http, $window, $timeout, $auth,variables) {

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

        $rootScope.I18n = {}
        $rootScope.I18n.t = function(trans_str) {
            if (I18n.t(trans_str).indexOf("missing") > 0 && I18n.t(trans_str).indexOf("translation") > 0) {
                return trans_str;
            } else {
                return I18n.t(trans_str);
            }
        };

            $rootScope.$on('$stateChangeSuccess', function () {
                // scroll view to top
                $("html, body").animate({
                    scrollTop: 0
                }, 200);

                $timeout(function() {
                    $rootScope.pageLoading = false;
                    // reinitialize uikit components
                    $.UIkit.init($('body'));

                    $($window).resize();
                },300);

                $timeout(function() {
                    $rootScope.pageLoaded = true;
                    $rootScope.appInitialized = true;
                    // wave effects
                    $window.Waves.attach('.md-btn-wave,.md-fab-wave', ['waves-button']);
                    $window.Waves.attach('.md-btn-wave-light,.md-fab-wave-light', ['waves-button', 'waves-light']);
                },600);
            });

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                // main search
                $rootScope.mainSearchActive = false;
                // single card
                $rootScope.headerDoubleHeightActive = false;
                // top bar
                $rootScope.toBarActive = false;
                // page heading
                $rootScope.pageHeadingActive = false;
                // top menu
                $rootScope.topMenuActive = false;
                // full header
                $rootScope.fullHeaderActive = false;
                // full height
                $rootScope.page_full_height = false;
                // secondary sidebar
                $rootScope.sidebar_secondary = false;
                $rootScope.secondarySidebarHiddenLarge = false;
                // footer
                $rootScope.footerActive = false;

                if($($window).width() < 1220 ) {
                    // hide primary sidebar
                    $rootScope.primarySidebarActive = false;
                    $rootScope.hide_content_sidebar = false;
                }
                if(!toParams.hasOwnProperty('hidePreloader')) {
                    $rootScope.pageLoading = true;
                    $rootScope.pageLoaded = false;
                }

            });

            // fastclick (eliminate the 300ms delay between a physical tap and the firing of a click event on mobile browsers)
            FastClick.attach(document.body);

            // get version from package.json
            $http.get('./package.json').success(function(response) {
                $rootScope.appVer = response.version;
            });

            // modernizr
            $rootScope.Modernizr = Modernizr;

            // get window width
            var w = angular.element($window);
            $rootScope.largeScreen = w.width() >= 1220;

            w.on('resize', function() {
                return $rootScope.largeScreen = w.width() >= 1220;
            });

            // show/hide main menu on page load
            $rootScope.primarySidebarOpen = ($rootScope.largeScreen) ? true : false;

            $rootScope.pageLoading = true;

            // wave effects
            $window.Waves.init();


        }
    ])
    .run([
        'PrintToConsole',
        function(PrintToConsole) {
            // app debug
            PrintToConsole.active = false;
        }
    ])
;
