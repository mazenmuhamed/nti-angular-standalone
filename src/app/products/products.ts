import { Component, Input, Output, EventEmitter, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Heart,
  ShoppingCart,
  Star,
  Filter,
  Grid3X3,
  List,
} from 'lucide-angular';

import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './products.html',
})
export class Products {
  @Input({ required: true }) products: Product[] = [];
  @Input({ required: true }) selectedCategory: string = 'all';
  @Input({ required: true }) filteredProducts: Product[] = [];
  @Input({ required: true }) categories: { id: string; name: string; count: number }[] = [];

  @Output() handleSelectCategory = new EventEmitter<string>();
  @Output() handleAddToCart = new EventEmitter<Product>();
  @Output() handleAddToFavourites = new EventEmitter<Product>();

  favourites = model<{ productId: number }[]>([]);

  readonly Heart = Heart;
  readonly ShoppingCart = ShoppingCart;
  readonly Star = Star;
  readonly Filter = Filter;
  readonly Grid3X3 = Grid3X3;
  readonly List = List;

  viewMode: 'grid' | 'list' = 'grid';

  get isFavourite() {
    return (productId: number) => {
      return this.favourites().some((fav) => fav.productId === productId);
    };
  }
}
