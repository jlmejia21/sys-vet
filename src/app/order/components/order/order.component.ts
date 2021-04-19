import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductCart } from 'src/app/core/models/productCart.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<ProductCart[]>;
  images$: Observable<string[]>;
  total$: Observable<number>;

  datosGeneralesFormGroup: FormGroup;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,

  ) {
    // let cart: string | any = localStorage.getItem('cart');
    // let cartImages: string | any = localStorage.getItem('cartImages');
    // let cartTotal: string | any = localStorage.getItem('cartTotal');
    // this.products$ = of(JSON.parse(cart))
    // this.images$ = of(JSON.parse(cartImages))
    // this.total$ = of(JSON.parse(cartTotal))
    this.products$ = this.cartService.cart$;
    this.images$ = this.cartService.cartImages$;
    this.total$ = this.cartService.cartTotal$;
    this.formBuilder();
  }
  private formBuilder() {
    this.datosGeneralesFormGroup = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      dni: ['', Validators.required],
    });
  }
  ngOnInit(): void {


  }

  deleteProduct(product: ProductCart) {
    this.cartService.removeCart(product);
  }

}
