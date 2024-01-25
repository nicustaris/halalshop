# Hafiz Halal Shop

Hafiz Halal Shop is an ecommerce website that specializes in selling halal meat, vegetables, and other products. The project is built using React with Vite and integrates with Firebase for data storage.

## Table Of Contents

- [Hafiz Halal Shop](#hafiz-halal-shop)
  - [Table Of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Registration](#registration)
    - [Login](#login)
    - [Explore Products](#explore-products)
    - [Showcase](#showcase)
    - [Profile](#profile)
    - [Add to Basket](#add-to-basket)
    - [Checkout and Payment](#checkout-and-payment)
  - [Content Management System](#content-management-system)
    - [Admin Features Instruction](#admin-features-instruction)
  - [Features](#features)
  - [Demo](#demo)
  - [Technology Stack](#technology-stack)
  - [Reporting Issues](#reporting-issues)

## Installation

To get started with this project, follow these steps:

```bash
# Clone the Repository
git clone https://github.com/nicustaris/halalshop

# Navigate to the Project Folder
cd halalshop

# Install Dependencies
npm install

# Start the Development Server
npm run dev
```

## Configuration

All configuration settings for the project are stored in firebase.js. You can use the provided configuration or set up your own Firebase account and update the firebaseConfig settings.

## Usage

Here will be a brief on using Hafiz Halal Shop web application for every single route element

### Registration

To register, click on "Sign Up" in the top right corner. Fill in your name, email, and password.

### Login

To log in, click on "Sign In" in the top right corner. Fill in your user details or use Google Auth to sign in.

### Explore Products

```
To explore products, simply navigate to the navigation bar. There are two sections available:

#### Products by Category

In the navigation bar, locate the section labeled with product categories. Click on the desired category to explore the products within that category.

#### Special Offers

To explore special offers, navigate to the navbar menu and click on "Special Offers". All discounted products will be displayed there.
```

### Showcase

The showcase feature offers users the opportunity to share their dishes with the community. Users who have purchased products from Hafiz Halal and made dishes can contribute to the showcase by sharing their creations, and exploring new culinary ideas.

### Profile

The profile section, accessible from the navigation bar after users sign in, provides various functionalities:

```
- **Add Address**: Users can add their delivery address for shipping purposes.
- **Update Phone**: Users have the option to update their contact phone number.
- **Reset Password**: Allows users to change their password if needed.
- **Delete Account**: Provides the option for users to permanently remove their account from the platform.
```

### Add to Basket

Each product card, whether featured on the homepage with top products or within any other category or subcategory, includes an "Add to Cart" button. Users can click this button to add the respective product to their cart for purchase.

### Checkout and Payment

Once the products are added to the cart, users are prompted to sign in before proceeding to checkout. Clicking the checkout button initiates the process, displaying the user's contact details such as account and phone number. If the details are correct, users can proceed; if not, they are redirected to the profile page to update them.

Upon confirmation of contact details, users are prompted to provide a delivery address. If the user has any existing addresses, they can choose one; otherwise, they can set a new address. Once the address is confirmed, users receive an overview of their order, including product details, total payment, delivery information, and contact details.

Users can select their preferred payment method, such as Credit Card or PayPal. If Credit Card is chosen, a payment form is displayed. After filling in the necessary details and completing the payment, the order is successfully registered in the Firebase store.

## Content Management System

This Web Application features an integrated Content Management System (CMS) built from scratch to monitor and update the Hafiz Halal web application.

The admin route is secured and is defined by a field in the database: `isAdmin: true`. This field can be found in the `usersdetails` collection, and by default, it is undefined for every user. To gain admin access to the CMS, simply access the Firestore database and set `isAdmin` to true for the desired user. Alternatively, an admin user is already created for this purpose. Please use the following details to get access to the admin route: User Email: admin@shop.com, Password: 123456. To access the admin route, open the web application followed by `/Admin`.

### Admin Features Instruction

```
- **Users Management**: Allows viewing, and searching for specific user, accessing user details, viewing, and removing users. All user information can be found here.
- **Products Management**: Enables adding new products by filling required inputs and clicking "Add Product". Admins can also edit existing products, change prices, or delete them.
- **Promotion Products Management**: Similar to Products Management, admins can add new offers with the original price and discount percentage. For example, a product priced at £10 with a 50% discount will be displayed at £5 for users on the promotions page. Admins can also edit the discount for existing products or remove them.
- **Category Management**: As the web app grows, admins can add new categories by providing a category name and choosing a background image for the category.
- **Showcase**: Admins can delete inappropriate posts or any posts that go against Hafiz Halal Shop policy.
- **Orders History**: This route displays all processed orders with details such as time, payment type, email, customer telephone, address, and a list of products ordered with quantities. Every detail about processed orders can be found here.
```

## Features

- User-friendly design for different device sizes.
- Secure sign-in/sign-up system using Google Auth and Firebase.
- Showcase section for users to share their prepared dishes.
- Integrated payment system with support for PayPal and credit cards.
- Integrated Content Management System (CMS)
- And many more...

## Demo

Explore the live demo: [Hafiz Halal Shop](https://halal-shop-505b4.web.app/)

## Technology Stack

Hafiz Halal Shop is built using a modern stack of technologies to ensure a seamless and feature-rich user experience. The technologies used include:

- **JavaScript**: A versatile programming language for dynamic behavior.
- **JSX**: A syntax extension for JavaScript, commonly used in React.
- **CSS**: Cascading Style Sheets for styling web content.
- **React**: A JavaScript library for building single-page applications (SPAs).
- **Vite**: A fast build tool that significantly improves the frontend development experience by offering blazing fast builds.
- **HTML**: HyperText Markup Language for structuring web content.

## Reporting Issues

If you encounter a bug, have a feature request, or notice any issues while using Hafiz Halal Shop, please open an issue on our [GitHub Issue Tracker](https://github.com/nicustaris/halalshop/issues). Be sure to include detailed information about the problem, steps to reproduce it, and your system configuration.
