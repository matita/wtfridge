<template>
  <v-card>
    <Product v-for="(product, i) in products" :key="i" :product="product" />
  </v-card>
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
