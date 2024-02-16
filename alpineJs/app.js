document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Cappucino", img: "1.jpg", price: 25000 },
      { id: 2, name: "Americano", img: "4.jpg", price: 20000 },
      { id: 3, name: "Latte", img: "3.jpg", price: 25000 },
      { id: 4, name: "Caramel Latte", img: "2.jpg", price: 30000 },
      { id: 5, name: "Caramel Machiatto", img: "5.jpg", price: 35000 },
      { id: 6, name: "Mocha", img: "6.jpg", price: 30000 },
      { id: 7, name: "Affogato", img: "7.jpg", price: 35000 },
      { id: 8, name: "Chocolate Smoothie", img: "8.jpg", price: 40000 },
      { id: 9, name: "Croisasant", img: "9.jpg", price: 20000 },
      { id: 10, name: "Donut", img: "10.jpg", price: 15000 },
      { id: 11, name: "Oatmeal", img: "11.jpg", price: 25000 },
      { id: 12, name: "Granola", img: "12.jpg", price: 30000 },
      { id: 13, name: "Salad", img: "13.jpg", price: 30000 },
      { id: 14, name: "Sandwich", img: "14.jpg", price: 30000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama
      const cariItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada
      if (!cariItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada cek barang udah ada atau belum
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau dihapus berdasarkan id
      const cariItem = this.items.find((item) => item.id === id);

      // jika item lebih dari satu
      if (cariItem.quantity > 1) {
        // telusuri
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cariItem.quantity === 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cariItem.price;
      }
    },
  });
});

// Konversi Ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
