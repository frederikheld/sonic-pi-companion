<template>
  <v-container style="max-width: 600px;">
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
        <p><em>Sonic Pi Companion</em> provides useful tools that makes support working with Sonic Pi. It is free to use, but with no warranty given.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-h6">
          Contribute
        </p>
        <p>The source code is publicly available on GitHub. You are very much invited to contribute your ideas, improvements or new features. Visit the repository on GitHub to learn how you can contribute.</p>
        <!-- <p>It is designed to work on smartphones and tablets, but is available as a webapp as well.</p> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
          href="https://github.com/frederikheld/sonic-pi-companion"
          target="_blank"
          class="mx-auto mt-n4 mb-4 primary"
        >
          Go to GitHub
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-h6">
          The Author
        </p>
        <p><em>Sonic Pi Companion</em> is being developed and maintained by Frederik Held, a fellow Sonic Pi musician.</p>
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
    <v-row>
      <v-col>
        <p class="text-h6">
          Version
        </p>
        <p>Current version is {{ $store.getters.currentAppVersion }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-h6">
          Credits
        </p>
        <p>
          Sonic Pi logo used by <a
            href="https://twitter.com/samaaron/status/1550052327259783169"
            target="_blank"
          >permission of Sonic Pi</a>.
        </p>
        <p>
          Uses samples from Sonic Pi which were originally published under <a
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
          >CC0 License</a> by <a
            href="https://freesound.org"
            target="_blank"
          >freesound.org</a>. See <a
            href="https://github.com/sonic-pi-net/sonic-pi/blob/dev/etc/samples/README.md"
            target="_blank"
          >this document</a> for details.
        </p>
      </v-col>
    </v-row>
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
