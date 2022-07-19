<template>
  <v-container>
    <v-row class="grid-row">
      <v-col class="pa-3 grid">
      <div
        v-for="path, index in samplesPaths"
        :key="index"
        style="overflow: hidden;"
      >
        <v-card
          class="play-button"
          justify="center"
          style="box-sizing: border-box;"
          outlined
          :class="classPlaying(sampleName(path))"
          @click="playSample(path)"
        >
          <v-card-text style="display: table;" class="fill-height">
            <div style="vertical-align: middle; display: table-cell;" class="text-center">
              {{ sampleName(path) }}
            </div>
          </v-card-text>
        </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'SamplesPreviewView',
  components: { },
  data () {
    return {
      currentlyPlaying: []
    }
  },
  computed: {
    samplesPaths () {
      return this.$store.getters.resourcesIndex.samples
    }
  },
  methods: {
    playSample (path) {
      const audio = new Audio(require('@/' + path))
      this.currentlyPlaying.push(this.sampleName(path))
      audio.play()
      audio.addEventListener('ended', (event) => {
        this.currentlyPlaying = this.currentlyPlaying.filter(item => item !== this.sampleName(path))
      })
    },
    sampleName (path) {
      return path.split('/').at(-1).split('.')[0].trim()
    },
    classPlaying (sampleName) {
      if (this.currentlyPlaying.includes(sampleName)) {
        return 'playing'
      }
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0.8rem;
  column-gap: 0.8rem;
  box-sizing: border-box;
}

.play-button {
  aspect-ratio: 2/1 !important;
}

  .play-button div {
    /* display: block; */
    /* aspect-ratio: 2/1 !important; */
  }

.playing {
  background: #fcc !important;
}
</style>
