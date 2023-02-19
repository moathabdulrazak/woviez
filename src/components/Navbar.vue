<template>
  <nav class="navbar navbar-expand-lg bg-color px-3 ">
    <router-link class="" :to="{ name: 'Home' }">
      <div class="">
        <img class="img-size" alt="logo" src="src\assets\img\favpng_movie-logo.png" height="45" />
      </div>
    </router-link>



    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'show' }" class="btn text-light lighten-30 selectable text-uppercase">
           Tv shows
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue'
export default {
  setup() {
    return {
      
    }
  },
  components: { Login }
}
</script>

<style scoped>
.bg-color{
background-color: #FF4136;
}

.img-size{
  height: 3em;
  width: 3em;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

</style>
