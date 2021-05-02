import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgFormValidationMessageModule, LOCALE_MESSAGES } from 'ng-form-validation-message';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
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
export class OrderModule { }
