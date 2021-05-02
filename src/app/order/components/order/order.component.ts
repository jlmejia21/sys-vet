import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from '../../../core/services/orders.service';

import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProductCart } from 'src/app/core/models/productCart.model';
import { Router } from '@angular/router';
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
    readonly snackBar: MatSnackBar,
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router,
    private fb: FormBuilder,

  ) {

    this.products$ = this.cartService.cart$;
    this.images$ = this.cartService.cartImages$;
    this.total$ = this.cartService.cartTotal$;
    this.formBuilder();
  }
  private formBuilder() {
    this.datosGeneralesFormGroup = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    });
  }
  ngOnInit(): void {
  }

  get f() { return this.datosGeneralesFormGroup.controls; }

  deleteProduct(product: ProductCart) {
    this.cartService.removeCart(product);
  }

  async saveDatosGenerales(event: Event) {
    event.preventDefault();
    if (this.datosGeneralesFormGroup.valid) {
      const persona = this.datosGeneralesFormGroup.value;
      const products = await this.products$.pipe(take(1)).toPromise();
      const total = await this.total$.pipe(take(1)).toPromise();
      if (products.length === 0) {
        this.open('Favor de seleccionar algunos productos!', '', {
          duration: 3000, panelClass: ['wrong-snackbar'],
          horizontalPosition: 'end', verticalPosition: 'top'
        });
        return;
      }
      this.orderService.createOrder(persona, products, total).subscribe((res: any) => {
        console.log(res);
        this.orderService.sendEmail(res.idOrder, persona.correo, products).subscribe(resEmail => {
          console.log(resEmail);
          this.cartService.cleanCart();
          this.open('Se registro la orden correctamente!!!!', '', {
            duration: 4000, panelClass: ['success-snackbar'],
            horizontalPosition: 'end', verticalPosition: 'top'
          });
          this.router.navigate(['/home'])
        });

      })
    }
  }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }

}
