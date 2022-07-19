<template>
  <div class="grid">
    <button  v-for="path, index in samplesPaths" :key="index"
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

    }
  },
  computed: {
    samplesPaths () {
      return this.$store.getters.resourcesIndex.samples
    }
  },
  methods: {
    playSample (path) {
      console.log('playing sample', path)
      const audio = new Audio(require('@/' + path))
      audio.play()
    },
    sampleName (path) {
      return path.split('/').at(-1).split('.')[0]
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
</style>
