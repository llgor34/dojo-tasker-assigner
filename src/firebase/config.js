import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: // your apiKey
  authDomain: // yourAuthdomain
  projectId: // yourProjectId
  storageBucket: // yourStorageBucket
  messagingSenderId: // yourMessagingSenderId
  appId: // yourAppId
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
