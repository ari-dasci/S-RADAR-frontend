import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaygroundModule } from './pages/playground/playground.module';
import { ConfigComponentsModule } from './shared/components/modals/config-components/config-components.module';

import { CommonModule } from '@angular/common';
import { PlotModalComponent } from './shared/components/modals/plot-modal/plot-modal.component'; // Ajusta ruta

import { PlotlyModule } from 'angular-plotly.js';
import PlotlyJS from 'plotly.js-dist-min';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    AppRoutingModule,
    SharedModule.forRoot(),
    ConfigComponentsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
