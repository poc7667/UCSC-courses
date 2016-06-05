(function() {
    "use strict";
    app.controller( 'userCourseCreateCtrl' ,
        function($scope, 
            $resource, 
            $q, 
            $stateParams, 
            userCourseService
            $timeout
            ) {
            $scope.create = function() {
                $scope.user_courses.push(angular.copy($scope.emptyRecord))
            }
        });

}());

