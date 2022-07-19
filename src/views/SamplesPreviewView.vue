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
          :class="isPlaying(sampleName(path)) ? 'playing' : ''"
          @click="playSample(path)"
        >
          <v-card-text style="display: table;" class="fill-height">
            <div style="vertical-align: middle; display: table-cell;" class="text-center">
              {{ sampleName(path) }}
            </div>

            <div class="playing-indicator"></div>
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
    isPlaying (sampleName) {
      return this.currentlyPlaying.includes(sampleName)
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

.playing {
  background: #ccc;
}

/* CSS ANIMATION */
.playing .playing-indicator {
  position: absolute;
  right: 0.9rem;
  bottom: 0.4rem;

  width: 0.3rem;
  height: 1.0rem;
  border-radius: 0.15rem;
  display: block;
  margin-left: 0.5rem;
  color: #fff;
  background-color: currentColor;
  box-sizing: border-box;
  animation: animloader 0.3s 0.3s linear infinite alternate;
}

.playing .playing-indicator::after,
.playing .playing-indicator::before {
  content: '';
  background-color: currentColor;
  box-sizing: border-box;
  width: 0.3rem;
  height: 1.0rem;
  border-radius: 0.15rem;
  position: absolute;
  bottom: 0;
  left: 0.4rem;
  animation: animloader1 0.3s  0.45s  linear infinite alternate;
  transition: background-color 0.4s linear;
}

.playing .playing-indicator::before {
  left: -0.4rem;
  animation-delay: 0s;
}

@keyframes animloader {
  0% {
    height: 1.0rem;
  }
  100% {
    height: 0.4rem;
  }
}

@keyframes animloader1 {
  0% {
    height: 1.0rem;
  }
  100% {
    height: 0.2rem;
  }
}
</style>
