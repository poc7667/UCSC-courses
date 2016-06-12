(function() {
    'use strict';
    var API_REQ_PREFIX = '/api/v1';
    angular.module('userCourseModule', [])
        .factory('userCourseService', ['$resource',
            function($resource, $http) {
                var user_course = $resource(API_REQ_PREFIX+'/user_courses/:user_course_id/', { user_course_id : '@user_course_id',
                }, {
                    all: {
                        method: 'GET',
                        isArray: true
                    },
                    shared_course_list:{
                        method: 'GET',
                        // isArray: true,
                        url: API_REQ_PREFIX+'/shared_course_list/:uid'
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