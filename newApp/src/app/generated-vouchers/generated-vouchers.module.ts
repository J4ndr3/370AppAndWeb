import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GeneratedVouchersPage } from './generated-vouchers.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratedVouchersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneratedVouchersPage]
})
export class GeneratedVouchersPageModule {}
