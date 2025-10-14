import { Injectable } from '@angular/core';
import * as jmespath from 'jmespath';

@Injectable({
  providedIn: 'root'
})
export class DataFilterService {

  constructor() { }

  filterData(data: any[], expression: string): any[] {
    return jmespath.search(data, expression);
  }
}
