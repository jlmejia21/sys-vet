import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCart } from '../models/productCart.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  private products: ProductCart[] = [];
  private images: string[] = [];
  private total: number = 0;

  private cart = new BehaviorSubject<ProductCart[]>([]);
  private cartImages = new BehaviorSubject<string[]>([]);
  private cartTotal = new BehaviorSubject<number>(0);

  cart$ = this.cart.asObservable();
  cartImages$ = this.cartImages.asObservable();
  cartTotal$ = this.cartTotal.asObservable();

  constructor() { }

  addCart(product: ProductCart, image: string) {
    this.total = 0;
    this.products = [...this.products];
    let isFound = false;
    for (const pro of this.products) {
      if (pro.idproduct === product.idproduct) {
        isFound = true;
        pro.cantidad += product.cantidad;
      }
    }
    if (!isFound) {
      this.images = [...this.images, image];
      this.products = [...this.products, product];
    }

    this.products.map(pro => {
      this.total += pro.cantidad * pro.precio
    });
    this.cart.next(this.products);
    this.cartImages.next(this.images);
    this.cartTotal.next(this.total);
    // localStorage.setItem('cart', JSON.stringify(this.products));
    // localStorage.setItem('cartImages', JSON.stringify(this.images));
    // localStorage.setItem('cartTotal', JSON.stringify(this.total));

  }

  removeCart(pro: ProductCart) {
    this.products.forEach((element, index) => {
      if (pro.idproduct == element.idproduct) {
        this.products.splice(index, 1)
        this.images.splice(index, 1)
        this.total -= pro.cantidad * pro.precio
      };
    });
    this.cart.next(this.products);
    this.cartImages.next(this.images);
    this.cartTotal.next(this.total);
    localStorage.setItem('cart', JSON.stringify(this.products));
    localStorage.setItem('cartImages', JSON.stringify(this.images));
    localStorage.setItem('cartTotal', JSON.stringify(this.total));
  }
}
