(function() {

    'use strict';
    app.controller('userCourseUpdateCtrl',
        function($scope, $resource, $q,
                 userCourseService
                 $stateParams ) {
            $scope.update = function() {
                if ($stateParams.user_course_id) {
                    userCourseService.update({
                        user_course_id: $scope.user_course_id
                    }, {
                        user_course: $scope.user_course
                    }).$promise.then($scope.successMessage, $scope.errorMessage)
                } else {
                    userCourseService.create({
                        user_course_id: $scope.user_course.id
                    }).$promise.then(function(ok_msg) {
                        $scope.user_courses.push($scope.user_course)
                        $scope.successMessage()
                    }, $scope.errorMessage)
                }
            }
        });


}());

