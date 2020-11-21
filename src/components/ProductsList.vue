<template>
  <v-card v-if="products.length">
    <Product v-for="(product, i) in products" :key="i" :product="product" />
  </v-card>
  <span v-else>Nessun prodotto</span>
</template>

<script>
import Product from './Product.vue'

export default {
  props: [
    'products',
  ],

  components: {
    Product,
  }
}
</script>

<style>

</style>
