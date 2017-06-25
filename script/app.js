var app = angular.module("miniFlickr", ['akoenig.deckgrid']);

app.controller("PhotoController", ['$http', '$scope', '$filter', function($http, $scope, $filter){
    //api/version/plural
    $http.get("/api/v1/photos")
        .then(function(response){
            $scope.photos = response.data;
            $scope.filteredPhotos = $scope.photos;
            $scope.searchTags = function(){
                if ($scope.tagsFilter === ''){
                    $scope.filteredPhotos = $scope.photos;
                } else {
                    $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    console.log($scope.filteredPhotos.length);
                }
            };
            $scope.pin = function(index){
                var currentPinStatus = $scope.photos[index].pinned;
                if (currentPinStatus == null){
                    $scope.photos[index].pinned = true;
                } else {
                    $scope.photos[index].pinned = !currentPinStatus;
                }
            }
        });
}]);