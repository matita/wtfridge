<template>
  <v-speed-dial class="speed-dial" v-model="fab" direction="top" transition="slide-y-reverse-transition" fixed right bottom>
    <template v-slot:activator>
      <v-btn fab primary dark color="primary" @click="onAddClick">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-btn fab small @click="onMicClick">
      <v-icon>mdi-microphone</v-icon>
    </v-btn>

    <v-btn fab small @click="onScanClick">
      <v-icon>mdi-barcode</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),

  methods: {
    onAddClick: function() {
      if (!this.fab) {
        return;
      }

      this.$emit('add-click');
    },

    onMicClick: function() {
      this.$emit('mic-click');
    },

    onScanClick: function() {
      this.$emit('scan-click');
    }
  },
}
</script>

<style>

</style>
