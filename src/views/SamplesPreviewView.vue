<template>
  <v-container
    id="container"
    ref="container"
  >
    <v-app-bar
      app
      elevation="1"
      class="app-bar white"
    >
      <!-- <v-app-bar-nav-icon @click.stop="navDrawerIsOpen = !navDrawerIsOpen" /> -->
      <v-spacer />
      <!-- <v-btn
        icon
        @click="settingsMenuIsOpen = true"
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn> -->

      <!-- <template #extension> -->
      <v-slide-group
        v-model="activeSection"
        show-arrows
        center-active
      >
        <v-slide-item
          v-for="(items, type) in samples"
          :key="type"
          v-slot="{ active, toggle }"
          class="white"
        >
          <v-btn
            :href="'#' + type"
            :input-value="active"
            depressed
            rounded
            active-class="primary"
            @click="toggle"
          >
            {{ type }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <!-- </template> -->

      <v-spacer />
    </v-app-bar>

    <v-bottom-sheet v-model="settingsMenuIsOpen">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-card-text>
          <p>Nothing to see here</p>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <!-- <div style="width: 120px; display: flex;">
      <v-icon>mdi-speaker</v-icon>
      <v-switch v-model="multiplePlayback" style="width: 42px;"></v-switch>
      <v-switch prepend-icon="mdi-speaker" append-icon="mdi-speaker-multiple" v-model="multiplePlayback"></v-switch>
      <v-icon>mdi-speaker-multiple</v-icon>
    </div> -->

    <!-- <div style="position: fixed; top: 72px; right: 16px; background: #fcc; z-index: 100;">{{ activeSection }}</div> -->

    <section
      v-for="(item, type) in samples"
      :id="type"
      :key="type"
      :ref="'sample_' + type"
    >
      <v-row>
        <v-col class="pa-3 mt-4 mb-0">
          <span class="text-h5">{{ type }}</span>
        </v-col>
      </v-row>
      <v-row class="grid-row">
        <v-col class="grid">
          <div
            v-for="sample, sample_index in item"
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
              <v-card-text
                style="display: table;"
                class="fill-height pa-0"
              >
                <div
                  style="display: table-cell;"
                  class="text-center"
                >
                  <p class="title">
                    {{ sample.shortNameForHumans }}
                  </p>
                  <!-- <p class="subtitle">{{ sample.name }}</p> -->
                </div>
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
      activeSection: 0,
      sectionAnchors: [],
      settingsMenuIsOpen: false
    }
  },
  computed: {
    samples () {
      return this.$store.getters.samplesByType
    },
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
    // stopAllPlayback (sample) {

    // },
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
/* * /deep/ #container {
  scroll-behavior: smooth;
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
  border: 0.3rem solid var(--v-secondary-lighten4);
  background-color: var(--v-secondary-base);
  color: var(--v-secondary-lighten4);
  aspect-ratio: 1 !important;
  overflow: hidden;
  user-select: none;
}

  .play-button p {
    margin: 0;
  }

  .play-button .title {
    font-size: 140%;
    line-height: 140%;
  }

  .play-button .subtitle {
    font-size: 80%;
  }

  .play-button > * > div { /* v-card-text */
    background-color: none;
    color: var(--v-secondary-lighten4);
    /* color: #ccc; */
    vertical-align: middle;
    padding: 10%;
  }

.playing:first-child {
  border-color: var(--v-primary-base);
  background-color: var(--v-primary-lighten5);
}

  .play-button.playing > * {
    color: var(--v-primary-base);
  }

  .play-button.playing > * > div {
    color: var(--v-primary-base);
  }

/* .playback-toggle > * {
  float: left;
} */
</style>
