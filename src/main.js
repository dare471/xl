import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'


/* code from our Firebase console */
var firebaseConfig = {
    apiKey: "AIzaSyBi8NTvEqyymrtgwiuhLPnD2uKrzVvEoLQ",
    authDomain: "agtechkz-b340e.firebaseapp.com",
    projectId: "agtechkz-b340e",
    storageBucket: "agtechkz-b340e.appspot.com",
    messagingSenderId: "1035028867657",
    appId: "1:1035028867657:web:f181648a14c37bb1366d98",
    measurementId: "G-FD68LX405Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**/
createApp(App).use(store).use(router).mount('#app')
