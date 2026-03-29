import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBsqsythZSeySNwGsdPiW2j42fM_GXcGDg",
    authDomain: "unitedhearts-e70e7.firebaseapp.com",
    projectId: "unitedhearts-e70e7",
    storageBucket: "unitedhearts-e70e7.firebasestorage.app",
    messagingSenderId: "186477059841",
    appId: "1:186477059841:web:de495b59fa2c2c0cfe4500",
    measurementId: "G-DSZTXZ0XGE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if (loggedInUserId){
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if (docSnap.exists()){
                const userData = docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserLName').innerText=userData.lastName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
            }
            else {
                console.log("no document found matching id")
            }
        }).catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not found in Local Storage");
    }
  })

  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href = 'index.html';
    })
    .catch((error)=>{
        console.error('Error loggin out', error);
    })
  })