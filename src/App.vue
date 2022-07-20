<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="navDrawerIsOpen"
      app
    >
      <template #append>
        <v-list>
          <v-list-item
            link
            to="/about-app"
          >
            <v-list-item-action><v-icon>mdi-information-outline</v-icon></v-list-item-action>
            <v-list-item-title>About This App</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            to="/about-sonic-pi"
          >
            <v-list-item-action><v-icon>mdi-pi</v-icon></v-list-item-action>
            <v-list-item-title>What Is Sonic Pi?</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer> -->

    <v-bottom-navigation
      app
      fixed
      grow
      color="primary"
    >
      <v-btn to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn to="/samples-preview">
        <span>Samples</span>
        <v-icon>mdi-music</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
/* fixes bug with misplaced buttons in bottom-navigation
 * see: https://github.com/vuetifyjs/vuetify/issues/8067
*/
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  background: none;
  height: inherit;
}
</style>
