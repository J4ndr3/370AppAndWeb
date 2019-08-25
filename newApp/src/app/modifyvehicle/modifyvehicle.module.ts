import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { modifyVehiclePage } from './modifyvehicle.page';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  {
    path: '',
    component: modifyVehiclePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [modifyVehiclePage]
})
export class ModifyvehiclePageModule {}
