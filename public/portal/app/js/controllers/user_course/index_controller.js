(function() {

    'use strict';

    app.controller('userCourseIndexCtrl',
        function($scope, $resource, $q, userCourseService ,$stateParams) {
             userCourseService.all({}).$promise.then(function(ret) {
                $scope.user_courses = ret
            });

            $scope.inPlaceUpdate = function(user_course, user_course_id) {
                if (user_course_id) {
                    userCourseService.update({
                        user_course_id: user_course_id
                    }, {
                        user_course: user_course
                    }).$promise.then(function(ret) {
                        $scope.successMessage(ret)
                    },$scope.errorMessage)
                } else {
                    userCourseService.create({}, {
                        user_course: user_course
                    }).$promise.then(function(ret) {
                        $scope.user_courses.splice(-1,1)
                        $scope.user_courses.push(ret)
                        $scope.user_course = ret
                        $scope.successMessage()
                    }, $scope.errorMessage);

                }
            };

        });

}());

