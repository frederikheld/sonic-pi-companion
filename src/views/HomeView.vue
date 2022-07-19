<template>
  <v-container>
    <v-row class="mt-12">
      <v-col class="text-center align-center">
        <v-img class="logo" src="https://sonic-pi.net/media/images/home/logo.png" />
        <h1>Tools for SonicPi</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'HomeView',
  components: { }
}
</script>

<style scoped>
.logo {
  width: 60%;
  max-width: 40rem;
  display: inline-block;
}
</style>
