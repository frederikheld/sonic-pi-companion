<template>
  <v-app>
    <v-navigation-drawer v-model="navDrawerIsOpen" app absolute class="pt-12">
      <v-list>
        <v-list-item-group>
          <v-list-item link to="/about">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <!-- <v-spacer />
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>Test</v-list-item-title>
          </v-list-item>
        </v-list-item-group> -->
      </v-list>
    </v-navigation-drawer>

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
