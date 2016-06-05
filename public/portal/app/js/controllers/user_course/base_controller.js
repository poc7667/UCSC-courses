(function() {

    'use strict';
    app.controller('userCourseBaseCtrl',
        function($rootScope,
            $scope,
            $resource,
            $window,
            $timeout,
            $q,
            userCourseService
            $location,
            $routeParams,
            $stateParams,
        ) {

            $scope.user_course_pre_non_editable_fields = []
            $scope.user_course_post_non_editable_fields = []
            $scope.user_course_text_fields = []
            $scope.user_course_datetime_text_fields = []
            $scope.user_course_select_fields = []
            $scope.user_course_radio_fields = []
            $scope.user_courses = []
            $scope.emptyRecord = {}

        });

}());