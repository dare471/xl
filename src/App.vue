<template>
  <nav>
    <span v-if="isLoggedIn">
      <router-link to="/">Клиенты</router-link> | <router-link to="/provider">Поставщики</router-link>     
      <button class="button"  @click="signOut">Выйти</button>     
    </span>
    <span v-else>
           
    </span>
    
  </nav>
  <router-view/>
</template>
<script setup>  
import { ref } from 'vue' // used for conditional rendering  
import firebase from 'firebase'  
import { useRouter } from 'vue-router'  
import store from '@/store/index.js';
const router = useRouter()  
const isLoggedIn = ref(true)  // runs after firebase is initialized  
  firebase.auth().onAuthStateChanged(function(user) {      
    if (user) {              isLoggedIn.value = true // if we have a user 

      store.dispatch('userEmail', user.email)
      console.log(store.getters.email)    
    } else {        
        isLoggedIn.value = false // if we do not  
        console.log(isLoggedIn.value)    
        router.push('/login')  
        } 
    })  
    const signOut = () => {    
      firebase.auth().signOut()    
      router.push('/')  
    }
</script>
<style>
.button {
  margin:auto;
  background-color: #4CAF50; /* Green */
  border: none;
  border-radius: 5px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -webkit-user-select: none; 
      -webkit-touch-callout: none; 
      -moz-user-select: none; 
      -ms-user-select: none; 
      user-select: none;    
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
