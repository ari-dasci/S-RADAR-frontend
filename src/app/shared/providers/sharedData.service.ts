import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private selectedItemSubject = new BehaviorSubject<any>(null);
  constructor() { }
  
  getSelectedItemObservable() {
    return this.selectedItemSubject.asObservable();
  }

  updateSelectedItem(item: any) {
    this.selectedItemSubject.next(item);
  }
}
