<template>
  <v-card>
    <scanner @code-detected="onCodeDetected" />

    <v-card-text>
      <scanned-product v-for="(product, i) in products" :key="i" :product="product" />
    </v-card-text>

    <v-snackbar v-model="snackbar" :timeout="5000">
      <span v-if="lastProduct">
        <span v-if="lastProduct.name">
          {{ lastProduct.name }}
        </span>
        <span v-else>
          <v-progress-circular indeterminate v-if="lastProduct.searchingCode" />
          {{ lastProduct.code }}
        </span>
      </span>
    </v-snackbar>
  </v-card>
</template>

<script>
import ScannedProduct from './ScannedProduct.vue';
import Scanner from './Scanner.vue';
import { get as getProduct } from '../api/OpenFoodFacts';

export default {
  components: { Scanner, ScannedProduct },

  data: () => ({
    snackbar: false,
    products: [],
  }),

  computed: {
    lastProduct: function() {
      return this.products[0];
    },
  },

  methods: {
    onCodeDetected: function(data) {
      console.log('onCodeDetected', data)
      const { code } = data.codeResult;
      const product = {
        code,
        name: '',
        searchingCode: false
      };

      this.products.unshift(product);
      this.fetchProduct(product);
      this.snackbar = true;
    },

    fetchProduct: function(product) {
      product.searchingCode = true;
      getProduct(product.code).then((data) => {
        product.searchingCode = false;
        product.name = this.productName(data.product);
      });
    },

    productName: function(product) {
      if (!product) {
        return '';
      }

      return [product.product_name, product.brands]
        .filter((n) => !!n)
        .join(' - ');
    },
  },
}
</script>

<style>

</style>
