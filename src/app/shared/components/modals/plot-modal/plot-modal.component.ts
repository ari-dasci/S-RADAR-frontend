import { CommonModule } from '@angular/common';
import { ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../models/components/type-component.enum';
import { ComponentItem } from '../../../models/components/component-item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedDataService } from '../../../providers/sharedData.service';
import { DataFilterService } from '../../../providers/data-filter.service';
import { ApiService } from '../../../../core/services/api/app.api.service';


import { Component } from '@angular/core';
import PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
    selector: 'plotly-modal',
    templateUrl: './plot-modal.component.html',
    styleUrls: ['./plot-modal.component.scss']
})

export class PlotModalComponent {

    customFields = [
        { name: 'plot_technique', type: 'select', options: ['scatter', 'line', 'hist', 'boxplot', 'heatmap', 'prediction_forecasting', 'anomaly_labels', 'plot_anomaly'] },
        { name: 'dim_reduction_technique', type: 'select', options: ['PCA', 't-SNE', 'UMAP', 'None'] },
        { name: 'n_components', type: 'text' },
        { name: 'color_map', type: 'text' },
        { name: 'point_size', type: 'text' },
        { name: 'opacity', type: 'text' },
        { name: 'heatmap_color', type: 'text' },
        { name: 'subset_size_percent', type: 'text' },
    ];


    @Input() itemSelected: ComponentItem
    inputList: HTMLElement;
    @Output() itemOut = new EventEmitter<FormGroup>();

    components = TypeComponent;
    public formVisualization: FormGroup;
    itemSelectedParams: any;
    public selectedParam: string;



    name = 'Home';
    legend = true;
    graph: { data: any[]; layout: any } | null = null;


    formGeral: FormGroup<{}>;


    constructor(private _apiservice: ApiService, public activeModal: NgbActiveModal, private fb: FormBuilder, private sharedDataService: SharedDataService, private dataFilterService: DataFilterService
        , private elementRef: ElementRef) {
        this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
            this.itemSelected = item;
        });

    }

    ngOnInit() {
        this.itemSelected = new ComponentItem(this.itemSelected);
        JSON.stringify(this.itemSelected);
        console.log('Selected Item:', this.itemSelected);

        // Get parameters for the selected node, if avbailable in local storage
        const nodeKey = `savedParams_${this.itemSelected.id}`;
        console.log('Node Key:', nodeKey);
        const savedParams = localStorage.getItem(nodeKey);

        if (savedParams) {
            //Fill the tab plot with the saved parameters
            console.log('Saved Parameters from Local Storage:', savedParams);
            var plot = JSON.parse(savedParams);

            if (plot['plot'] !== null) {
                this.graph = plot['plot'];
            }
            console.log('Loaded Plot from Local Storage:', this.graph);

            //Fill the form with the saved parameters
            this.formGeral = this.fb.group({});

            this.customFields.forEach(field => {
                this.formGeral.addControl(field.name, this.fb.control(plot[field.name] || ''));
            });

        } else {
            console.log('No saved parameters found in local storage.');
            this.buildForms();
        }
    }


    buildForms() {

        //This form is filled manually
        this.formGeral = this.fb.group({});

        this.customFields.forEach(field => {
            this.formGeral.addControl(field.name, this.fb.control(''));
        });

        // Save parameters to local storage with a node-specific key
        var formData: any = this.formGeral.value;
        // Add plot variable to the formData
        formData['plot'] = this.graph;

        const kwargs = { ...formData };
        const nodeKey = `savedParams_${this.itemSelected.id}`;
        localStorage.setItem(nodeKey, JSON.stringify(kwargs));
        console.log('Form Data:', formData);
    }


    public cancelar() {
        this.activeModal.close(false);
    }


    public save_params() {
        // Collect data from formGeral
        var formData: any = this.formGeral.value;
        // Add plot variable to the formData
        formData['plot'] = this.graph;

        const kwargs = { ...formData };
        const nodeKey = `savedParams_${this.itemSelected.id}`;
        localStorage.setItem(nodeKey, JSON.stringify(kwargs));
        console.log('Form Data:', formData);


        // Show a confirmation alert
        alert('Parameters saved successfully!');
    }

    public save_plot(nodeKey: string, jsonData: any) {
        console.log('Saving parameters for:', nodeKey);
        const finalNodeKey = `savedParams_${this.itemSelected.id}`;
        localStorage.setItem(finalNodeKey, JSON.stringify(jsonData));
    }
}

