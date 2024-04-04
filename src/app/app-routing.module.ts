import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawFlowComponent } from './modules/draw-flow/draw-flow.component';

const routes: Routes = [
  {
    path: '',
    component: DrawFlowComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
