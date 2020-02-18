// Unique Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAbhoGDmaK8ztsrmC6cOzTPLR_yVyW1Z58",
    authDomain: "fir-auth-tests-144f4.firebaseapp.com",
    databaseURL: "https://fir-auth-tests-144f4.firebaseio.com",
    projectId: "fir-auth-tests-144f4",
    appId: "1:965492895624:web:afe39facf6d1a6d304d43d",
    measurementId: "G-P3JVCY9WFP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//FB Auth and firestore ref.
const auth = firebase.auth();
const db = firebase.firestore();