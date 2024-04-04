import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawFlowComponent } from './draw-flow.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [DrawFlowComponent]
})
export class DrawFlowModule { }
