<template>
  <!-- Navigation -->
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="index.html">Bob's Photos</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">


        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!currentUser">
            <a class="nav-link" @click="login" >Login</a>
          </li>


          <li class="nav-item dropdown" v-if="currentUser">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownPortfolio" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ currentUser.displayName }}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
              <router-link :to="{name: 'albumsLink'}"><a class="dropdown-item">Manage Albums</a></router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="logout">Log Out</a>
            </div>
          </li>



        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import Firebase from 'firebase'
  import {provider} from "../firebaseConfig";
  import {store} from '../store/store';

  Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.dispatch('setUser', user);

      Firebase.auth().currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          // Confirm the user is an Admin.
          if (!!idTokenResult.claims.photoOwner) {
            // Show admin UI.
            store.dispatch('setIsPhotoOwner', true);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      store.dispatch('setUser', null);
      store.dispatch('setIsPhotoOwner', false);
    }
  });

    export default {
        name: "Navbar",
      methods: {
        login() {
          Firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...



          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...

            console.log("Sorry " + email + " there was a problem signing in. " + errorMessage);
          });

        },
        logout() {
          Firebase.auth().signOut().then(function () {
            alert('logged out');
          }).catch(function (error) {
            alert('Error logging out ' + error.message)
          })
        }
      },
      computed: {
        currentUser() {
          return this.$store.getters.currentUser
        },
        isPhotoOwner() {
          return this.$store.getters.photoOwner
        }
      }
    }
</script>

<style scoped>

</style>
