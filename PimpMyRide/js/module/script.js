//call of the public API : https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=3&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=${latitude}%2C+${longitude}%2C500
//we set by default a default location to make the system work with a default location in Paris.
//however the location system will locate you where you currently are and provide you results from this default location.
//if you are in Paris, uncomment line 21 and comment line 20 (position by default to make it working)

// this function returns the number of available bikes at a given station
async function getABike(latitude, longitude) {
  try {
    let response = await fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=3&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=48.856614%2C+2.3522219%2C500`)
    //let response = await fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=3&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes&geofilter.distance=${latitude}%2C+${longitude}%2C500`)
    // connecting ourselves to the Paris City Hall API.
    let result = await response.json()
    return result // return promise
  } catch (err) {
    console.log(err.message);
  }
}

// Transform promise of GetABike in object.
function transformPromise(latitude, longitude) {
  getABike(latitude, longitude).then(function (result) {
    //console.log(result)
    initGauges(result)
    map(result, latitude, longitude)
  })
}

/* BEGIN gauge fonction */
async function initGauges(resultPromise) {
  let data = await resultPromise.records;
  console.log(data);
  console.log(data[0])
  console.log(data[1])
  console.log(data[2])

  for (let index = 0; index < data.length; index++) {
    const nameToAppend = await data[index].fields.name;
    console.log(nameToAppend);
    const name = document.getElementById(`name_station${index + 1}`)
    name.append(nameToAppend);

    var g = new JustGage({
      id: `${index + 1}-1`,
      value: data[index].fields.ebike,// = avaible electric bike(s)
      min: 0,
      max: data[index].fields.capacity, // = capacity
      donut: true,
      label: "Electric",
      levelColors: ["#75cff0"],
      shadowOpacity: 0.5,
      gaugeWidthScale: 0.8,
      relativeGaugeSize: true,
      title: ""
    });

    var g2 = new JustGage({
      id: `${index + 1}-2`,
      value: data[index].fields.mechanical,//= avaible mechanical bike
      min: 0,
      max: data[index].fields.capacity,
      donut: true,
      label: "Mechanical",
      levelColors: ["#b6e49e"],
      shadowOpacity: 0.5,
      gaugeWidthScale: 0.8,
      relativeGaugeSize: true,
      title: ""
    });

    var g3 = new JustGage({
      id: `${index + 1}-3`,
      value: data[index].fields.numdocksavailable, // free dock
      min: 0,
      max: data[index].fields.capacity,// total dock
      donut: true,
      label: "Dock",
      levelColors: ["#ead2da"],
      shadowOpacity: 0.5,
      gaugeWidthScale: 0.8,
      relativeGaugeSize: true,
      title: ""
    });

  };
  //document.getElementById(`name_station${row + 1}`).innerHTML = resultPromise.records[0].fields.name

  // var g = new JustGage({
  //   id: "gauge",
  //   value: resultPromise.records[0].fields.ebike,// = avaible electric bike(s)
  //   min: 0,
  //   max: resultPromise.records[0].fields.capacity, // = capacity
  //   donut: true,
  //   label: "Electric",
  //   levelColors: ["#75cff0"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  // var g2 = new JustGage({
  //   id: "gauge2",
  //   value: resultPromise.records[0].fields.mechanical,//= avaible mechanical bike
  //   min: 0,
  //   max: resultPromise.records[0].fields.capacity,
  //   donut: true,
  //   label: "Mechanical",
  //   levelColors: ["#b6e49e"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  // var g3 = new JustGage({
  //   id: "gauge3",
  //   value: resultPromise.records[0].fields.numdocksavailable, // free dock
  //   min: 0,
  //   max: resultPromise.records[0].fields.capacity,// total dock
  //   donut: true,
  //   label: "Dock",
  //   levelColors: ["#ead2da"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  //document.getElementById("name_station2").innerHTML = resultPromise.records[1].fields.name

  // var gEtage2 = new JustGage({
  //   id: "gauge-etg2",
  //   value: resultPromise.records[1].fields.ebike,
  //   min: 0,
  //   max: resultPromise.records[1].fields.capacity,
  //   donut: true,
  //   label: "Electric",
  //   levelColors: ["#75cff0"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  // var g2Etage2 = new JustGage({
  //   id: "gauge2-etg2",
  //   value: resultPromise.records[1].fields.mechanical,
  //   min: 0,
  //   max: resultPromise.records[1].fields.capacity,
  //   donut: true,
  //   label: "Mechanical",
  //   levelColors: ["#b6e49e"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  // var g3Etage2 = new JustGage({
  //   id: "gauge3-etg2",
  //   value: resultPromise.records[1].fields.numdocksavailable,
  //   min: 0,
  //   max: resultPromise.records[1].fields.capacity,
  //   donut: true,
  //   label: "Dock",
  //   levelColors: ["#ead2da"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  //document.getElementById("name_station3").innerHTML = resultPromise.records[2].fields.name

  // var gEtage3 = new JustGage({
  //   id: "gauge-etg3",
  //   value: resultPromise.records[2].fields.ebike,
  //   min: 0,
  //   max: resultPromise.records[2].fields.capacity,
  //   donut: true,
  //   label: "Electric",
  //   levelColors: ["#75cff0"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  // var g2Etage3 = new JustGage({
  //   id: "gauge2-etg3",
  //   value: resultPromise.records[2].fields.mechanical,
  //   min: 0,
  //   max: resultPromise.records[2].fields.capacity,
  //   donut: true,
  //   label: "Mechanical",
  //   levelColors: ["#b6e49e"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

  // var g3Etage3 = new JustGage({
  //   id: "gauge3-etg3",
  //   value: resultPromise.records[2].fields.numdocksavailable,
  //   min: 0,
  //   max: resultPromise.records[2].fields.capacity,
  //   donut: true,
  //   label: "Dock",
  //   levelColors: ["#ead2da"],
  //   shadowOpacity: 0.5,
  //   gaugeWidthScale: 0.8,
  //   relativeGaugeSize: true,
  //   title: ""
  // });

}
/* END gauge fonction */

//MAP BEGING//
function map(result, latitude, longitude) {
  //Create Map
  mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tYWluYmFiYSIsImEiOiJjbDhhYTJ5azcwM3VtM3BxcXB6aHE3cjR1In0.xAXtN4sbF_LIwMRcO4fkrg';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 15 // starting zoom
  })

  //SECTION : Create Position marker and add markers to map
  // create a HTML element for each feature
  const marker1Container = document.createElement('div');
  marker1Container.className = 'yourPosition';

  // make a marker for each feature and add to the map
  const yourPosition = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([longitude, latitude])
    .setPopup(new mapboxgl.Popup({ anchor: 'top', offset: 15 })
      .setHTML(`<span><strong>You are here !</span></strong>`))
    .addTo(map);


  //Create Markers for the Stations
  for (let i = 0; i <= 2; i++) {
    let latitudeStation = result.records[i].fields.coordonnees_geo[0]
    let longitudeStation = result.records[i].fields.coordonnees_geo[1]

    const otherMarkersContainer = document.createElement('div');
    otherMarkersContainer.id = 'marker';
    // Create a Marker and add it to the map.
    const stationsMarkers = new mapboxgl.Marker()
      .setLngLat([longitudeStation, latitudeStation])
      .setPopup(new mapboxgl.Popup({ anchor: 'top', offset: 15 })
        .setHTML(`<span><strong>${result.records[i].fields.name}</span></strong><br>
        <span><strong>Distance:</strong> ${Math.floor(result.records[i].fields.dist)} meters</span><br>`))
      /*<span>${printAddress()}</span>`))*/
      .addTo(map);
  }
}
//MAP END//

//SECTION GELOCALISE ME
//The function localiseMe() takes three parameters to locate someone with the browser : success, error, and options
function success(pos) {
  //A callback function that takes a GeolocationPosition object as parameter.
  //Save localisation into an object and get latitude and longitude
  var crd = pos.coords;
  let latitude = crd.latitude;
  let longitude = crd.longitude
  // Use getABike function with latitude and longitude in arguments
  transformPromise(latitude, longitude);
}

function error(err) {
  //An optional callback function that takes a GeolocationPositionError object as its sole input parameter.
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

var options = {
  // Asking accuracy in geolocalisation
  enableHighAccuracy: true,
  // Time in milliseconds to use error function.
  timeout: 5000,
  // If set to 0, it means that the device cannot use a cached position and
  //must attempt to retrieve the real current position.
  maximumAge: 0
};


function localiseMe() {
  //Ask the user for their geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);
  //initGauges();
  //getData()
}

//main()
