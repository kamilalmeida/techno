new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    cart: [],
    activeCart: false,
    alertMessage: "Item adicionado",
    activeAlert: false,
  },
  filters: {
    numberPrice(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  computed: {
    fullCart() {
      let total = 0;
      if (this.cart.length) {
        this.cart.forEach((item) => {
          total += item.price;
        });
      }
      return total;
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
    clickOutCart({ target, currentTarget }) {
      if (target === currentTarget) this.activeCart = false;
    },
    addItem() {
      this.product.stock--;
      const { id, name, price } = this.product;
      this.cart.push({ id, name, price });
      this.alert(`${name} foi adicionado ao carrinho`);
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
    checkLocalStorage() {
      if (window.localStorage.cart)
        this.cart = JSON.parse(window.localStorage.cart);
    },
    alert(message) {
      this.alertMessage = message;
      this.activeAlert = true;
      setTimeout(() => (this.activeAlert = false), 1500);
    },
    checkStock() {
      const items = this.cart.filter((item) => {
        if (item.id === this.product.id) {
          return true;
        }
      });

      this.product.stock -= items.length;
    },
  },
  watch: {
    product() {
      document.title = this.product.name || "Techno";
      const id = this.product.id || " ";
      history.pushState(null, null, `#${id}`);
      if (this.product) this.checkStock();
    },
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart);
    },
  },
  created() {
    this.fetchProducts();
    this.checkLocalStorage();
  },
});
