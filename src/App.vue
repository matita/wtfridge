<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>WTFridge</v-toolbar-title>

      <template v-slot:extension>
        <v-btn fab bottom right absolute @click="scanning = !scanning">
          <v-icon v-if="!scanning">mdi-barcode</v-icon>
          <v-icon v-if="scanning">mdi-stop</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <scanner-list v-if="scanning"/>
        <ProductsList :products="products" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProductsList from './components/ProductsList.vue';
import ScannerList from './components/ScannerList.vue';

export default {
  name: 'App',

  components: {
    ProductsList,
    ScannerList,
  },

  data: () => ({
    scanning: false,
    products: [
      {
        name: 'Latte',
        expireDate: new Date(2020, 11, 16)
      }, {
        name: 'Uova',
        expireDate: new Date(2020, 10, 18)
      }, {
        name: 'Salame',
        expireDate: new Date(2020, 10, 10)
      }
    ].sort((a,b) => a.expireDate.getTime() - b.expireDate.getTime())
  }),
};
</script>
