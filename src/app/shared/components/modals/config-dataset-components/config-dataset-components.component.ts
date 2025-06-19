import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../models/components/type-component.enum';
import { ComponentItem } from '../../../models/components/component-item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../providers/sharedData.service';
import { DataFilterService } from '../../../providers/data-filter.service';
import { ApiService } from '../../../../core/services/api/app.api.service';

@Component({
  selector: 'app-config-dataset-components',
  templateUrl: './config-dataset-components.component.html',
  styleUrl: './config-dataset-components.component.scss'
})
export class ConfigDatasetComponentsComponent {

  @Input() itemSelected: ComponentItem
  inputList: HTMLElement;
  @Output() itemOut = new EventEmitter<FormGroup>();

  components = TypeComponent;
  public formDataset: FormGroup;
  itemSelectedParams: any;
  public selectedParam: string;

  constructor(private _apiservice: ApiService, public activeModal: NgbActiveModal, private fb: FormBuilder, private sharedDataService: SharedDataService, private dataFilterService: DataFilterService
    , private elementRef: ElementRef) {
    this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
      this.itemSelected = item;
    });
  }

  ngOnInit() {

    this.itemSelected = new ComponentItem(this.itemSelected);
    JSON.stringify(this.itemSelected);

    // Get parameters for the selected node, if avbailable in local storage
    const nodeKey = `savedParams_${this.itemSelected.id}`;
    const savedParams = localStorage.getItem(nodeKey);

    if (savedParams) {
      console.log('Saved Params from Local Storage:', savedParams);
      var optionSelected = JSON.parse(savedParams);
      console.log('Loaded Params from Local Storage:', optionSelected);

      this._apiservice.getDatasets(this.itemSelected.data.data.category).subscribe((data: any) => {
        this.itemSelectedParams = data;

        //Load the optionSelected into the formDataset
        this.formDataset = this.fb.group({
          datasetSelected: [optionSelected]
        });


      }, error => {
        console.error('Error fetching parameters:', error);
      });
    } else {
      console.log('No saved parameters found in local storage.');
      this.buildForms();
    }
  }

  updateParentForm(childFormValue: any) {
    this.formDataset.patchValue(childFormValue);
  }

  buildForms() {

    //Fetch parameters from the API (Datasets in that category)
    this._apiservice.getDatasets(this.itemSelected.data.data.category).subscribe((data: any) => {
      this.itemSelectedParams = data;
      console.log(this.itemSelectedParams);

      // Initialize formDataset
      this.formDataset = this.fb.group({
        datasetSelected: ['1']
      });


    }, error => {
      console.error('Error fetching parameters:', error);
    });
  }


  public save_params(){

    // Collect data from formDataset
    const formData = this.formDataset.value;

    console.log('formData:', formData);


    this.updateItem();
    this.sharedDataService.updateSelectedItem(this.itemSelected); 

    // Save parameters to local storage with a node-specific key
    const nodeKey = `savedParams_${this.itemSelected.id}`;
    localStorage.setItem(nodeKey, JSON.stringify(formData.datasetSelected));

    // Show a confirmation alert
    alert('Parameters saved successfully!');
  }


  updateItem() {
    // Itera sobre os controles do FormGroup
    Object.keys(this.formDataset.controls).forEach(controlName => {
      // Verifica se o campo correspondente existe em itemSelected
      if (this.itemSelected.hasOwnProperty(controlName)) {
        // Define o valor do controle no itemSelected
        this.itemSelected[controlName] = this.tryParseJSON(this.formDataset.get(controlName)?.value);
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



}
