<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>WTFridge</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-5">
      <v-container>
        <v-row v-if="scanning">
          <v-col>
            <scanner-list/>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <ProductsList :products="products" />
          </v-col>
        </v-row>

        <AddMenu @add-click="onAddClick" @mic-click="onMicClick" @scan-click="onScanClick" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AddMenu from './components/AddMenu.vue';
import ProductsList from './components/ProductsList.vue';
import ScannerList from './components/ScannerList.vue';

export default {
  name: 'App',

  components: {
    ProductsList,
    ScannerList,
    AddMenu,
  },

  data: () => ({
    fab: false,
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

  methods: {
    onAddClick: function() {
      console.log('add click');
    },

    onMicClick: function() {
      console.log('mic click');
    },

    onScanClick: function() {
      console.log('scan click');
      this.scanning = !this.scanning;
    },
  },
};
</script>

<style scoped>

</style>
