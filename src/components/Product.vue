<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ product.name }}</v-list-item-title>
      <v-list-item-subtitle :class="{ 'red--text': expired }">
        {{ expiresLabel }} {{ expiry }}
      </v-list-item-subtitle>
    </v-list-item-content>
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
