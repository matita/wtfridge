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
            <FreeTextProduct />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <ProductsList
              :products="sortedProducts"
              @delete="onDeleteProduct"
            />
          </v-col>
        </v-row>

        <ProductDialog :visible="adding" @close="adding = false" @save="onSaveProduct" />

        <AddMenu @add-click="onAddClick" @mic-click="onMicClick" @scan-click="onScanClick" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AddMenu from './components/AddMenu.vue';
import ProductsList from './components/ProductsList.vue';
import ScannerList from './components/ScannerList.vue';
import ProductDialog from './components/ProductDialog';
import FreeTextProduct from './components/FreeTextProduct.vue';

export default {
  name: 'App',

  components: {
    ProductsList,
    ScannerList,
    AddMenu,
    ProductDialog,
    FreeTextProduct,
  },

  data: () => ({
    fab: false,
    scanning: false,
    adding: false,
    products: [],
    maxId: 0,
  }),

  computed: {
    sortedProducts() {
      return this.products.slice().sort((a,b) => a.expireDate.getTime() - b.expireDate.getTime());
    }
  },

  methods: {
    saveList: function() {
      localStorage['wtfridge_products'] = JSON.stringify(this.products);
    },

    onAddClick: function() {
      this.adding = true;
    },

    onMicClick: function() {
      console.log('mic click');
    },

    onScanClick: function() {
      console.log('scan click');
      this.scanning = !this.scanning;
    },

    onSaveProduct: function(product) {
      this.adding = false;
      if (!product.id) {
        product.id = this.nextId++;
      }
      this.products.push(product);
      this.saveList();
    },

    onDeleteProduct: function(product) {
      const index = this.products.indexOf(product);
      if (index < 0) {
        return;
      }

      this.products.splice(index, 1);
      this.saveList();
    }
  },

  mounted: function() {
    const jsonProducts = localStorage['wtfridge_products'];
    if (!jsonProducts) {
      return;
    }
    this.products = JSON.parse(jsonProducts)
      .map((p, i) => Object.assign(p, {
        id: p.id || i,
        expireDate: new Date(p.expireDate)
      }));
    this.nextId = this.products.length;
  }
};
</script>

<style scoped>

</style>
