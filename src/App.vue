<template>
  <!-- <v-app style="overflow-x: hidden"> -->
  <v-app>
    <v-bottom-navigation
      app
      fixed
      grow
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

<style scoped>
/* fixes bug with misplaced buttons in bottom-navigation
 * see: https://github.com/vuetifyjs/vuetify/issues/8067
*/
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  background: none;
  height: inherit;
}
</style>
