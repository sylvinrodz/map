import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFVCI7XyJyumFPFTnJZyeqC1NNetDmB7o",
  authDomain: "bluestarwebgl.firebaseapp.com",
  projectId: "bluestarwebgl",
  storageBucket: "bluestarwebgl.appspot.com",
  messagingSenderId: "86805401846",
  appId: "1:86805401846:web:ee285c05cbd5ef65ff5cd7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const markerCollection = collection(db, "markers");
const markerSnapshot = await getDocs(markerCollection);

// Initialize the map
var map = L.map("map", {
  zoomSnap: 0.25,
  minZoom: 5,
  maxZoom: 12,
}).setView([23, 78.9629], 5);

//Browser Compatibility
if (L.Browser.ielt9) {
  alert("Hello, Upgrade your browser!");
}

//Add Zoome buttons position
map.zoomControl.setPosition("topright");

// Add the tile layer (Mapbox)
L.tileLayer(
  "https://api.mapbox.com/styles/v1/sylvinrodz/clj70cpof004q01pi9nn232on/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3lsdmlucm9keiIsImEiOiJjbGo3M213MHEwdm8xM2ZwODlvNXE1bGZ0In0.2Psl-NMh_wXOm9YKl9StjQ",
  {
    attribution:
      'Map data © <a href="https://www.skilliza.com">Skilliza</a> contributors',
    id: "mapbox://styles/sylvinrodz/clj70cpof004q01pi9nn232on", // Replace with your Mapbox style ID
    accessToken:
      "pk.eyJ1Ijoic3lsdmlucm9keiIsImEiOiJjbGo3M213MHEwdm8xM2ZwODlvNXE1bGZ0In0.2Psl-NMh_wXOm9YKl9StjQ",
  }
).addTo(map);

// Custome Icons
var greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Getting Markers
var markers = [];
await markerSnapshot.docs.forEach((element) => {
  if (element) {
    element = element.data();
    console.log(element);
    markers.push(
      L.marker([element.lat, element.long], { icon: greenIcon }).bindPopup(
        "<h5>" +
          element.city +
          '</h5> <br /> <button class="btn btn-primary" onclick=\"(viewPDF(\'' + element.file  + '\'))"\>View PDF</button>'
      )
    );
  }
});

// Create cluster options
var clusterOptions = {
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
};

// Create a marker cluster group with custom options
var markerCluster = L.markerClusterGroup(clusterOptions);

markerCluster.addLayers(markers);
map.addLayer(markerCluster);
