<template>
  <v-container>
    <v-app-bar
      app
      flat
      class="app-bar white"
    >
      <v-app-bar-nav-icon @click.stop="navDrawerIsOpen = !navDrawerIsOpen" />
    </v-app-bar>

    <v-row class="mt-12">
      <v-col class="text-center align-center">
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
      </v-col>
    </v-row>
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
.logo {
  width: 60%;
  max-width: 40rem;
  display: inline-block;
}
</style>
