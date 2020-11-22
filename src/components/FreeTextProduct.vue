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

    <v-row v-if="logs.length">
      <v-col>
        <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import parseDate from '../utils/parseDate';

const supportsSpeech = 'webkitSpeechRecognition' in window;
const recognition = supportsSpeech ? new window.webkitSpeechRecognition() : null;
if (recognition) {
  recognition.continuous = false;
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
    logs: [],
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
        this.listening = false;
        recognition.stop();
      } else {
        this.listening = true;
        this.freeText = '';
        recognition.onend = () => {
          if (this.listening) {
            this.freeText = '';
            recognition.start();
          }
        };
        recognition.onresult = (event) => {
          this.logs.push(`onresult start resultIndex: ${event.resultIndex}`);
          this.interimText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const { transcript } = result[0];
            this.logs.push(`-- isFinal: ${result.isFinal}, transcript: '${transcript}'`);
            console.log('result', result);
            if (result.isFinal) {
              this.freeText += transcript;
            } else {
              this.interimText += transcript;
            }
          }
          this.logs.push('onresult end');

          this.onInput(this.freeText);
        };
        recognition.start();
      }
    }
  }
}
</script>

<style>

</style>
