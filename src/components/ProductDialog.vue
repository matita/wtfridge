<template>
  <v-dialog persistent :value="visible" max-width="600px">
    <v-card>
      <v-card-title>Aggiungi prodotto</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  autofocus
                  label="Nome"
                  v-model="name"
                  :rules="nameRules"
                  ref="name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <DateField v-model="expireDate" />
              </v-col>

              <v-col cols="6">
                <v-text-field label="Quantità" v-model="quantity" append-icon="mdi-scale"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text primary @click="onCloseClick">Chiudi</v-btn>
        <v-btn text primary @click="onSaveClick">Salva</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DateField from './DateField.vue';
export default {
  components: { DateField },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    name: '',
    expireDate: null,
    quantity: 0,

    valid: false,
    nameRules: [
      (v) => !!v,
    ],
  }),

  methods: {
    onCloseClick: function() {
      this.$emit('close');
    },

    onSaveClick: function() {
      const { name, expireDate, quantity, valid } = this;
      if (!valid) {
        this.$refs.name.$refs.input.focus();
        return;
      }

      this.$emit('save', { name, expireDate, quantity });
    },
  }
}
</script>

<style>

</style>
