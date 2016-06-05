(function() {

    'use strict';

    app.controller('userCourseDeleteCtrl',
        function($scope, 
                $resource, 
                $q,
                userCourseService
                $stateParams, 
                ) {

            $scope.delete = function(index, user_course_id) {
                if (confirm(I18n.t("are_you_sure_to_delete_this_record"))) {
                    userCourseService.delete({
                        user_course_id: user_course_id
                    }).$promise.then(function(ret) {
                        $scope.user_courses.splice(index, 1)
                        $scope.successMessage()
                    }, $scope.errorMessage);
                }
            }


        });


}());