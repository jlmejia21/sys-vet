import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  awsImage: string = `${environment.url_api}/aws/image/`;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<any[]>(`${environment.url_api}/products`);
    // .pipe(
    //   catchError(this.handleError),
    // );
  }
  getProduct(id: number) {
    return this.http.get(`${environment.url_api}/products/${id}`)
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

  // aws
  uploadProduct(image: any) {
    return this.http.post(`${environment.url_api}/aws/upload`, image)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  getImage(id: string) {
    return this.http.get(`${environment.url_api}/aws/image/${id}`, { responseType: 'arraybuffer' })
    // .pipe(
    //   catchError(this.handleError),
    // );
  }


}
