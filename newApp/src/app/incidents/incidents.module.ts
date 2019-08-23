import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { IonicModule } from '@ionic/angular';

import { IncidentsPage } from './incidents.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ], providers: [BackgroundMode],
  declarations: [IncidentsPage]
})
export class IncidentsPageModule {}
