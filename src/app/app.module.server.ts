import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { DxServerModule } from 'devextreme-angular/server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    DxServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
