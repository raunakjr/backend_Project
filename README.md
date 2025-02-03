# E-Commerce Platform

This project is a fully-functional e-commerce platform where users can view products, add them to their cart, and proceed to checkout. The platform includes authentication and authorization, allowing users to sign up, log in, and manage their shopping cart. An **Admin Panel** is also provided to allow authorized administrators to add products to the store.

## Features

### User Features:
- **Sign Up & Login**: Users can create accounts and log in to access personalized features.
- **View Products**: Users can browse a catalog of products.
- **Add to Cart**: Users can add products to their cart with a single click.
- **Remove from Cart**: Users can remove products from their cart as needed.
- **View Cart**: The total amount of all products in the cart is displayed, and users can check out their orders.

### Admin Features:
- **Product Management**: Admins can add products to the platform, including details like name, price, description, and image.
- **Authentication & Authorization**: Admin features are secured with proper authentication and authorization, ensuring that only authorized users can access them.

### Cart Functionality:
- **Add/Remove Items**: Users can adjust their cart items and see the total amount payable in real-time.
- **Discount Handling**: Discounts can be applied to the cart, reducing the total payable amount.
  
## Tech Stack

- **Frontend**:
  - **HTML, CSS, JavaScript**: Used for structuring and styling the website.
  - **Tailwind CSS**: A utility-first CSS framework used for responsive design.
  - **EJS**: A templating engine for rendering dynamic content in the frontend.
  
- **Backend**:
  - **Node.js**: A runtime environment to execute JavaScript code server-side.
  - **Express.js**: A web framework used to handle HTTP requests and routing.
  - **MongoDB**: A NoSQL database used to store user data, products, and orders.
  - **Mongoose**: An ODM (Object Data Modeling) library to interact with MongoDB.
  - **Bcrypt.js**: A library used to hash passwords for secure authentication.
  
- **Authentication & Authorization**:
  - **Passport.js**: Used for user authentication, handling login sessions, and securing admin routes.
  - **JWT (JSON Web Tokens)**: Tokens used to maintain user sessions and for secure API calls.

- **File Upload**:
  - **Multer**: Middleware used to handle file uploads (e.g., product images).

## Installation

### Prerequisites:
1. **Node.js** installed on your machine.
2. **MongoDB** database set up (can be local or use a cloud service like MongoDB Atlas).
3. **Nodemon** for development (optional but recommended).

