import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PetsComponent } from './components/pets/pets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { OrderComponent } from './components/order/order.component';


@NgModule({
  declarations: [NavComponent, DashboardComponent, PetsComponent, AppointmentsComponent, OrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule

  ]
})
export class AdminModule { }
