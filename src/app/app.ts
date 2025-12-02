import { Component } from '@angular/core';

import { Banner } from './banner/banner';
import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';
import { Product } from '../models/product';
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS } from '../data';
import { Products } from './products/products';
import { CartModal } from './cart-modal/cart-modal';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-root',
  imports: [Banner, Navbar, Hero, Products, CartModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly products = DUMMY_PRODUCTS;
  readonly categories = DUMMY_CATEGORIES;

  favouritesCount = 0;
  favourites: { productId: number }[] = [];
  cartProductCount = 0;
  cartItems: CartItem[] = [];
  selectedCategory: string = 'all';
  filteredProducts: Product[] = this.products;

  ngOnInit(): void {
    this.onCartUpdated();
    this.onFavoritesUpdated();
  }

  onOnChange(): void {
    this.onCartUpdated();
  }

  onCartUpdated(): void {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      this.cartProductCount = cartData.reduce((sum: number, item: any) => sum + item.quantity, 0);
      this.cartItems = cartData;
    } else {
      this.cartProductCount = 0;
      this.cartItems = [];
    }
  }

  onFavoritesUpdated(): void {
    const savedFavourites = localStorage.getItem('favouriteItems');
    if (savedFavourites) {
      const favouritesData = JSON.parse(savedFavourites);
      this.favourites = favouritesData;
      this.favouritesCount = favouritesData.length;
    } else {
      this.favouritesCount = 0;
    }
  }

  handleSelectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;

    if (categoryId === 'all') {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((product) => product.category === categoryId);
  }

  handleAddToCart(product: Product): void {
    const savedCart = localStorage.getItem('cartItems');
    let cartData: CartItem[] = [];

    // If there is existing cart data, parse it
    if (savedCart) cartData = JSON.parse(savedCart);

    const existingItem = cartData.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartData.push({ product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartData));
    this.onCartUpdated();
  }

  handleAddToFavourites(product: Product): void {
    const savedFavourites = localStorage.getItem('favouriteItems');
    let favouritesData: { productId: number }[] = [];

    // If there is existing favourites data, parse it
    if (savedFavourites) favouritesData = JSON.parse(savedFavourites);

    const existingItem = favouritesData.find((item) => item.productId === product.id);
    if (!existingItem) {
      favouritesData.push({ productId: product.id });
    } else {
      favouritesData = favouritesData.filter((item) => item.productId !== product.id);
    }

    localStorage.setItem('favouriteItems', JSON.stringify(favouritesData));
    this.onFavoritesUpdated();
  }

  handleSaveCart(): void {
    this.onCartUpdated();
  }
}
