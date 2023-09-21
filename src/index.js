import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

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

//get Marker from Database
const markerCollection = collection(db, "markers");
const statusQuery = query(markerCollection,where("status", "==", true));
const markerSnapshot = await getDocs(statusQuery);

var product = document.getElementById('product');
var division = document.getElementById('division');
product.style.display = 'none';
var selectedDivision = undefined;
var selectedProduct = undefined;
var selectedState = undefined;
// Initialize the map
var map = L.map("map", {
  
  minZoom: 4,
  maxZoom: 12,
  zoomControl: false
});
map.setView([23.0760, 65.9629], 4.4);
// Create cluster options
var clusterOptions = {
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
};

// Create a marker cluster group with custom options
var markerCluster = L.markerClusterGroup(clusterOptions);

//Browser Compatibility
if (L.Browser.ielt9) {
  alert("Hello, Upgrade your browser!");
}

//Add Zoome buttons position
// map.zoomControl.setPosition("topright");

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
var blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
var yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Getting Markers and Add Markers
var markers = [];
const addMarker = async (markerSnapshot)=>{
  markers = [];
  var icon;
  await markerSnapshot.docs.forEach((element) => {
    
    if (element) {
      element = element.data();
     
      if(element.division){
        if(element.division === "Commercial Air Conditioning"){
            icon = greenIcon;
        }else if(element.division === "MEP Projects") {
          icon = yellowIcon;
        }else if(element.division === "Service Projects"){
          icon = blueIcon;
        }
        markers.push(
          L.marker([element.lat, element.long], { icon: icon }).on('click', (e)=> {
            viewPDF(element);
        })
        );
      }
      
    }
  });

  markerCluster.clearLayers();
markerCluster.addLayers(markers);
map.addLayer(markerCluster);

// .bindPopup(
//   "<h5>" +
//     element.city +
//     '</h5> <br /> <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pdfModal" onclick=\"(viewPDF(\'' + element.file  + '\'))"\>View PDF</button>'
// )

}

  addMarker(markerSnapshot);

//get State 
var states = [];
var stateSelect = document.getElementById('stateSelect');
var showAll = document.getElementById('showAll');
var submit = document.getElementById('submit');
const getState = async () => {
  const response = await fetch('assets/json/india.json');
  const jsonresp = await response.json(); //extract JSON from the http response
  states = jsonresp[0].states;
  for(var i=0; i<states.length; i++){
    stateSelect.options[stateSelect.options.length] = new Option(states[i].name, states[i].id);
 }
}
 getState();


//get data based on state
const showAllMarker = async () => {
  let markerSnapshotLocal = await getDocs(statusQuery);
  addMarker(markerSnapshotLocal);
  map.setView([23, 78.9629], 5);
}

const onStateChange = async () => {
  if(stateSelect.value != 0)
  selectedState = states.find((res)=> res.id == stateSelect.value);
  else
  selectedState = undefined;

  // let Query;
  // let markerSnapshotLocal;
  // if(stateSelect.value != "Select State"){
    
  //   if(selectedProduct != 0 && selectedProduct != undefined){
  //     Query = query(markerCollection,where("product", "==", selectedProduct),where("state", "==", selectedState.name),where("division", "==", selectedDivision),where("status", "==", true));
  //   }else if(selectedDivision != 0 && selectedDivision != undefined){
  //     Query = query(markerCollection,where("division", "==", selectedDivision),where("state", "==", selectedState.name),where("status", "==", true));
  //   }else{
  //     Query = query(markerCollection,where("state", "==", selectedState.name),where("status", "==", true));
  //   }

  //   //   markerSnapshotLocal = await getDocs(Query);
  //   //  addMarker(markerSnapshotLocal);
  //   //  map.setView([selectedState.latitude, selectedState.longitude], 7);
  // }
}

const submitClick = async ()=>{
   let Query;
  let markerSnapshotLocal;
  if(selectedProduct && selectedDivision && selectedState){
    Query = query(markerCollection,where("product", "==", selectedProduct),where("state", "==", selectedState.name),where("division", "==", selectedDivision),where("status", "==", true));
  
  }else if(selectedDivision && selectedState){
    Query = query(markerCollection,where("division", "==", selectedDivision),where("state", "==", selectedState.name),where("status", "==", true));
    
  }else if(selectedProduct && selectedDivision){
    Query = query(markerCollection,where("division", "==", selectedDivision),where("product", "==", selectedProduct),where("status", "==", true));
  }else if(selectedState){
    Query = query(markerCollection,where("state", "==", selectedState.name),where("status", "==", true));
 
  }else if(selectedDivision){
    Query = query(markerCollection,where("division", "==", selectedDivision),where("status", "==", true));
 
  }
  
      markerSnapshotLocal = await getDocs(Query);
     addMarker(markerSnapshotLocal);
     if(selectedState)
     map.setView([selectedState.latitude, selectedState.longitude], 7);
}
stateSelect.addEventListener("change", onStateChange);
showAll.addEventListener("click",showAllMarker);
submit.addEventListener("click",submitClick)
//Animation
$(".start").click(function(){
  $(".leftContainer").addClass("hidden");
  setTimeout(() => {
    $(".sideborder").addClass("hidden");
    $(".coverAll").css("display", "none");
    
  }, 500);
  setTimeout(()=>{
    $(".selectStyle").css("opacity", 1);
    L.control.zoom({
      position: 'topright'
  }).addTo(map);
  map.setView([23, 78.9629], 5);
  },1000)
});



const onDivisionChange = async (event) =>{
  // let Query;
  // let markerSnapshotLocal;
  let value = event.target.value;
  if(value != 0){
    selectedDivision = value;
  if(value === "Commercial Air Conditioning"){
   
    product.style.display = 'block';
  }else{
    selectedProduct = undefined;
    product.style.display = 'none';
  }
  }else{
    selectedDivision = undefined;
  }
  
  // Query = query(markerCollection,where("division", "==", value),where("status", "==", true));
  // markerSnapshotLocal = await getDocs(Query);
  // addMarker(markerSnapshotLocal);
  // map.setView([23, 78.9629], 5);
}
const onProductChange = async (event) =>{
  // let Query;
  // let markerSnapshotLocal;
  let value = event.target.value;
  if(value != 0){
  selectedProduct = value;
  }else{
    selectedProduct = undefined;
  }
  // Query = query(markerCollection,where('division','==',selectedDivision),where("product", "==", value),where("status", "==", true));
  // markerSnapshotLocal = await getDocs(Query);
  // addMarker(markerSnapshotLocal);
  // map.setView([23, 78.9629], 5);
}
division.onchange = onDivisionChange;
product.onchange = onProductChange;