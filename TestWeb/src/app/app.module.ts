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
     timeOut:4000,
      }
    ) ,
    ButtonsModule, WavesModule, CardsFreeModule,  
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
