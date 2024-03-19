import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './app.api.service';
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
export class AppComponent implements OnInit {
  newdata: any;

  constructor(private _apiservice: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._apiservice.getdata().subscribe(res => {
      this.newdata = res
      console.log(this.newdata)
    })
  }
}