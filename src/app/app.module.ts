import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompassWidgetComponent } from './compass-widget/compass-widget.component';
import { GaugeWidgetComponent } from './gauge-widget/gauge-widget.component';
import { GraphWidgetComponent } from './graph-widget/graph-widget.component';
import { ClockWidgetComponent } from './clock-widget/clock-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    CompassWidgetComponent,
    GaugeWidgetComponent,
    GraphWidgetComponent,
    ClockWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
