import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../models/components/type-component.enum';
import { ComponentItem } from '../../../models/components/component-item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../providers/sharedData.service';
import { DataFilterService } from '../../../providers/data-filter.service';
import { ApiService } from '../../../../core/services/api/app.api.service';

declare module 'axios' {
  interface AxiosRequestConfig {
    customData?: any;
  }
}

@Component({
  selector: 'app-config-components',
  templateUrl: './config-components.component.html',
  styleUrls: ['./config-components.component.css']
})
export class ConfigComponentsComponent implements OnInit {

  @Input() itemSelected: ComponentItem
  inputList: HTMLElement;
  @Output() itemOut = new EventEmitter<FormGroup>();

  components = TypeComponent;
  public formGeral: FormGroup;
  itemSelectedParams: any;

  constructor(private _apiservice: ApiService, public activeModal: NgbActiveModal, private fb: FormBuilder, private sharedDataService: SharedDataService, private dataFilterService: DataFilterService
    , private elementRef: ElementRef) {
    this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
      this.itemSelected = item;
    });
  }

  ngOnInit() {

    this.itemSelected = new ComponentItem(this.itemSelected);
    JSON.stringify(this.itemSelected);

    // Get parameters for the selected node
    const nodeKey = `savedParams_${this.itemSelected.id}`;
    const savedParams = localStorage.getItem(nodeKey);

    if (savedParams) {
      console.log('Saved Params from Local Storage:', savedParams);
      this.itemSelectedParams = JSON.parse(savedParams);
      console.log('Loaded Params from Local Storage:', this.itemSelectedParams);

      // Initialize the form with the saved parameters
        // Initialize formGeral
        this.formGeral = this.fb.group({});

        // Dynamically add form controls based on itemSelectedParams
        for (const key in this.itemSelectedParams) {
          if (this.itemSelectedParams.hasOwnProperty(key)) {
            this.formGeral.addControl(key, this.fb.control(this.itemSelectedParams[key]));
          }
        }
    } else {
      console.log('No saved parameters found in local storage.');
      this.buildForms();
    }
  }

  updateParentForm(childFormValue: any) {
    // Atualize o FormGroup pai com os valores do FormGroup filho
    this.formGeral.patchValue(childFormValue);
  }

  buildForms() {

    //TODO: Fetch parameters from the API (Time Series Data)
    //TODO: Fetch parameters from the API (Federated Data)
    
    //Fetch parameters from the API (Static Data)
    this._apiservice.getParams(this.itemSelected.name).subscribe((data: any) => {
      this.itemSelectedParams = data;
      console.log(this.itemSelectedParams);

      // Initialize formGeral
      this.formGeral = this.fb.group({});

      // Dynamically add form controls based on itemSelectedParams
      for (const key in this.itemSelectedParams) {
        if (this.itemSelectedParams.hasOwnProperty(key)) {
          this.formGeral.addControl(key, this.fb.control(this.itemSelectedParams[key]));
        }
      }

      // Fill the form with the data from itemSelected (default values)
      //this.fillFormGeral();
    }, error => {
      console.error('Error fetching parameters:', error);
    });
  }


  public save_params(){

    // Collect data from formGeral
    const formData = this.formGeral.value;
    //console.log('Form Data:', formData);

    //this.updateItem()

    //this.sharedDataService.updateSelectedItem(this.itemSelected);
    // Show a confirmation alert
    //alert('Parameters saved successfully!');

    const kwargs = { ...formData }; // Spread operator to copy formData into kwargs
    kwargs.algorithm_ = kwargs.algorithm_.toLowerCase();
    console.log('Kwargs:', kwargs);

    // Save parameters with the API
    this._apiservice.setParams(kwargs).subscribe((data: any) => {

      this.updateItem()
      this.sharedDataService.updateSelectedItem(this.itemSelected); 

      // Save parameters to local storage with a node-specific key
      const nodeKey = `savedParams_${this.itemSelected.id}`;
      localStorage.setItem(nodeKey, JSON.stringify(kwargs));

      // Show a confirmation alert
      alert('Parameters saved successfully!');
    }, error => {
      console.log(error)
      const errorMessage = error.detail || error.error?.detail || 'An unexpected error occurred.';
      alert('Error fetching parameters: ' + errorMessage);
    });
  }


  updateItem() {
    // Itera sobre os controles do FormGroup
    Object.keys(this.formGeral.controls).forEach(controlName => {
      // Verifica se o campo correspondente existe em itemSelected
      if (this.itemSelected.hasOwnProperty(controlName)) {
        // Define o valor do controle no itemSelected
        this.itemSelected[controlName] = this.tryParseJSON(this.formGeral.get(controlName)?.value);
      }
    });
  }

  private tryParseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return jsonString; // or handle the error as needed
    }
  }

  public cancelar() {
    this.activeModal.close(false);
  }

 

  private createKeyValuePair() {
    const keyValueTemplate = this.elementRef.nativeElement.querySelector('[data-key-value-template]');
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector("[data-remove-btn]").addEventListener("click", (e: any) => {
      e.target.closest("[data-key-value-pair]").remove()
    })
    return element
  }




 /* Not used functions */
//  private keyValuePairsToObjects(container: any) {
//   const pairs = container.querySelectorAll("[data-key-value-pair]")
//   return [...pairs].reduce((data, pair) => {
//     const key = pair.querySelector("[data-key]").value
//     const value = pair.querySelector("[data-value]").value

//     if (key === "") return data
//     return { ...data, [key]: value }
//   }, {})
// }

// addInput() {
//   const queryInputListContainer = this.elementRef.nativeElement.querySelector('[data-query-inputList]');
//   if (queryInputListContainer)
//     queryInputListContainer.append(this.createKeyValuePair())


//   // this.inputList = document.getElementById('inputList')!;
//   // this.inputList.innerHTML += '<input class="form-control form-control-sm mb-2" type="text" placeholder="Insert input here">';
// }

}
