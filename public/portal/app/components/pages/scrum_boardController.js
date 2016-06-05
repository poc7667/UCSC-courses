angular
    .module('altairApp', [angularDragula(angular)])
    .controller('scrum_boardCtrl', [
        '$rootScope',
        '$scope',
        'tasks_list',
        '$http',
        'dragulaService',
        function($rootScope, $scope, tasks_list, $http, dragulaService) {

            loadCourses($scope);

            $rootScope.page_full_height = true;

            $scope.quarters = ["quarter_1", "quarter_2", "quarter_3"];
            $scope.task_groups = [{
                id: 'todo',
                name: 'To Do'
            }, {
                id: 'quarter_1',
                name: '#1 Quarter'
            }, {
                id: 'quarter_2',
                name: '#2 Quarter'
            }, {
                id: 'quarter_3',
                name: '#3 Quarter'
            }];

            $scope.selected_courses = [];
            $scope.tasks_list = $scope.selected_courses;

            // task info
            $scope.taskInfo = function(task) {
                $scope.info = {
                    name: task.course_name,
                    title: task.title,
                    status: task.status,
                    description: task.description,
                    credit_hours: task.credit_hours
                }
            };

            $scope.$watchCollection(
                "forms_advanced.selectize_planets",
                function(newValues, oldValues) {
                    oldValues = oldValues || []
                    newValues = newValues || []
                    if (newValues.length > oldValues.length) {
                        _.each(newValues, function(id) {
                            var course = _.find($scope.selectize_planets_options, function(course) {
                                return course.id == id;
                            });
                            var isExist = _.find($scope.tasks_list, function(task) {
                                return task.id == course.id;
                            });
                            console.log(isExist)
                            if (undefined == isExist) {
                                $scope.tasks_list.push(course);
                            }
                        })
                        console.log($scope.task_list);

                    } else {
                        var taskID = _.difference(oldValues, newValues);
                        for (var i = $scope.tasks_list.length - 1; i >= 0; i--) {
                            if ($scope.tasks_list[i].id == taskID) {
                                $scope.tasks_list.splice(i, 1);
                            }
                        }
                    }

                }
            );


            $scope.creditsInQuarter = function(quarter_name) {
                var tasks = [];
                _.each($scope.tasks_list, function(t) {
                    if (t.group == quarter_name) {
                        tasks.push(t)
                    }
                })
                var credit_hours = 0;
                _.each(tasks, function(t) {
                    credit_hours += t.credit_hours;
                })
                return credit_hours;
            }

            $scope.$on('tasks.drop', function(e, el, target, source) {
                var groupId = target[0].id;
                var taskHTML = (el[0].innerHTML);
                var taskNode = angular.element(taskHTML);
                var taskId = taskNode.find("#task_id").val();
                var foundTask = _.find($scope.tasks_list, function(task) {
                    return task.id == taskId;
                })
                foundTask.group = groupId;

                setTimeout(function() {
                    $scope.$apply();
                }, 200);

            });

            function loadCourses() {
                var planets_data = $scope.selectize_planets_options = [];
                $http({
                    method: 'GET',
                    url: '/api/v1/courses.json'
                }).then(function(data) {
                    _.each(data.data, function(item) {
                        item.group = "todo"
                        $scope.selectize_planets_options.push(item)
                    })
                });



                $scope.selectize_planets_config = {
                    plugins: {
                        'remove_button': {
                            label: ''
                        }
                    },
                    maxItems: null,
                    valueField: 'id',
                    labelField: 'course_name',
                    searchField: 'course_name',
                    create: false,
                    render: {
                        option: function(item, escape) {
                            var str = "{{course}}, {{start_date}} - {{credit_hours}} credits {{location}} : {{course_number}}"
                            var values = {
                                course: item.course_name,
                                start_date: moment(item.start_date).format("YYYY/MM/DD ddd").toString(),
                                credit_hours: item.credit_hours,
                                location: item.site_name,
                                course_number: item.course_number,
                            }

                            var option_item = S(str).template(values).s

                            return '<div class="option">' +
                                '<span class="title">' + option_item + '</span>' +
                                '</div>';
                        },
                        item: function(planets_data, escape) {
                            return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.course_number) + ":" + escape(planets_data.course_name) + '</a></div>';
                        }
                    }
                };
            }

        }
    ]);