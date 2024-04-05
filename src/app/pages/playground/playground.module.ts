import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent } from './playground.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [PlaygroundComponent]
})
export class PlaygroundModule { }
