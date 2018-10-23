<template>

  <div>
    <!-- Navigation -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">Uploader</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">


          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="isPhotoOwner">
              <a class="nav-link" href="">Manage Albums</a>
            </li>

            <li class="nav-item" v-if="!currentUser">
              <a class="nav-link" @click="login" >Login</a>
            </li>
            <li class="nav-item" >
              <a class="nav-link" @click="logout" ></a>
            </li>

            <li class="nav-item dropdown" v-if="currentUser">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownPortfolio" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ currentUser.displayName }}
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
                <a class="dropdown-item" href="portfolio-1-col.html">Manage Albums</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="logout">Log Out</a>
              </div>
            </li>



          </ul>
        </div>
      </div>
    </nav>

    <header>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <!-- Slide One - Set the background image for this slide in the line below -->
          <div class="carousel-item active" style="background-image: url('https://storage.googleapis.com/www.ic-miller.net/images/Big%20Stopper.jpg')">
            <div class="carousel-caption d-none d-md-block">
              <!--<h3>First Slide</h3>-->
              <p>Waimea bay</p>
            </div>
          </div>
          <!-- Slide Two - Set the background image for this slide in the line below -->
          <div class="carousel-item" style="background-image: url('https://storage.googleapis.com/www.ic-miller.net/images/Colton-Butterfly.jpg')">
            <div class="carousel-caption d-none d-md-block">
              <!--<h3>Second Slide</h3>-->
              <p>Colton swimming butterfly</p>
            </div>
          </div>
          <!-- Slide Three - Set the background image for this slide in the line below -->
          <div class="carousel-item" style="background-image: url('https://storage.googleapis.com/www.ic-miller.net/images/Milky%20Way-XL.jpg')">
            <div class="carousel-caption d-none d-md-block">
              <!--<h3>Third Slide</h3>-->
              <p>Milky way picture taken in Hawaii</p>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </header>

    <!-- Page Content -->
    <div class="container">

      <h1 class="my-4">Welcome to Bob's Photos</h1>

      <div class="row">
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">Choir Night</a>
              </h4>
              <p class="card-text">Photos from choir night. </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">Christmas 2018</a>
              </h4>
              <p class="card-text">Photos taken at Christmas 2018.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">New York 2018</a>
              </h4>
              <p class="card-text">Pictures taken on New York Trip 2018.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">Senior Photos</a>
              </h4>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">Iowa Football</a>
              </h4>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-6 portfolio-item">
          <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">Hawaii</a>
              </h4>
              <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->

      <!-- Features Section -->
      <div class="row">
        <div class="col-lg-6">
          <h2>About Bob</h2>
          <p>Bob shoots with:</p>
          <ul>
            <li>Nikon</li>
            <li>Something</li>
            <li>Something</li>
            <li>Working contact form with validation</li>
            <li>Unstyled page elements for easy customization</li>
          </ul>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, omnis doloremque non cum id reprehenderit, quisquam totam aspernatur tempora minima unde aliquid ea culpa sunt. Reiciendis quia dolorum ducimus unde.</p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid rounded" src="http://placehold.it/700x450" alt="Family Picture">
        </div>
      </div>
      <!-- /.row -->

      <hr>

      <!-- Call to Action Section -->
      <div class="row mb-4">
        <div class="col-md-8">
          <p>These photos are property of the photographer and this website and may only be used with permission.</p>
        </div>
        <div class="col-md-4">
          <a class="btn btn-lg btn-secondary btn-block" href="#">Contact</a>
        </div>
      </div>

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Uploader 2018</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'startbootstrap-modern-business/css/modern-business.css'

  import 'startbootstrap-modern-business/vendor/jquery/jquery.min'
  import 'startbootstrap-modern-business/vendor/bootstrap/js/bootstrap.bundle.min'

  import Firebase from 'firebase'
  import {provider} from "./firebaseConfig";
  import {store} from './store/store';

  Firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.dispatch('setUser', user);
    } else {
      store.dispatch('setUser', null);
      store.dispatch('setIsPhotoOwner', false);
    }
  });

  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      login() {
        Firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          Firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                store.dispatch('setIsPhotoOwner', true);
              }
            })
            .catch((error) => {
              console.log(error);
            });


        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...

          alert("Sorry " + email + "was a problem signing in. " + errorMessage);
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

<style>

</style>
