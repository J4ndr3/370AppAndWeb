import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RangerComponent } from './ranger/ranger.component';
import { IncidentComponent } from './incident/incident.component';
import { ModifyRangerComponent } from './modify-ranger/modify-ranger.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'incident', component:IncidentComponent},
  {path: 'rangers', component: RangerComponent},
  {path: 'modify-ranger', component: ModifyRangerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
