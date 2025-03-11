import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';


interface ApiResponse {
  message: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
=======
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
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2
