<template>
  <div class="canvas"></div>
</template>

<script>
import Quagga from 'quagga';

export default {
  props: {
    threshold: {
      type: Number,
      default: 0.11,
    },

    waitMs: {
      type: Number,
      default: 1000,
    }
  },

  data: () => ({
    canDetect: true,
  }),

  methods: {
    onCodeDetected: function(data) {
      if (!this.canDetect || data.codeResult.startInfo.error > this.threshold) {
        return;
      }

      this.canDetect = false;
      this.$emit('code-detected', data);
      setTimeout(() => this.canDetect = true, this.waitMs);
    },
  },

  mounted: function() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: this.$el
      },
      decoder: {
        readers: [
          'ean_reader',
        ],
      },
    }, (err) => {
      if (err) {
        return console.error(err);
      }

      Quagga.start();
      Quagga.onDetected(this.onCodeDetected);
    });
  },

  beforeDestroy: function() {
    Quagga.offDetected(this.onCodeDetected);
    Quagga.stop();
  }
}
</script>

<style>
  video {
    width: 100%;
  }
  canvas {
    display: none;
  }
</style>
