import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule, RouterModule, MaterialModule, ReactiveFormsModule
  ], exports: [
    FooterComponent, HeaderComponent
  ]
})
export class SharedModule { }
