angular.module('eventsApp', ['leaflet-directive', 'ui.calendar'])
  .controller('EventsController', function($scope, $http) {

    $scope.myEvents = [];
    $scope.jsonEvents = [];


    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false,


        //    markers: this.markers
      },
      tiles: {
        url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
       options: {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &mdash; Event Data by <a href="http://offenedaten-koeln.de/group/stadt-k%C3%B6ln">Stadt Köln</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      }
    },
    center: {
      lat: 50.941357,
      lng: 6.958307,
      zoom: 13
    }
    });

  /*  $scope.getEvents = function(){
      $http.jsonp('http://json2jsonp.com/?url=http://www.stadt-koeln.de/externe-dienste/open-data/events-od.php&callback=JSON_CALLBACK')
        .then(function(response){
        $scope.jsonEvents = response.items;
      });
    };*/



      $scope.events = function(start, end, timezone, callback) {
          $.ajax({
              url: 'http://json2jsonp.com/?url=http://www.stadt-koeln.de/externe-dienste/open-data/events-od.php',
              dataType: 'jsonp',
              success: function(doc) {
                  $scope.jsonEvents = [];
                  $(doc.items).each(function() {
                    if (moment(this.endedatum).isAfter(start)
                      && moment(this.beginndatum).isBefore(end)
                      && this.latitude.length > 0 && this.longitude.length > 0){
                        this.start = this.beginndatum;
                        this.end = this.endedatum;
                          this.lat = parseFloat(this.latitude);
                          this.lng = parseFloat(this.longitude);
                          this.message = this.title;
                          $scope.jsonEvents.push(this);
                    }
                  });
                //  renderMarkers(events);
                  callback($scope.jsonEvents);
              }
          });



      };

      $scope.eventSources = [$scope.events];

      /* config object */
       $scope.uiConfig = {
          calendar:{
              firstDay: 1,
            defaultView: 'basicWeek',
            handleWindowResize: false,
            eventLimit: true,
            eventColor: '#ff0090'
          }
        };

  		$scope.addToMyEvents = function(event) {
  			myEvents.push(event);
  		};

      //setHeightOfDivs();



  })
  .directive('thirdOfHeight', function() {
    return function (scope, element, attrs) {
          element.height(($(window).height())/3);
      }
})
  .directive('twoThirdsOfHeight', function() {
    return function (scope, element, attrs) {
          element.height(((($(window).height())/3)*2)-10);
      }
  });
