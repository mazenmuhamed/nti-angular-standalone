import { Component, computed, EventEmitter, Input, model, Output } from '@angular/core';
import { LucideAngularModule, Minus, Plus, Trash2, ShoppingBag } from 'lucide-angular';
import { Product } from '../../models/product';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart-modal',
  imports: [LucideAngularModule],
  templateUrl: './cart-modal.html',
})
export class CartModal {
  readonly Minus = Minus;
  readonly Plus = Plus;
  readonly Trash2 = Trash2;
  readonly ShoppingBag = ShoppingBag;

  cartItems = model<CartItem[]>([]);
  @Input() handleSaveCart = new EventEmitter<void>();

  get total(): number {
    return this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get itemCount(): number {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.product.quantity) {
      item.quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  removeItem(index: number): void {
    this.cartItems().splice(index, 1);
    this.saveCart();
  }

  canIncreaseQuantity(item: CartItem): boolean {
    return item.quantity < item.product.quantity;
  }

  private saveCart(): void {
    const cartData = this.cartItems().map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    localStorage.setItem('cartItems', JSON.stringify(cartData));
    // this.handleSaveCart.emit();
  }
}
