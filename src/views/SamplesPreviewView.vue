<template>
  <v-container ref="container" id="container">
    <v-app-bar app class="app-bar">
      <v-slide-group v-model="activeSection" show-arrows>
        <v-slide-item v-for="(samples, type) in samples" :key="type" v-slot="{ active, toggle }">
          <v-btn :href="'#' + type" @click="toggle" :input-value="active" depressed rounded active-class="primary">{{ type }}</v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-app-bar>

    <!-- <div style="width: 120px; display: flex;">
      <v-icon>mdi-speaker</v-icon>
      <v-switch v-model="multiplePlayback" style="width: 42px;"></v-switch>
      <v-switch prepend-icon="mdi-speaker" append-icon="mdi-speaker-multiple" v-model="multiplePlayback"></v-switch>
      <v-icon>mdi-speaker-multiple</v-icon>
    </div> -->

    <!-- <div style="position: fixed; top: 72px; right: 16px; background: #fcc; z-index: 100;">{{ activeSection }}</div> -->

    <section v-for="(samples, type) in samples" :key="type" :id="type" :ref="'sample_' + type">
      <v-row>
        <v-col class="pa-3 mt-4 mb-0">
          <span class="text-h5">{{ type }}</span>
        </v-col>
      </v-row>
      <v-row class="grid-row">
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

                <div class="playing-indicator"></div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>

export default {
  name: 'SamplesPreviewView',
  components: { },
  data () {
    return {
      currentlyPlaying: [],
      multiplePlayback: true,
      activeSection: undefined,
      sectionAnchors: []
    }
  },
  computed: {
    samples () {
      return this.$store.getters.samplesByType
    }
  },
  mounted () {
    this.sectionAnchors = this.getSectionAnchors()
    this.setScrollEventListener(this.sectionAnchors)
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
    stopAllPlayback (sample) {

    },
    isPlaying (sample) {
      return this.currentlyPlaying.includes(sample.name)
    },
    getSectionAnchors () {
      const sections = []
      Object.entries(this.$refs).forEach(([key, value]) => {
        if (key.split('_')[0] === 'sample') {
          sections.push(value[0])
        }
      })
      return sections
    },
    setScrollEventListener (elements) {
      document.addEventListener('scroll', () => {
        function pageIsScrolledToBottom (margin) {
          const scrollMaxY = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          )
          return scrollY > scrollMaxY - visualViewport.height - margin
        }

        const margin = 48
        if (pageIsScrolledToBottom(margin)) {
          this.activeSection = this.sectionAnchors.findIndex(item => item.id === elements.at(-1).getAttribute('id'))
          return
        }

        elements.forEach(el => {
          if (scrollY >= el.offsetTop - el.clientHeight / 6) {
            // v-slide-item uses the index of the item for active state,
            // so we have to find the index of that element's id in our array:
            this.activeSection = this.sectionAnchors.findIndex(item => item.id === el.getAttribute('id'))
          }
        })
      })
    }
  }
}
</script>

<style scoped>

#container {
  scroll-behavior: smooth;
}
/* APP BAR */

/* .app-bar /deep/ .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
} */

section {
  display: block !important;
}

/* .app-bar {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  /* width: 100%; */
  /* background: red; */
/* } */

/* .app-bar .quick-access-links { }

.app-bar .playback-toggle {
  align-content: right;
} */

/* .app-bar-container .playback-toggle > div {
  width: 200px;
  background-color: #422;
} */

/* DRUM PADS */

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 0.8rem;
  column-gap: 0.8rem;
  box-sizing: border-box;
}

@media screen and (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 790px) {
  .grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (min-width: 960px) {
  .grid {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (min-width: 1264px) {
  .grid {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media screen and (min-width: 1904px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

section {
  scroll-margin-top: 3.2rem;
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
  border-color: #f33;
  background-color: #422;
}

  .playing * {
    /* color: #f33; */
  }

.playback-toggle {
  /* display: inline; */
  /* white-space: nowrap; */
}

.playback-toggle > * {
  /* display: inline; */
  float: left;
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
