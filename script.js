const siteEl = document.getElementById('site')

const loginPageEl = document.getElementById('loginPage');


const placesDivEl = document.getElementById("places");

const ratingSelectEl = document.getElementById("ratingSelect");
const meetingRating = localStorage.getItem("meetingRating")
if (meetingRating !== null) {
  ratingSelectEl.value = meetingRating
}

function handleLoginSubmit(e) {
  const usernameInput = document.getElementById('username')
 // const pwInput = document.getElementById('password')
  e.preventDefault();
 /* if (usernameInput.value !== 'Soczek' || pwInput.value !== 'admin') {
    alert('Wrong username or password!')
    return
  }*/
  loginPageEl.style.display = 'none'
  siteEl.style.display = 'block';
  nicknameDivEl.innerHTML += '<p>${usernameInput}</p>';
}

function handleRatingSubmit(e) {
  e.preventDefault();
  const el = document.getElementById("ratingSelect");
  const rating = el.options[el.selectedIndex].value;
  localStorage.setItem("meetingRating", rating);

}

function handlePhotosUpload(e) {
  const el = document.getElementById('photosInput');
  //mozecie tutaj cos z tym zrobic, do localStorage nie da sie (tzn sie da ale chujowo) tego wrzucic,
  //predzej na jakis backend czy cos
  console.log(el.files)
}

document.getElementById('loginBtn').addEventListener('click', handleLoginSubmit)
document.getElementById('ratingBtn').addEventListener('click', handleRatingSubmit)
document.getElementById('photosInput').addEventListener('change', handlePhotosUpload)

function search() {
  const krakowLatLng = new google.maps.LatLng(50.049683, 19.944544);
  const mapOptions = {
    zoom: 12,
    center: krakowLatLng
  }
  const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  const infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);

      map.setCenter(pos);
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch({
        location: pos,
        radius: 5500,
        type: ['restaurant'],
        fields: ['name', 'formatted_address', 'place_id', 'geometry']
      }, restaurantCallback);

      service.nearbySearch({
        location : pos,
        radius : 10000,
        type : ['movie_theater'],
        fields: ['name', 'formatted_address', 'place_id', 'geometry']
      }, movieTheaterCallback);

    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  //
  const markers = []

  function restaurantCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < 2; i++) {
        console.log('restaurants', results[i])
        placesDivEl.innerHTML += `<p>${results[i].name} ${results[i].vicinity}</p>`
        const marker = new google.maps.Marker({
          position: results[i].geometry.location,
        });
        marker.setMap(map);
        markers.push({marker, result: results[i]})

      }
    }
  }

  function movieTheaterCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < 2; i++) {
        console.log('cinemas', results[i])
        placesDivEl.innerHTML += `<p>${results[i].name} ${results[i].vicinity}</p>`
        const marker = new google.maps.Marker({
          position: results[i].geometry.location,
        });
        marker.setMap(map);
        markers.push({marker, result: results[i]})

      }
    }
    markers.map(({marker, result}) => {
      google.maps.event.addListener(marker, 'click', function () {
        infowindow1.setContent('<div><strong>' + place1.name + '</strong><br>' +
                'Place ID: ' + place1.place_id + '<br>' +
                place1.formatted_address + '</div>');
         
          infowindow1.open(map, this);
      });
    })

  }
}
// var map;
//       var service;
//       var infowindow;
//       function initMap() {
//         var sydney = new google.maps.LatLng(-33.867, 151.195);
//
//         infowindow = new google.maps.InfoWindow();
//
//
//         map = new google.maps.Map(
//             document.getElementById('map'), {center: sydney, zoom: 15});
//
//         var request = {
//           query: 'kino',
//           fields: ['name', 'formatted_address', 'place_id', 'geometry']
//         };
//
//         service = new google.maps.places.PlacesService(map);
//
//         service.findPlaceFromQuery(request, function(results, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//               createMarker(results[i]);
//             }
//
//             map.setCenter(results[0].geometry.location);
//           }
//         });
//         initMap1();
//       }
//
//       function createMarker(place) {
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });
//
//         google.maps.event.addListener(marker, 'click', function() {
//           infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//                 place.formatted_address + '</div>');
//
//           infowindow.open(map, this);
//         });
//
//       }
//
//
//
//       var map1;
//       var service1;
//       var infowindow1;
//       function initMap1() {
//         var sydney = new google.maps.LatLng(-33.867, 151.195);
//
//         infowindow1 = new google.maps.InfoWindow();
//
//
//         map1 = new google.maps.Map(
//             document.getElementById('map1'), {center: sydney, zoom: 15});
//
//         var request1 = {
//           query: 'stacja paliw',
//           fields: ['name', 'formatted_address', 'geometry']
//         };
//
//         service1 = new google.maps.places.PlacesService(map1);
//
//         service1.findPlaceFromQuery(request1, function(results, status) {
//           if (status === google.maps.places.PlacesServiceStatus.OK) {
//             for (var i = 0; i < results.length; i++) {
//               createMarker1(results[i]);
//             }
//
//             map1.setCenter(results[0].geometry.location);
//           }
//         });
//       }
//
//       function createMarker1(place1){
//         var marker1 = new google.maps.Marker({
//           map: map,
//           position: place1.geometry.location
//         });
//
//         google.maps.event.addListener(marker1, 'click', function() {
//           infowindow1.setContent('<div><strong>' + place1.name + '</strong><br>' +
//                 place1.formatted_address + '</div>');
//
//           infowindow1.open(map, this);
//         });
//
//       }

