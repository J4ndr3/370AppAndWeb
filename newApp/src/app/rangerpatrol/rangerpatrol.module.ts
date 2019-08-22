import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
    RouterModule.forChild(routes),ReactiveFormsModule
  ],providers: [Geolocation],
  declarations: [RangerpatrolPage]
})
export class RangerpatrolPageModule {}

