<template>
  <v-container>
    <v-app-bar
      app
      flat
      class="app-bar white"
    >
      <v-app-bar-nav-icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>

    <v-row>
      <v-col>
        <p class="text-h4">
          This App
        </p>
        <p>This app provides useful tools that you can use while you're with SonicPi. It is free to use.</p>
        <!-- <p>It is designed to work on smartphones and tablets, but is available as a webapp as well.</p> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-h4">
          The Author
        </p>
        <p>This app is being developed by Frederik Held, a fellow SonicPi musician.</p>
        <!-- <p> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
          href="https://frederikheld.de/"
          target="_blank"
          class="mx-auto mt-n4 mb-4 primary"
        >
          Meet Frederik
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <p class="text-h4">Contribute</p>
        <p>This app is being developed by Frederik Held, a fellow SonicPi musician.</p>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: 'AboutAppView'
}
</script>

<style scoped>
cite p {
  margin: 0;
}
</style>
