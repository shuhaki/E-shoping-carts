🛍️ E-Commerce Shopping Cart
A minimal, full-stack e-commerce application with product listing, shopping cart functionality, and checkout simulation.

✨ Features
Product Catalog: Display products in a responsive grid layout

Shopping Cart: Add/remove items and adjust quantities

Persistent Cart: Cart contents saved in localStorage

Checkout System: Simulate order processing

RESTful API: Backend endpoints for products and checkout

Comprehensive Testing: Both automated and manual test cases

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

npm

Installation & Running
Clone the repository

bash
git clone <your-repository-url>
cd ecommerce-site
Install dependencies

bash
npm install
Start the server

bash
npm start
Access the application

Frontend: http://localhost:3100

API: http://localhost:3100/products

Development Mode
bash
npm run dev
🧪 Testing
Automated Tests (Jest)
bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
Manual API Testing (Postman)
Import the Postman collection from postman-collection.json

Test the endpoints:

GET /products - Retrieve all products

POST /checkout - Submit an order

Frontend Testing
Open http://localhost:3100

Test these user flows:

Browse products and add to cart

Modify quantities in cart

Persistence across page refreshes

Checkout simulation

🛠️ API Endpoints
GET /products
Returns a list of all available products.

Response:

json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 10.99,
    "imageUrl": "https://via.placeholder.com/150"
  }
]
POST /checkout
Accepts cart items and processes orders.

Request Body:

json
[
  {
    "id": 1,
    "qty": 2
  }
]
Response:

json
{
  "message": "Order placed successfully"
}
🎯 Design Choices & Assumptions
Frontend Architecture
Vanilla JavaScript: No frameworks for simplicity and minimal dependencies

Modal-based Cart: Better UX for quick cart access without page navigation

Local Storage: Persistent cart state across browser sessions

Responsive Design: Grid layout adapts to different screen sizes

Backend Architecture
Express.js: Lightweight and fast for simple APIs

CORS Enabled: Frontend-backend communication

Static File Serving: Simple deployment structure

Hardcoded Data: No database required for demo purposes

State Management
Client-side Cart: Reduces server load and provides instant feedback

Quantity Controls: Full cart item management (add, remove, adjust quantities)

Real-time Updates: UI updates immediately on cart changes

Testing Strategy
Jest & Supertest: Backend API testing

Postman Collection: Manual API verification and documentation

Comprehensive Coverage: Tests for status codes, data structure, and business logic

📦 Project Structure
text
ecommerce-site/
├── server.js          # Express server with API endpoints
├── package.json       # Dependencies and scripts
├── test/              # Automated test suites
├── public/            # Frontend static files
│   ├── index.html     # Main HTML page
│   ├── app.js         # Frontend JavaScript
│   └── styles.css     # Styling
└── README.md          # This file
🎉 Bonus Features Implemented
✅ Quantity Management: Users can increase/decrease item quantities in cart
✅ Cart Persistence: localStorage maintains cart across page refreshes
✅ Comprehensive Testing: Backend tests for /products endpoint
✅ Postman Collection: Ready-to-use API testing suite

🔧 Technical Stack
Backend: Node.js, Express.js, CORS

Frontend: Vanilla JavaScript, HTML5, CSS3

Testing: Jest, Supertest, Postman

Storage: Browser localStorage

Development: Nodemon for auto-restart
