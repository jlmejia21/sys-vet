import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get<any[]>(`${environment.url_api}/orders`);
    // .pipe(
    //   catchError(this.handleError),
    // );
  }
}
