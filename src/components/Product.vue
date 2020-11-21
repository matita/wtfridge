<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ product.name }}</v-list-item-title>
      <v-list-item-subtitle :class="{ 'red--text': expired }">
        {{ expiresLabel }} {{ expiry }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$emit('edit', product)">Modifica</v-list-item>
          <v-dialog v-model="confirmDelete" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs" v-on="on">Elimina</v-list-item>
            </template>
            <v-card>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-text>Confermi la cancellazione?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="confirmDelete = false"
                >
                  No
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="confirmDelete = false; $emit('delete', product)"
                >
                  Sì
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/it'
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('it');
dayjs.extend(RelativeTime);

export default {
  props: [
    'product'
  ],

  data: () => ({
    confirmDelete: false,
  }),

  computed: {
    expireDate: function() {
      return dayjs(this.product.expireDate).startOf('day');
    },

    expired: function() {
      return this.expireDate.isBefore(this.today());
    },

    expiresLabel: function() {
      return this.expired ? 'Scaduto' : 'Scade';
    },
    expiry: function() {
      return this.today().to(this.expireDate);
    }
  },

  methods: {
    today: function() {
      return dayjs().startOf('day');
    },
  }
}
</script>

<style>

</style>
