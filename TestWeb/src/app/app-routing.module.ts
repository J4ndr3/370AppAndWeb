import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RangerComponent } from './ranger/ranger.component';
import { IncidentComponent } from './incident/incident.component';
import { ModifyRangerComponent } from './modify-ranger/modify-ranger.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IncidentLevelComponent } from './incident-level/incident-level.component';
import { IncidentLevelModifyComponent } from './incident-level-modify/incident-level-modify.component';
import { IncidentTypeComponent } from './incident-type/incident-type.component';
import { IncidentTypeModifyComponent } from './incident-type-modify/incident-type-modify.component';
import { PatrolLogComponent } from './patrol-log/patrol-log.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'incident', component:IncidentComponent},
  {path: 'rangers', component: RangerComponent},
  {path: 'modify-ranger', component: ModifyRangerComponent},
  {path: 'profile', component: ProfileComponent},
  {path:"notify", component: NotificationsComponent},
  {path:"incident-level", component:IncidentLevelComponent},
  {path:"incident-level-modify",component:IncidentLevelModifyComponent},
  {path:"incident-type", component: IncidentTypeComponent},
  {path:"incident-type-modify", component: IncidentTypeModifyComponent},
  {path:'patrol', component:PatrolLogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
