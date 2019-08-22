import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModifybookingPage } from './modifybooking.page';

const routes: Routes = [
  {
    path: '',
    component: ModifybookingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ReactiveFormsModule
  ],
  declarations: [ModifybookingPage]
})
export class ModifybookingPageModule {}
