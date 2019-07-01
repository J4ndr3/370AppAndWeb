import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GeneragevoucherPage } from './generagevoucher.page';

const routes: Routes = [
  {
    path: '',
    component: GeneragevoucherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneragevoucherPage]
})
export class GeneragevoucherPageModule {}
