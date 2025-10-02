const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const products = [
  { id: 1, name: 'Product 1', price: 10.99, imageUrl: 'https://images.unsplash.com/photo-1545127398-14699f92334b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRlbXN8ZW58MHx8MHx8fDA%3D' },
  { id: 2, name: 'Product 2', price: 15.99, imageUrl: 'https://media.istockphoto.com/id/1308274455/photo/blue-sneakers-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=mNrdHQkWjTk8xxEn9Dst9C-ouTemFo-8dI5vpa1yfjk=' },
  { id: 3, name: 'Product 3', price: 20.99, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hndE6_6tktqqKiXKDO-r0Q7WewQeDXoUiw&s' },
  { id: 4, name: 'Product 4', price: 25.99, imageUrl: 'https://t3.ftcdn.net/jpg/16/23/37/32/360_F_1623373286_B8GGoPUTyPANTtMxp4gXN05PRf49EC81.jpg' },
  { id: 5, name: 'Product 5', price: 30.99, imageUrl: 'https://5.imimg.com/data5/EM/IP/RP/SELLER-88944055/stationery-items.jpg' },
  { id: 6, name: 'Product 6', price: 35.99, imageUrl: 'https://t4.ftcdn.net/jpg/00/62/03/69/360_F_62036960_m7fDkEeclqSQwSrjsGkM7xRAFo5xxpna.jpg' },
  { id: 7, name: 'Product 7', price: 40.99, imageUrl: 'https://media.istockphoto.com/id/1495499473/photo/organic-bath-accessories.jpg?s=612x612&w=0&k=20&c=QeRE7OnaYOjKJrKtifiDb4WJAEw6ShlAfW12350ds50=' },
  { id: 8, name: 'Product 8', price: 45.99, imageUrl: 'https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080' },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/checkout', (req, res) => {
  console.log('Order:', req.body);
  res.json({ message: 'Order placed successfully' });
});

const PORT = 3100;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for testing
module.exports = app;