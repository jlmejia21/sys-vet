import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductCart } from 'src/app/core/models/productCart.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: ProductCart;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();
  image: any;
  constructor(
    private domSanitizer: DomSanitizer,
    private cartService: CartService,
    private productsService: ProductsService,
    readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.getImage(this.product.imgUrl)
    this.getImageFromApi(this.product.imgUrl);
  }

  addCart() {
    this.open('Se agrego el producto al carrito.', '', { duration: 1000 });
    this.cartService.addCart(this.product, this.image);
  }

  getImage(imageUrl: string) {
    this.image = this.domSanitizer.bypassSecurityTrustUrl('http://localhost:3000/aws/image/' + imageUrl);
  }

  getImageFromApi(imageUrl: string) {
    this.productsService.getImage(imageUrl).subscribe((data: any) => {
      const arrayBufferView = new Uint8Array(data);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      const urlCreator = window.URL;
      const imageUrl = urlCreator.createObjectURL(blob);
      this.image = this.domSanitizer.bypassSecurityTrustUrl(imageUrl);
    })
  }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }

}
