(function() {
    "use strict";
    app.controller( 'userCourseEditCtrl' ,
        function($scope, 
            $resource, 
            $q, 
            $stateParams, 
            userCourseService
            $timeout) {

            if ($stateParams.user_course_id) {
                var query = {
                    user_course_id: $scope.user_course_id,
                }
                userCourseService.get(query).$promise.then(function(ret) {
                    $scope.user_course = ret
                    $scope.successMessage()
                }, $scope.errorMessage)
            } else {
                userCourseService.new({
                    user_course_id: $scope.user_course_id
                }).$promise.then(function(ret) {
                    $scope.user_course = ret
                    $scope.successMessage()
                }, $scope.errorMessage)
            }
        });

}());