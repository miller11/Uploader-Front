<template>
  <div>
    <u-navbar></u-navbar>


    <router-view></router-view>

    <u-footer></u-footer>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'startbootstrap-modern-business/css/modern-business.css'

  import 'startbootstrap-modern-business/vendor/jquery/jquery.min'
  import 'startbootstrap-modern-business/vendor/bootstrap/js/bootstrap.bundle.min'

  import Navbar from "./components/Navbar";
  import Footer from './components/Footer';

  export default {
    name: 'app',
    components: {
      uNavbar: Navbar,
      uFooter: Footer
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style>
  html,body{
    height: 100%
  }
</style>
