new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    fullCart: 0,
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
    openModal(id) {
      this.fetchProduct(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) this.product = false;
    },
  },
  created() {
    this.fetchProducts();
  },
});
