(function() {
    'use strict';
    angular.module('userCourseModule', [])
        .factory('userCourseService', ['$resource',
            function($resource, $http) {
                var user_course = $resource('/api/v1/user_courses/:user_course_id/', { user_course_id : '@user_course_id',
                }, {
                    all: {
                        method: 'GET',
                        isArray: true
                    },
                    update: {
                        method: 'PUT'
                    },
                    create: {
                        method: 'POST'
                    },
                    delete: {
                        method: 'DELETE'
                    }
                });
                return user_course ;
            }
        ]);
}());