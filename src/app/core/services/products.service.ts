import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
    // .pipe(
    //   catchError(this.handleError),
    // );
  }
  getProduct(id: string) {
    return this.http.get(`${environment.url_api}/products/id`)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }
  createProduct(product: Partial<Product>) {
    return this.http.post(`${environment.url_api}/products`, product)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  updateProduct(product: Product) {
    return this.http.put(`${environment.url_api}/products`, product)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

}
