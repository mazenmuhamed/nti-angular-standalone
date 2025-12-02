import { Component, model } from '@angular/core';
import {
  LucideAngularModule,
  StoreIcon,
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
} from 'lucide-angular';
import { Product } from '../../models/product';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly StoreIcon = StoreIcon;
  readonly Menu = Menu;
  readonly X = X;
  readonly ShoppingCart = ShoppingCart;
  readonly Heart = Heart;

  favouritesCount = model<number>(0);
  cartCount = model<number>(0);
}
