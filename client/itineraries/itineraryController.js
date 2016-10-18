angular.module('travelPlannerApp.itinerary', [])

.controller('ItineraryController', function($scope, $http, newDestinationFactory) {

  $scope.destination = newDestinationFactory.getDest();

  $scope.listItems = [];
  $scope.featuredPhoto = '';
  $scope.photos = [];

  var fetchTodos = function() {
    $http({
      method: 'GET',
      url: '/destination',
      params: {dest: $scope.destination}
    }).then(function(resp) {
      $scope.listItems = resp.data.todos.map(function(todo) {
        return todo.text;
      });
    });
  }

  fetchTodos();

  var fetchImages = function() {
    $http({
      method: 'GET',
      url: '/destination/photos',
      params: {
        dest: $scope.destination,
        query: 'attraction'
      }
    }).then(function(resp) {
      $scope.photos = resp.data.map(function(image) {
        return image.display_sizes[0].uri;
      })
    });
  }

  fetchImages();

  $scope.addItem = function() {
    var newTodo = {
      text: $scope.itineraryItem,
      dest: $scope.destination
    };
    $http({
      method: 'POST',
      url: '/destination/todo',
      data: newTodo
    }).then(function(resp) {
      fetchTodos();
      return resp;
    });
    $scope.itineraryItem = '';
  };

  $scope.checkOffItem = function(number) {
    var selector = '#todoListItem' + number;

    angular.element(document.querySelector( selector )).css('background-color','#666');
    angular.element(document.querySelector( selector )).css('border-color','#666');
  };

  $scope.submitQuery = function() {
    $http({
      method: 'GET',
      url: '/destination/photos',
      params: {
        dest: $scope.destination,
        query: $scope.imagesQuery
      }
    }).then(function(resp) {
      $scope.photos = resp.data.map(function(image) {
        return image.display_sizes[0].uri;
      })
    });
  }
  
});