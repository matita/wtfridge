<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scroll-y-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        label="Scadenza"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :value="dateString"
        @input="onTextInput"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="dateString"
      no-title
      @input="onPickerInput"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: Date,
    },
  },

  data: () => ({
    menu: false,
  }),

  computed: {
    dateString: function() {
      return this.value ? this.value.toISOString().split('T')[0] : '';
    },
  },

  methods: {
    onTextInput: function(dateStr) {
      this.$emit('input', new Date(dateStr));
    },

    onPickerInput: function(dateStr) {
      this.menu = false;
      this.$emit('input', new Date(dateStr));
    },
  },
}
</script>

<style>

</style>
