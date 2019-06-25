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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
