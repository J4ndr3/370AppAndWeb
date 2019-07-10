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
import {PerformanceComponent} from './performance/performance.component';
import {IncidentReportComponent} from './incident-report/incident-report.component';
import {VehiclesReportComponent} from './vehicles-report/vehicles-report.component';
import {MarkersReportComponent} from './markers-report/markers-report.component';
import {AssetsReportComponent} from './assets-report/assets-report.component';
import {RewardsReportComponent} from './rewards-report/rewards-report.component';
import {StatusReportComponent} from './status-report/status-report.component';
import {RangersReportComponent} from './rangers-report/rangers-report.component';
 
import { LoginComponent } from './login/login.component';
import { UserroleComponent } from './userrole/userrole.component';
import { UserroleModifyComponent } from './userrole-modify/userrole-modify.component';
import { AccessLevelModComponent } from './access-level-mod/access-level-mod.component';
import { MarkerComponent } from './marker/marker.component';
import { MarkerTypeComponent } from './marker-type/marker-type.component';
import { MarkerModComponent } from './marker-mod/marker-mod.component';
import { MarkerTypeModComponent } from './marker-type-mod/marker-type-mod.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReserveModComponent } from './reserve-mod/reserve-mod.component';
import { SecurityComponent } from './security/security.component';
import { SecurityModComponent } from './security-mod/security-mod.component';
import { GateComponent } from './gate/gate.component';
import { GateModComponent } from './gate-mod/gate-mod.component';
import { RewardAddComponent } from './reward-add/reward-add.component';
import { RewardModifyComponent } from './reward-modify/reward-modify.component';
import { RewardEventModifyComponent } from './reward-event-modify/reward-event-modify.component';
import { ResetPassworComponent } from './reset-passwor/reset-passwor.component';
import { ViewRangerComponent } from './view-ranger/view-ranger.component';
import { ModVehicleComponent } from './mod-vehicle/mod-vehicle.component';



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
  {path: 'assets-report', component:AssetsReportComponent},
  {path: 'incident-report', component:IncidentReportComponent},
  {path: 'markers-report', component:MarkersReportComponent},
  {path: 'rangers-report', component:RangersReportComponent},
  {path: 'rewards-report', component:RewardsReportComponent},
  {path: 'status-report', component:StatusReportComponent},
  {path: 'vehicles-report', component:VehiclesReportComponent},
  {path: 'performance', component:PerformanceComponent},
  {path: 'login', component:LoginComponent},
  {path: 'userrole', component:UserroleComponent},
  {path: 'userrolemod', component:UserroleModifyComponent},
  {path: 'AccessMod', component:AccessLevelModComponent},
  {path: 'marker', component:MarkerComponent},
  {path: 'markertype', component:MarkerTypeComponent},
  {path: 'markermod', component:MarkerModComponent},
  {path: 'markertypemod', component:MarkerTypeModComponent},
  {path: 'reserve', component:ReserveComponent},
  {path: 'reservemod', component:ReserveModComponent},
  {path: 'security', component:SecurityComponent},
  {path: 'securitymod', component:SecurityModComponent},
  {path: 'gate', component:GateComponent},
  {path: 'gatemod', component:GateModComponent},
  {path: 'reward-add', component:RewardAddComponent},
  {path: 'reward-modify', component:RewardModifyComponent},
  {path: 'reward-event-modify', component:RewardEventModifyComponent},
  {path: 'reset', component:ResetPassworComponent},
  {path: 'view-ranger', component:ViewRangerComponent},
  {path: 'mod-vehicle', component:ModVehicleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
