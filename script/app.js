//Todo: add preload

var app = angular.module("miniFlickr", ['akoenig.deckgrid', 'me-lazyload', 'ngLodash']);

var pageNum = 1;

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            //get the first value that is not null (for compatibility)
            var scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            //height of window + length already scrolled >= whole length of the page, use 50 as buffer
            if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 200)) {
                scope.debounceLoadMore();
            }
            scope.$apply();
        });
    };
});

//var getMorePhotos = _.debounce(getRecentFlickrPhotos, 1000);

app.controller("PhotoController", ['$http', '$scope', '$filter', 'lodash', function($http, $scope, $filter, lodash){
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
            $scope.loadMore = function (scope, callback){
                pageNum = pageNum + 1;
                if (pageNum <= 5){
                    $http.get("/api/v1/morePhotos",{
                        params: { pageNum: pageNum }
                    })
                        .then(function(response) {
                            $scope.pinFilter = 'all';
                            $scope.tagsFilter = '';
                            $scope.filteredPhotos = $scope.filteredPhotos.concat(response.data);
                            //scroll back to previous positions
                            var currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                            window.scroll(0, currentY - 6500);

                        })
                }
            };
            $scope.debounceLoadMore = lodash.debounce($scope.loadMore, 1000);
        });
}]);