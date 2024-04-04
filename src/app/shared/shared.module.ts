import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmacaoComponent } from './components/modals/confirmacao/confirmacao.component';
import { ConfigComponentsComponent } from './components/modals/config-components/config-components.component';
import { ConfigComponentsModule } from './components/modals/config-components/config-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataFilterService } from './providers/data-filter.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiService } from './providers/api.service';
import { FlowService } from './providers/flow.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WbotComponent } from './components/modals/wbot/wbot.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgSelectModule,
    HttpClientModule
  ],
  declarations: [ConfirmacaoComponent, WbotComponent],
  providers: [DataFilterService, ApiService, FlowService],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, BrowserModule, ConfirmacaoComponent, ConfigComponentsModule, KeyValuePipe, NgSelectModule, WbotComponent]
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
