import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RangerpatrolPage } from './rangerpatrol.page';

const routes: Routes = [
  {
    path: '',
    component: RangerpatrolPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RangerpatrolPage]
})
export class RangerpatrolPageModule {}

