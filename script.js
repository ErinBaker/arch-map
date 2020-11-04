mapboxgl.accessToken =
  "pk.eyJ1IjoiZXBpZGVtaWtzIiwiYSI6IjczZDdjYTc2MGFlMjc0ZDMyZGFjN2QzYzkyMzk0NWFiIn0.LOJX9JHM9Nox2_vHPx-OQg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-v9",
  center: [104.923394, 11.597952],
  zoom: 13
});

map.on("load", function () {
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              '<strong>មជ្ឈមណ្ឌលកុមារកំព្រា គៀនឃ្លាំង<br>Kien Khleang Orphanage</strong><p>Demolished Catholic orphanage.</p><p>Open <a href="https://goo.gl/maps/Yofu7cy2YdkAdMyG6" target="_blank">Street view</a></p><img src="https://i.gyazo.com/e32719ef5675a664d0153cb0b23e1a32.jpg" width="100%">',
            icon: "religious-christian"
          },
          geometry: {
            type: "Point",
            coordinates: [104.923394, 11.597952]
          }
        }
      ]
    }
  });
  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": "{icon}-15",
      "icon-allow-overlap": true
    }
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.
  map.on("click", "places", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "places", function () {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
  });
});