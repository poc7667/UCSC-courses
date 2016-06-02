angular
    .module('altairApp', [ angularDragula(angular) ] )
    .controller('scrum_boardCtrl', [
        '$rootScope',
        '$scope',
        'tasks_list',
        'dragulaService',
        function ($rootScope,$scope,tasks_list,dragulaService) {

            var planets_data = $scope.selectize_planets_options = [
                {id: 1, title: 'Mercury', url: 'http://en.wikipedia.org/wiki/Mercury_(planet)'},
                {id: 2, title: 'Venus', url: 'http://en.wikipedia.org/wiki/Venus'},
                {id: 3, title: 'Earth', url: 'http://en.wikipedia.org/wiki/Earth'},
                {id: 4, title: 'Mars', url: 'http://en.wikipedia.org/wiki/Mars'},
                {id: 5, title: 'Jupiter', url: 'http://en.wikipedia.org/wiki/Jupiter'},
                {id: 6, title: 'Saturn', url: 'http://en.wikipedia.org/wiki/Saturn'},
                {id: 7, title: 'Uranus', url: 'http://en.wikipedia.org/wiki/Uranus'},
                {id: 8, title: 'Neptune', url: 'http://en.wikipedia.org/wiki/Neptune'}
            ];

            $scope.selectize_planets_config = {
                plugins: {
                    'remove_button': {
                        label     : ''
                    }
                },
                maxItems: null,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                create: false,
                render: {
                    option: function(planets_data, escape) {
                        return  '<div class="option">' +
                            '<span class="title">' + escape(planets_data.title) + '</span>' +
                            '</div>';
                    },
                    item: function(planets_data, escape) {
                        return '<div class="item"><a href="' + escape(planets_data.url) + '" target="_blank">' + escape(planets_data.title) + '</a></div>';
                    }
                }
            };

            $rootScope.page_full_height = true;

            $scope.task_groups = [
                {
                    id: 'todo',
                    name: 'To Do'
                },
                {
                    id: 'inAnalysis',
                    name: 'In analysis'
                },
                {
                    id: 'inProgress',
                    name: 'In progress'
                },
                {
                    id: 'done',
                    name: 'Done'
                }
            ];

            $scope.tasks_list = tasks_list;

            // task info
            $scope.taskInfo = function(task) {
                $scope.info = {
                    name: task.name,
                    title: task.title,
                    status: task.status,
                    description: task.description,
                    assignee: task.assignee
                }
            };

            // new task
            $scope.newTask = {
                name: 'Altair-245',
                assignee: [
                    { id: 1, title: 'Aleen Grant' },
                    { id: 2, title: 'Tyrese Koss' },
                    { id: 3, title: 'Chasity Green' },
                    { id: 4, title: 'Me' }
                ],
                group: [
                    { name: 'todo', title: 'To Do' },
                    { name: 'inAnalysis', title: 'In Analysis' },
                    { name: 'inProgress', title: 'In Progress' },
                    { name: 'done', title: 'Done' }
                ]
            };

            $scope.newTask_assignee =  $scope.newTask.assignee;
            $scope.newTask_assignee_config = {
                create:false,
                maxItems: 1,
                valueField: 'id',
                labelField: 'title',
                placeholder: 'Select Assignee...'
            };
            $scope.newTask_group =  $scope.newTask.group;
            $scope.newTask_group_config =  {
                create:false,
                maxItems: 1,
                valueField: 'name',
                labelField: 'title',
                placeholder: 'Select Group...'
            };

            $scope.$on('tasks.drop', function (e, el, target, source) {
                console.log(target[0].id);
            });

        }
    ]);