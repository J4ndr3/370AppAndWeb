import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentComponent } from './incident/incident.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RangerComponent } from './ranger/ranger.component';
import { ModifyRangerComponent } from './modify-ranger/modify-ranger.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'q';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule} from '@angular/material';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md';
import { IncidentLevelComponent } from './incident-level/incident-level.component';
import { IncidentLevelModifyComponent } from './incident-level-modify/incident-level-modify.component';
import { IncidentTypeComponent } from './incident-type/incident-type.component';
import { IncidentTypeModifyComponent } from './incident-type-modify/incident-type-modify.component';
import { PatrolLogComponent } from './patrol-log/patrol-log.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { PerformanceComponent } from './performance/performance.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { VehiclesReportComponent } from './vehicles-report/vehicles-report.component';
import { AssetsReportComponent } from './assets-report/assets-report.component';
import { RewardsReportComponent } from './rewards-report/rewards-report.component';
import { StatusReportComponent } from './status-report/status-report.component';
import { RangersReportComponent } from './rangers-report/rangers-report.component';
import { MarkersReportComponent } from './markers-report/markers-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FullCalendarModule } from '@fullcalendar/angular'; 
import { LoginComponent } from './login/login.component';
import { UserroleComponent } from './userrole/userrole.component';
import { UserroleModifyComponent } from './userrole-modify/userrole-modify.component';
import { AccessLevelModComponent } from './access-level-mod/access-level-mod.component';
import { MarkerComponent } from './marker/marker.component';
import { MarkerModComponent } from './marker-mod/marker-mod.component';
import { MarkerTypeComponent } from './marker-type/marker-type.component';
import { MarkerTypeModComponent } from './marker-type-mod/marker-type-mod.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ReserveModComponent } from './reserve-mod/reserve-mod.component';
import { SecurityComponent } from './security/security.component';
import { SecurityModComponent } from './security-mod/security-mod.component';
import { GateComponent } from './gate/gate.component';
import { GateModComponent } from './gate-mod/gate-mod.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent,
    HomeComponent,
    NavComponent,
    RangerComponent,
    ModifyRangerComponent,
    ProfileComponent,
    NotificationsComponent,
    IncidentLevelComponent,
    IncidentLevelModifyComponent,
    IncidentTypeComponent,
    IncidentTypeModifyComponent,
    PatrolLogComponent,
    RegisteruserComponent,
    VehicleComponent,
    PerformanceComponent,
    IncidentReportComponent,
    VehiclesReportComponent,
    AssetsReportComponent,
    RewardsReportComponent,
    StatusReportComponent,
    RangersReportComponent,
    MarkersReportComponent,
    
    
  
    LoginComponent,
    UserroleComponent,
    UserroleModifyComponent,
    AccessLevelModComponent,
    MarkerComponent,
    MarkerModComponent,
    MarkerTypeComponent,
    MarkerTypeModComponent,
    ReserveComponent,
    ReserveModComponent,
    SecurityComponent,
    SecurityModComponent,
    GateComponent,
    GateModComponent,
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    ToastrModule.forRoot({
     closeButton:true,
     positionClass:"toast-bottom-center",
     timeOut:20000,
      }
    ) ,
    ButtonsModule, WavesModule, CardsFreeModule,  
    NgbModule,
    FullCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
