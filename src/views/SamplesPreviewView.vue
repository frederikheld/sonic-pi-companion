<template>
  <v-container>
    <!-- <v-row>
      <v-col>
        <pre style="height: 300px; overflow-y: scroll;">{{ $store.getters.samplesByType }}</pre>
      </v-col>
    </v-row> -->
    <div v-for="(samples, type) in samples" :key="type">
      <v-row>
        <v-col class="pa-3">
          <h3 class="width: 100%;">{{ type }}</h3>
        </v-col>
      </v-row>
      <v-row  class="grid-row">
        <v-col class="pa-3 grid">
          <div
            v-for="sample, sample_index in samples"
            :key="sample_index"
            style="overflow: hidden; width: 100%;"
          >
            <v-card
              class="play-button"
              justify="center"
              style="box-sizing: border-box;"
              outlined
              :class="isPlaying(sample) ? 'playing' : ''"
              @click="playSample(sample)"
            >
              <v-card-text style="display: table;" class="fill-height">
                <div style="vertical-align: middle; display: table-cell;" class="text-center">
                  {{ sample.shortNameForHumans }}
                </div>

                <!-- <div class="playing-indicator"></div> -->
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
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
    samples () {
      return this.$store.getters.samplesByType
    }
  },
  methods: {
    playSample (sample) {
      const audio = new Audio(require('@/' + sample.path))
      this.currentlyPlaying.push(sample.name)
      audio.play()
      audio.addEventListener('ended', (event) => {
        this.currentlyPlaying = this.currentlyPlaying.filter(item => item !== sample.name)
      })
    },
    isPlaying (sample) {
      return this.currentlyPlaying.includes(sample.name)
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 0.8rem;
  column-gap: 0.8rem;
  box-sizing: border-box;
}

.play-button {
  border: 0.3rem solid #ccc;
  background-color: #666;
  color: #ccc;
  aspect-ratio: 1 !important;
  overflow: hidden;
}

  .play-button * {
    background-color: none;
    color: #ccc;
  }

.playing:first-child {
  border-color: red;
  background-color: #422;
}

  .playing * {
    color: red;
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
