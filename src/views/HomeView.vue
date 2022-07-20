<template>
  <v-container>
    <v-app-bar
      app
      flat
      class="app-bar white"
    >
      <!-- <v-app-bar-nav-icon @click.stop="navDrawerIsOpen = !navDrawerIsOpen" /> -->
      <v-row style="max-width: 400px; margin: auto;">
        <v-col class="text-center">
          <router-link to="/about-app">
            About this App
          </router-link>
        </v-col>
        <v-col class="text-center">
          <router-link to="/about-sonic-pi">
            What is Sonic Pi?
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar>

    <div class="text-center align-center logo-container">
      <v-img
        class="logo"
        src="https://sonic-pi.net/media/images/home/logo.png"
      />
      <p class="text-h4 mt-2">
        Sonic Pi
      </p>
      <p class="text-h5 mt-2">
        Companion
      </p>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'HomeView',
  components: { },
  data () {
    return { }
  },
  computed: {
    navDrawerIsOpen: {
      get () {
        return this.$route.hash === '#navDrawerIsOpen'
      },
      set (navDrawerIsOpen) {
        if (navDrawerIsOpen && this.$route.hash !== '#navDrawerIsOpen') {
          this.$router.replace('#navDrawerIsOpen')
        }
        if (!navDrawerIsOpen && this.$route.hash !== '') {
          this.$router.replace('')
        }
      }
    }
  }
}
</script>

<style scoped>
.logo-container {
  position: absolute;
  width: 100%;
  max-width: 256px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
