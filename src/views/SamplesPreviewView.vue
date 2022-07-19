<template>
  <div class="grid">
    <button  v-for="path, index in samplesPaths" :key="index" :class="classPlaying(sampleName(path))"
      class="play-sample"
      @click="playSample(path)"
    >
      {{ sampleName(path) }}
    </button>
  </div>
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
      return path.split('/').at(-1).split('.')[0]
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
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.4rem;
  row-gap: 0.4rem;
}
button.play-sample {
  aspect-ratio: 2/1;
}

button.playing {
  background: #fcc;
}
</style>
