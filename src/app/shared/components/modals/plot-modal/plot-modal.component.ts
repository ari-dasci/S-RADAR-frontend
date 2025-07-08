import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'plotly-modal',
  templateUrl: './plot-modal.component.html',
})

export class PlotModalComponent {
  name = 'Home';
  legend = true;
  public graph1 = {
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+points',
        marker: { color: 'red' },
      },
      { x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: { width: 320, height: 240, title: 'Chart #1' },
  };

  public graph2 = {
    data: [
      {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'markers',
        type: 'scatter'
      },
    {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    },
    {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter'
    }
    ],
    layout: { width: 320, height: 240, title: 'Chart #2' },
  };  

  constructor() {
    setInterval(() => {
      console.log(Math.random() * 100);
    }, 500)
  }
}

