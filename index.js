// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6548515, lng: -2.0960944 },
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    // mapTypeId: google.maps.MapTypeId.HYBRID,
    // mapTypeId: google.maps.MapTypeId.TERRAIN,
    zoom: 17,
  });
//   infoWindow = new google.maps.InfoWindow();

  const tourStops = [
    [{ lat: 47.65456, lng: -2.09315 }, "Bell Rock"],
    [{ lat: 47.65413, lng: -2.08947 }, "Boynton Pass"],
    [{ lat: 47.65724, lng: -2.09191 }, "Airport Mesa"],
    [{ lat: 47.65786, lng: -2.09484 }, "Chapel of the Holy Cross"],
    [{ lat: 47.65844, lng: -2.09527 }, "Red Rock Crossing"],
  ];
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();

  // Create the markers.
  tourStops.forEach(([position, title], i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${i + 1}. ${title}`,
      label: `${i + 1}`,
      optimized: false,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });

//   new google.maps.Marker({
//     position: new google.maps.LatLng(47.655, -2.0961),
//     map: map,
//     title: "Locronan - Rue du Prieuré"

  const locationButton = document.createElement("button");

  locationButton.textContent = "Ajuster a votre localisation";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Vous etes ici.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  navigator.geolocation.getCurrentPosition(maPosition, erreurPosition,{maximumAge:0,timeout:5000,enableHighAccuracy:true});

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Erreur: nous n'avons pas pu vous géolocaliser."
      : "Erreur: votre navigateur ne supporte pas la géolocalisation."
  );
  infoWindow.open(map);
}

function correctAnswer() {
  document.getElementById("demo").innerHTML = "Bonne réponse";
}

function falseAnswer() {
  document.getElementById("demo").innerHTML = "Mauvaise réponse";
}

// function myFunction2() {
//   document.getElementById("demo2").innerHTML = "<button>Click me</button>";
// }

// function myFunction2() {
//   document.getElementById("panel").style.display = "toggle";
// }

function myFunction2() {
  var x = document.getElementById("panel");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
} 
