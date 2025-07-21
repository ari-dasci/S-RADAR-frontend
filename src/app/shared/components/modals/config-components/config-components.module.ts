import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponentsComponent } from './config-components.component';
import { NavTabsConfigComponent } from './nav-tabs-config/nav-tabs-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [ConfigComponentsComponent, NavTabsConfigComponent]
})
export class ConfigComponentsModule { }
