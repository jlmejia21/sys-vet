import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ProductComponent } from './product/product.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[];
  products: Product[];

  constructor(private productosService: ProductsService,
    public dialog: MatDialog,
    readonly snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer
  ) {
    this.displayedColumns = ['idproduct', 'nombre', 'descripcion', 'precio', 'actions'];
  }

  ngOnInit(): void {
    this.getProductos();
  }
  getProductos() {
    this.productosService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  getImage(imageUrl: string) {
    console.log(imageUrl);
    return this.domSanitizer.bypassSecurityTrustUrl('http://localhost:3000/aws/image/' + imageUrl);
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductComponent, {
      // height: '60%',
      // width: '42%',
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Nuevo Producto';
    dialogRef.componentInstance.id = 0;
    dialogRef.afterClosed()
      .subscribe((appointment) => {
        if (appointment) {
          this.open('Se registro el producto correctamente.', '', { duration: 3000 });
          this.getProductos();
        }
      });
  }

  editProduct(idproduct: number) {
    const dialogRef = this.dialog.open(ProductComponent, {
      height: '47%',
      width: '30%',
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Editar Producto';
    dialogRef.componentInstance.id = idproduct;
    dialogRef.afterClosed()
      .subscribe((appointment) => {
        if (appointment) {
          this.open('Se actualizo el producto  correctamente.', '', { duration: 3000 });
          this.getProductos();
        }
      });

  }
  deleteProduct(idproduct: number) {
    console.log(idproduct);
  }


  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }

}
