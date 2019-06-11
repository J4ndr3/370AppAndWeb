import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentComponent } from './incident/incident.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RangerComponent } from './ranger/ranger.component';
import { ModifyRangerComponent } from './modify-ranger/modify-ranger.component';

@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent,
    HomeComponent,
    NavComponent,
    RangerComponent,
    ModifyRangerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
