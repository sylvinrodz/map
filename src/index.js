import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFVCI7XyJyumFPFTnJZyeqC1NNetDmB7o",
    authDomain: "bluestarwebgl.firebaseapp.com",
    projectId: "bluestarwebgl",
    storageBucket: "bluestarwebgl.appspot.com",
    messagingSenderId: "86805401846",
    appId: "1:86805401846:web:ee285c05cbd5ef65ff5cd7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const markerCollection = collection(db,"markers");
  const markerSnapshot = await getDocs(markerCollection);
  
 

  // Webpack script
 function getVariable() {
    
      // Simulating an asynchronous operation with await
     var markers = []; 
       markerSnapshot.docs.forEach(element => {
        if(element)
        markers.push(element.data());
      });
      window.myVariable = markers;
    
  }
  
  getVariable();
  

  
 
  