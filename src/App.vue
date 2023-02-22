<template>
  <header>
    <Navbar />
  </header>
  <main class="main-bg">
    <router-view />
  </main>
   <footer class="bg-color footer-class text-light">
    © 2023 Woviez. All rights reserved
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>

<style lang="scss">

.bg-color{
  background-color: #FF4136;
}
.main-bg{
background-color: #000000
}

@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
