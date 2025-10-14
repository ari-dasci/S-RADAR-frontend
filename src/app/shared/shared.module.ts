import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigComponentsComponent } from './components/modals/config-components/config-components.component';
import { ConfigComponentsModule } from './components/modals/config-components/config-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataFilterService } from './providers/data-filter.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiService } from './providers/api.service';
import { FlowService } from './providers/flow.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigDatasetComponentsComponent } from './components/modals/config-dataset-components/config-dataset-components.component';
import { PlotModalComponent } from './components/modals/plot-modal/plot-modal.component';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    PlotlyModule,
    NgSelectModule,
    HttpClientModule,
  ],
  declarations: [ConfigDatasetComponentsComponent, PlotModalComponent],
  providers: [DataFilterService, ApiService, FlowService],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, BrowserModule, PlotModalComponent, ConfigComponentsModule, KeyValuePipe, NgSelectModule]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        FlowService,
        HttpClientModule
      ]
    }
  }
}
