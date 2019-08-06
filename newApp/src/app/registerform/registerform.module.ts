import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterformPage } from './registerform.page';
import { ReactiveFormsModule  } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: RegisterformPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [RegisterformPage]
})
export class RegisterformPageModule {}
