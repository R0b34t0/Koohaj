<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
  <div id="nav">
    <Navbar />
    <Home />
<<<<<<< HEAD
=======
    <!-- <Unos /> -->
>>>>>>> development
  </div>

</template>

<script>
// const firebase = require("firebase");

import Navbar from './views/Navbar'
import Home from './components/Home'
<<<<<<< HEAD
=======
import Unos from './components/Unos'
>>>>>>> development

export default {
    components:{
    Navbar,
    Home,
<<<<<<< HEAD
=======
    Unos,// izbrisat 
>>>>>>> development
  },
    
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}


</style>