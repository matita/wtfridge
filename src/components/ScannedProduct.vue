<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ product.code }}: {{ product.name }}</v-list-item-title>
      <v-list-item-subtitle v-if="product.expireDate">
        Expires {{ expiry }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime);

export default {
  props: [
    'product'
  ],

  computed: {
    expiry: function() {
      return dayjs().to(dayjs(this.product.expireDate))
    }
  }
}
</script>

<style>

</style>
