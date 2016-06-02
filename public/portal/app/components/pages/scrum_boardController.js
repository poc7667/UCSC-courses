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

            $scope.task_groups = [{
                id: 'todo',
                name: 'To Do'
            }, {
                id: 'inAnalysis',
                name: 'In analysis'
            }, {
                id: 'inProgress',
                name: 'In progress'
            }, {
                id: 'done',
                name: 'Done'
            }];

            $scope.tasks_list = $scope.selectize_planets_options

            // $scope.tasks_list = tasks_list;

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



            $scope.$on('tasks.drop', function(e, el, target, source) {
                console.log(target[0].id);
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
                            var str = "{{course}}, {{start_date}} - {{credit_hours}} credits {{location}}"
                            var values = {
                                course: item.course_name,
                                start_date: moment(item.start_date).format("YYYY/MM/DD ddd").toString(),
                                credit_hours: item.credit_hours,
                                location: item.site_name
                            }

                            var option_item = S(str).template(values).s

                            return '<div class="option">' +
                                '<span class="title">' + option_item + '</span>' +
                                '</div>';
                        },
                        item: function(planets_data, escape) {
                            return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.course_name) + '</a></div>';
                        }
                    }
                };
            }

        }
    ]);