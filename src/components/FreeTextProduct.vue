<template>
  <div>
    <v-textarea solo :value="freeText + interimText" @input="onInput"></v-textarea>

    <v-btn icon @click="toggleListen" :disabled="!supportsSpeech">
      <v-icon v-if="listening">mdi-stop</v-icon>
      <v-icon v-else>mdi-microphone</v-icon>
    </v-btn>

    <v-row>
      <v-col>
        <div>Nome: {{ dummy.name }}</div>
        <div>Scadenza: {{ dummy.expire || '---' }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import parseDate from '../utils/parseDate';

const supportsSpeech = 'webkitSpeechRecognition' in window;
const recognition = supportsSpeech ? new window.webkitSpeechRecognition() : null;
if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'it-IT';
}

export default {
  data: () => ({
    listening: false,
    freeText: '',
    interimText: '',
    dummy: {
      name: '',
      expire: '',
    },
  }),

  computed: {
    supportsSpeech: function() {
      return supportsSpeech;
    },
  },

  methods: {
    onInput: function(value) {
      let lowerCaseValue = value.toLowerCase();
      const expireMatch = lowerCaseValue.match(/\bscad(?:e|ono)\s+(.*)/)
      if (expireMatch) {
        lowerCaseValue = lowerCaseValue.replace(expireMatch[0], '');
        this.dummy.expire = parseDate(expireMatch[1]);
      }

      this.freeText = value;
      this.dummy.name = lowerCaseValue.trim();
    },

    toggleListen: function() {
      if (this.listening) {
        recognition.stop();
      } else {
        recognition.onresult = (event) => {
          this.interimText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              this.freeText += result[0].transcript;
            } else {
              this.interimText += result[0].transcript;
            }
          }

          this.onInput(this.freeText);
        };
        recognition.start();
      }

      this.listening = !this.listening;
    }
  }
}
</script>

<style>

</style>
