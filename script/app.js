var app = angular.module("miniFlickr", ['akoenig.deckgrid', 'me-lazyload']);

app.controller("PhotoController", ['$http', '$scope', '$filter', function($http, $scope, $filter){
    //api/version/plural
    $http.get("/api/v1/photos")
        .then(function(response){
            $scope.showGrid = true;
            $scope.photos = response.data;
            $scope.filteredPhotos = $scope.photos;
            $scope.pinFilter = 'all';
            $scope.searchTags = function(){
                if ($scope.pinFilter === 'all'){
                    if ($scope.tagsFilter === ''){
                        $scope.filteredPhotos = $scope.photos;
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    }
                } else {
                    if ($scope.tagsFilter === ''){
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true});
                    } else{
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true, tags: $scope.tagsFilter});
                    }
                }
            };
            $scope.pin = function(index){
                var currentPinStatus = $scope.photos[index].pinned;
                if (currentPinStatus == null){
                    $scope.photos[index].pinned = true;
                } else {
                    $scope.photos[index].pinned = !currentPinStatus;
                }
            };
            $scope.togglePinned = function (pinFilter) {
                $scope.pinFilter = pinFilter; //to toggle button style class
                if (pinFilter === 'all') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $scope.photos;
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {tags: $scope.tagsFilter});
                    }
                } else if (pinFilter === 'pinned') {
                    if ($scope.tagsFilter === '') {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true});
                    } else {
                        $scope.filteredPhotos = $filter('filter')($scope.photos, {pinned: true, tags: $scope.tagsFilter});
                    }
                }
            };
            $scope.$on('$destroy', destroy);
            function destroy() {
                $scope.filteredPhotos = [];
                $scope.showGrid = false;
            }
        });
}]);