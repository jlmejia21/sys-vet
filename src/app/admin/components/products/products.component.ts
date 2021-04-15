import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/models/producto.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[];
  products: Product[];

  constructor(private productosService: ProductsService) {
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

  addProduct() {

  }

  deleteProduct(idproduct: number) {
    console.log(idproduct);
  }
  editProduct(idproduct: number) {
    console.log(idproduct);

  }
}
