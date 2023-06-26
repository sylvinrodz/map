

// Initialize the map

var map = L.map('map' ,{
  zoomSnap: 0.25,
  minZoom: 5,
  maxZoom:12,
}).setView([23, 78.9629], 5);

// Add the tile layer (you can choose a different provider)

map.zoomControl.setPosition('topright');

L.tileLayer('https://api.mapbox.com/styles/v1/sylvinrodz/clj70cpof004q01pi9nn232on/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3lsdmlucm9keiIsImEiOiJjbGo3M213MHEwdm8xM2ZwODlvNXE1bGZ0In0.2Psl-NMh_wXOm9YKl9StjQ', {
  attribution: 'Map data © <a href="https://www.skilliza.com">Skilliza</a> contributors',
  id: 'mapbox://styles/sylvinrodz/clj70cpof004q01pi9nn232on', // Replace with your Mapbox style ID
  accessToken: 'pk.eyJ1Ijoic3lsdmlucm9keiIsImEiOiJjbGo3M213MHEwdm8xM2ZwODlvNXE1bGZ0In0.2Psl-NMh_wXOm9YKl9StjQ'
}).addTo(map);
  // Create a custom icon for markers
  var markerCluster = L.markerClusterGroup({spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
      maxClusterRadius:300
  });

  const waitForVariable = () =>
  new Promise((resolve) => {
    const checkVariable = () => {
      if (window.myVariable) {
        resolve(window.myVariable);
      } else {
        setTimeout(checkVariable, 100); // Check again after a short delay
      }
    };

    checkVariable();
  });
var markers1 = [];
const useVariable = async () => {
  const variable = await waitForVariable();
 await variable.forEach(element => {
    
    markers1.push(L.marker([element.lat, element.long], { icon: greenIcon }).bindPopup('<h5>'+element.city+'</h5> <br /> <button class="btn btn-primary" onclick="handleButtonClick()">View PDF</button>' ))
  });
  markerCluster.addLayers(markers1);
  map.addLayer(markerCluster);
};
useVariable();
console.log(markers1);
if (L.Browser.ielt9) {
  alert('Hello, Upgrade your browser!');
}
  var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
// Create an array of markers
// var markers1 = [
//     L.marker([19.0760, 72.8777], { icon: greenIcon }).bindPopup('<h5>Mumbai</h5> <br /> <button class="btn btn-primary" onclick="handleButtonClick()">View PDF</button>' ),
//     L.marker([18.5204, 73.8567], { icon: greenIcon }).bindPopup('<h5>Pune</h5> <br /> <button class="btn btn-primary" onclick="handleButtonClick()">View PDF</button>' ),
//     L.marker([21.1458, 79.0882], { icon: greenIcon }).bindPopup('<h5>Nagpur</h5> <br /> <button class="btn btn-primary" onclick="handleButtonClick()">View PDF</button>' ),
//     L.marker([22.5726, 88.3639], { icon: greenIcon }).bindPopup('<h5>Kolkata</h5> <br /> <button class="btn btn-primary" onclick="handleButtonClick()">View PDF</button>' ),
//     L.marker([17.3850, 78.4867], { icon: greenIcon }).bindPopup('<h5>Hyderabad</h5> <br /> <button class="btn btn-primary" onclick="handleButtonClick()">View PDF</button>' ),
//   ];

  // Create a marker cluster group

  
  // Add markers to the cluster group
  
  
  // Add the cluster group to the map
 

  // Create cluster options
  var clusterOptions = { spiderfyOnMaxZoom: true, showCoverageOnHover: true, zoomToBoundsOnClick: true };
  
  // Create a marker cluster group with custom options
  var markerCluster = L.markerClusterGroup(clusterOptions);
  