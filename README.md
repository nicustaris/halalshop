# Hafiz Halal Shop

Hafiz Halal Shop is an ecommerce website that specializes in selling halal meat, vegetables, and other products. The project is built using React with Vite and integrates with Firebase for data storage.

## Table Of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-tack)

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

Here will be a short brief on using Hafiz Halal Shop web application for every single element route

### Registration

To register, click on "Sign Up" in the top right corner. Fill in your name, email, and password.

### Login

To log in, click on "Sign In" in the top right corner. Fill in your user details or use Google Auth to sign in.

### Explore Products

To explore products, simply navigate to the navigation bar. There are two sections available:

#### Products by Category

In the navigation bar, locate the section labeled with product categories. Click on the desired category to explore the products within that category.

#### Special Offers

To explore special offers, navigate to the navbar menu and click on "Special Offers". All discounted products will be displayed there.

### Showcase

The showcase feature offers users the opportunity to share their dishes with the community. Users who have purchased products from Hafiz Halal and made dishes can contribute to the showcase by sharing their creations, and exploring new culinary ideas.

### Profile

The profile section, accessible from the navigation bar after users sign in, provides various functionalities:

- **Add Address**: Users can add their delivery address for shipping purposes.
- **Update Phone**: Users have the option to update their contact phone number.
- **Reset Password**: Allows users to change their password if needed.
- **Delete Account**: Provides the option for users to permanently remove their account from the platform.

### Add to Basket

Each product card, whether featured on the homepage with top products or within any other category or subcategory, includes an "Add to Cart" button. Users can click this button to add the respective product to their cart for purchase.

### Checkout and Payment

Once the products are added to the cart, users are prompted to sign in before proceeding to checkout. Clicking the checkout button initiates the process, displaying the user's contact details such as account and phone number. If the details are correct, users can proceed; if not, they are redirected to the profile page to update them.

Upon confirmation of contact details, users are prompted to provide a delivery address. If the user has any existing addresses, they can choose one; otherwise, they can set a new address. Once the address is confirmed, users receive an overview of their order, including product details, total payment, delivery information, and contact details.

Users can select their preferred payment method, such as Credit Card or PayPal. If Credit Card is chosen, a payment form is displayed. After filling in the necessary details and completing the payment, the order is successfully registered in the Firebase store.

## Features

User-friendly design for different device sizes.
Secure sign-in/sign-up system using Google Auth and Firebase.
Showcase section for users to share their prepared dishes.
Integrated payment system with support for PayPal and credit cards.
and many more...

## Demo

Explore the live demo: [Hafiz Halal Shop](https://staris.dev)

## Technology Stack

Hafiz Halal Shop is built using a modern stack of technologies to ensure a seamless and feature-rich user experience. The technologies used include:

- **JavaScript**: A versatile programming language for dynamic behavior.
- **JSX**: A syntax extension for JavaScript, commonly used in React.
- **CSS**: Cascading Style Sheets for styling web content.
- **React**: A JavaScript library for building single-page applications (SPAs).
- **Vite**: A fast build tool that significantly improves the frontend development experience by offering blazing fast builds.
- **HTML**: HyperText Markup Language for structuring web content.
