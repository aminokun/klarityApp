// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Configuration
const firebaseConfig = {
    apiKey: "AIzaSyADMFSZCGmUM_ZIsssY6IxNjFt8ght3mew",
    authDomain: "fir-auth-a1145.firebaseapp.com",
    projectId: "fir-auth-a1145",
    storageBucket: "fir-auth-a1145.appspot.com",
    messagingSenderId: "468075464013",
    appId: "1:468075464013:web:dec68200f7f1db1cc16304"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };