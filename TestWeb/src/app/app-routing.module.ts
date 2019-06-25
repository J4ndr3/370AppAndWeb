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
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { LoginComponent } from './login/login.component';
import { UserroleComponent } from './userrole/userrole.component';
import { UserroleModifyComponent } from './userrole-modify/userrole-modify.component';
import { AccessLevelModComponent } from './access-level-mod/access-level-mod.component';
import { MarkerComponent } from './marker/marker.component';
import { MarkerTypeComponent } from './marker-type/marker-type.component';
import { MarkerModComponent } from './marker-mod/marker-mod.component';
import { MarkerTypeModComponent } from './marker-type-mod/marker-type-mod.component';



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
  {path:'patrol', component:PatrolLogComponent},
  {path: 'registeruser', component:RegisteruserComponent},
  {path: 'vehicle', component:VehicleComponent},
  {path: 'login', component:LoginComponent},
  {path: 'userrole', component:UserroleComponent},
  {path: 'userrolemod', component:UserroleModifyComponent},
  {path: 'AccessMod', component:AccessLevelModComponent},
  {path: 'marker', component:MarkerComponent},
  {path: 'markertype', component:MarkerTypeComponent},
  {path: 'markermod', component:MarkerModComponent},
  {path: 'markertypemod', component:MarkerTypeModComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
