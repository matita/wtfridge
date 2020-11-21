<template>
  <v-card v-if="products.length">
    <transition-group name="fade" tag="div">
      <Product
        v-for="(product) in products"
        :key="product.id"
        :product="product"
        @delete="$emit('delete', product)" />
    </transition-group>
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
  },
}
</script>

<style>
  .fade-enter-active {
    transition: opacity 1s, background-color 1s;
    background-color: #fff;
  }
  .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter {
    opacity: 0;
    background-color: #999;
  }
  .fade-leave-to {
    opacity: 0;
  }
</style>
