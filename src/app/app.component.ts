import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PlaygroundComponent } from './pages/playground/playground.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 's-adl-frontend';
  constructor(private primengConfig: PrimeNGConfig) { }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
