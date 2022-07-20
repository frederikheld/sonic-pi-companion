<template>
  <v-container>
    <v-app-bar app flat class="app-bar white">
      <v-app-bar-nav-icon @click.stop="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-row>
      <v-col>
        <p class="text-h4">What is SonicPi?</p>
        <p>Quoting from the SonicPi website:</p>
        <cite>
          <p>Sonic Pi is a code-based music creation and performance tool.</p>
          <p><span class="primary--text">Simple</span> enough for computing and music lessons.</p>
          <p><span class="primary--text">Powerful</span> enough for professional musicians.</p>
          <p><span class="primary--text">Free</span> to download with a friendly tutorial.</p>
          <p><span class="primary--text">Diverse</span> community of over 2 million live coders.</p>
        </cite>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn href="https://sonic-pi.net/" target="_blank" class="mx-auto primary">Learn more about SonicPi</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutSonicPiView'
}
</script>

<style scoped>
cite p {
  margin: 0;
}
</style>
