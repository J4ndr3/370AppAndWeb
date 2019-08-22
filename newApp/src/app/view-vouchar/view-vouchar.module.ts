import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { IonicModule } from '@ionic/angular';

import { ViewVoucharPage } from './view-vouchar.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVoucharPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewVoucharPage]
})
export class ViewVoucharPageModule {}
