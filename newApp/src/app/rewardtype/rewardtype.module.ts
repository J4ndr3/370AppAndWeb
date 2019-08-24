import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { RewardtypePage } from './rewardtype.page';

const routes: Routes = [
  {
    path: '',
    component: RewardtypePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2SearchPipeModule
  ],
  declarations: [RewardtypePage]
})
export class RewardtypePageModule {}
