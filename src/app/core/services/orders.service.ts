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

  createOrder(persona: any, productos: any, total: number) {
    return this.http.post(`${environment.url_api}/orders`, { persona, productos, total })
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  sendEmail(idOrder: number, toEmail: string, productos: any[]) {
    return this.http.post(`${environment.url_api}/aws/email`, { idOrder, toEmail, productos })
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

}
