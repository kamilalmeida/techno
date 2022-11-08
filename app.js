new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
  },
  filters: {
    numberPrice(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          this.products = response;
        });
    },
    fetchProduct(id) {
      console.log(id);
      fetch(`./api/products/${id}/data.json`)
        .then((response) => response.json())
        .then((response) => {
          this.product = response;
        });
    },
  },
  created() {
    this.fetchProducts();
  },
});
