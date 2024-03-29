import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angular2-qrcode';
import { IonicModule } from '@ionic/angular';

import { VoucherPage } from './voucher.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherPage
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
  declarations: [VoucherPage]
})
export class VoucherPageModule {}
