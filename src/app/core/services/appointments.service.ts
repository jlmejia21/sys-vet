import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`${environment.url_api}/appointments`);
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  createAppointment(appointment: Partial<Appointment>) {
    return this.http.post(`${environment.url_api}/appointments`, appointment)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

  updateAppointment(appointment: Appointment) {
    return this.http.put(`${environment.url_api}/appointments`, appointment)
    // .pipe(
    //   catchError(this.handleError),
    // );
  }

}
