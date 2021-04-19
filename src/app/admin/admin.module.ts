import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFormValidationMessageModule, LOCALE_MESSAGES } from 'ng-form-validation-message';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { ProductComponent } from './components/products/product/product.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AppointmentComponent } from './components/appointments/appointment/appointment.component';
import { OrderComponent } from './components/orders/order/order.component';


@NgModule({
  declarations: [NavComponent, DashboardComponent, OrdersComponent, ProductsComponent, UsersComponent, UserComponent, ProductComponent, AppointmentsComponent, AppointmentComponent, OrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgFormValidationMessageModule
  ],
  providers: [
    {
      provide: LOCALE_MESSAGES,
      useValue: 'es'
    }
  ]
})
export class AdminModule { }
