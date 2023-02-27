<template>
  <div class="body">
    <h4>Авторизация</h4>
    <p style="margin:auto; padding: 10px; width:15%"><input class="form-control"  type="text" placeholder="Email" v-model="email" /></p>
    <p style="margin:auto;  padding: 10px; width:15%"><input class="form-control" type="password" placeholder="Password" v-model="password" /></p>
    <p><button class="button"  @click="signIn">Войти</button></p>
  </div>
  </template>
  
  <script setup>
    import { ref } from 'vue'
    import firebase from 'firebase'
    import { useRouter } from 'vue-router' // import router
    const email = ref('')
    const password = ref('')
    const router = useRouter() // get a reference to our vue router
    const signIn = () => { // we also renamed this method
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value) // THIS LINE CHANGED
        .then((data) => {
          console.log('Successfully logged in!', data.user.email);
          router.push('/') // redirect to the feed
        })
        .catch(error => {
          console.log(error.code)
          alert(error.message);
        });
    }
  </script>
<style>
.body{
  margin:auto
}
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
  