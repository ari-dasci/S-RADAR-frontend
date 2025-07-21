import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Drawflow from 'drawflow';
import { ConfigComponentsComponent } from '../../shared/components/modals/config-components/config-components.component';
import { TypeComponent, icon } from '../../shared/models/components/type-component.enum';
import { SharedDataService } from '../../shared/providers/sharedData.service';
import { FlowService } from '../../shared/providers/flow.service';
import { ApiService } from '../../core/services/api/app.api.service';
import { ConfigDatasetComponentsComponent } from '../../shared/components/modals/config-dataset-components/config-dataset-components.component';

import { PlotModalComponent } from '../../shared/components/modals/plot-modal/plot-modal.component';


@Component({
  selector: 'playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {

  playground_nodes: any[] = [];
  playground_connections: any[] = [];

  //Typenames
  federated_data: string = 'federated_data';
  static_data: string = 'static_data';
  time_series: string = 'time_series';

  //Model variables
  staticdata_categories: { label: string, icon: string, expanded: boolean }[] = [
    { label: 'Algorithms', icon: 'fa fa-cogs', expanded: false },
    { label: 'Preprocessing', icon: 'fa fa-cogs', expanded: false },
  ];
  staticdata_algorithms: { label: string, icon: string, items: any, expanded: boolean }[] = [];
  preprocessing_static: { label: string }[] = []

  timeseries_categories: { label: string, icon: string, expanded: boolean }[] = [
    { label: 'Algorithms', icon: 'fa fa-cogs', expanded: false },
    { label: 'Preprocessing', icon: 'fa fa-cogs', expanded: false },
  ];
  timeseries_algorithms: { label: string, icon: string, items: any, expanded: boolean }[] = [];
  preprocessing_ts: { label: string }[] = []

  federated_categories: { label: string, icon: string, expanded: boolean }[] = [
    { label: 'Algorithms', icon: 'fa fa-cogs', expanded: false }
  ];
  federated_algorithms: { label: string, icon: string, items: any, expanded: boolean }[] = [];


  //Drawflow variables
  @Input()
  nodes: any[];
  @Input()
  drawingData: string;
  @Input()
  locked: boolean;
  @Input()
  showLock: boolean;
  @Input()
  showNodes: boolean;
  @Input()
  otherDetails: any;

  isLoading: boolean = false;
  toggleableFederated: boolean = false;
  toggleableStatic: boolean = false;
  toggleableTime: boolean = false;
  editor!: any;
  editDivHtml: HTMLElement;
  editButtonShown: boolean = false;

  selectedNodeId: string;
  selectedNode: any = {};

  nodeModal: ElementRef;

  components = TypeComponent;

  isLightTheme = true;
  showExportButton: boolean = true;
  exportData: string;

  constructor(private cdRef: ChangeDetectorRef, private _apiservice: ApiService, private modalService: NgbModal, private sharedDataService: SharedDataService, private flowService: FlowService, private renderer: Renderer2, private el: ElementRef) {
    this.sharedDataService.getSelectedItemObservable().subscribe((item) => {
      if (this.selectedNodeId) {
        const id = this.selectedNodeId.slice(5);
        this.editor.drawflow.drawflow.Home.data[`${id}`] = item
      }
    });
  }

  ngOnInit() {
    this.getAlgorithms('static_data');
    this.getPreprocessing('static_data');
    this.getAlgorithms('time_series');
    this.getPreprocessing('time_series');
    this.getAlgorithms('federated_data');
  }

  ngAfterViewInit(): void {
    this.initDrawingBoard();
    this.editor.editor_mode = this.locked != null && this.locked ? 'fixed' : 'edit';
  }


  // Toggle the visibility of a category (like 'Algorithms' or 'Preprocessing')
  toggleCategory(category: { label: string, icon: string, expanded: boolean }) {
    category.expanded = !category.expanded;
  }

  // Toggle the visibility of an algorithm inside the 'Algorithms' category
  toggleAlgorithm(algorithm: { label: string, icon: string, expanded: boolean }, event: MouseEvent) {
    event.stopPropagation(); // Prevent the click event from bubbling up and toggling the parent category
    algorithm.expanded = !algorithm.expanded;
  }


  // ******************************************** MODEL OPERATIONS *****************************************************************//


  getLibraryAlgorithms(_category: string, _library: string) {
    try {
      const libraryAlgorithms: any = this._apiservice.getLibraryAlgorithms(_category, _library);
      console.log(libraryAlgorithms)
      return libraryAlgorithms
    } catch (error) {
      console.error('Error fetching library algorithms:', error);
      throw error; // Rethrow the error to handle it in the caller function
    }
  }

  getPreprocessing(_category: string) {
    this._apiservice.getPreprocessing(_category)
      .subscribe(
        (response: any) => {
          if (_category == 'static_data') {
            const preprocessing: any[] = response;
            preprocessing.forEach(element => {
              this.preprocessing_static.push({
                label: element
              });
            });
          }
          if (_category == 'time_series') {
            const preprocessing: any[] = response;
            preprocessing.forEach(element => {
              this.preprocessing_ts.push({
                label: element
              });
            });
          }
        },
        (error: any) => {
          console.error('Error fetching data:', error);
        }
      );

  }

  getAlgorithms(_category: string) {
    this._apiservice.getAlgorithms(_category)
      .subscribe(
        (response: any) => {
          if (_category == 'static_data') {
            const algorithms: any[] = Object.keys(response).map(key => response[key]);

            algorithms.forEach(element => {
              this._apiservice.getLibraryAlgorithms(_category, element).subscribe(
                (response) => {
                  const libraryAlgorithms: any = response;
                  const formattedAlgorithms = libraryAlgorithms.map((element: string) => element.charAt(0).toUpperCase() + element.slice(1));
                  console.log(formattedAlgorithms);

                  this.staticdata_algorithms.push({
                    label: element.charAt(0).toUpperCase() + element.slice(1),
                    icon: 'pi pi-fw pi-calculator',
                    items: formattedAlgorithms,
                    expanded: false,
                  })

                  return formattedAlgorithms;
                }
                , (error) => {
                  console.error('Error fetching data:', error);
                }
              )
            });

          }
          if (_category == 'time_series') {
            const algorithms: any[] = Object.keys(response).map(key => response[key]);

            algorithms.forEach(element => {
              this._apiservice.getLibraryAlgorithms(_category, element).subscribe(
                (response) => {
                  const libraryAlgorithms: any = response;
                  const formattedAlgorithms = libraryAlgorithms.map((element: string) => element.charAt(0).toUpperCase() + element.slice(1));
                  console.log(formattedAlgorithms);

                  this.timeseries_algorithms.push({
                    label: element.charAt(0).toUpperCase() + element.slice(1),
                    icon: 'pi pi-fw pi-calculator',
                    items: formattedAlgorithms,
                    expanded: false,
                  })

                  return formattedAlgorithms;
                }
                , (error) => {
                  console.error('Error fetching data:', error);
                }
              )
            });
          }
          if (_category == 'federated_data') {
            const algorithms: any[] = Object.keys(response).map(key => response[key]);

            algorithms.forEach(element => {
              this._apiservice.getLibraryAlgorithms(_category, element).subscribe(
                (response) => {
                  const libraryAlgorithms: any = response;
                  const formattedAlgorithms = libraryAlgorithms.map((element: string) => element.charAt(0).toUpperCase() + element.slice(1));
                  console.log(formattedAlgorithms);

                  this.federated_algorithms.push({
                    label: element.charAt(0).toUpperCase() + element.slice(1),
                    icon: 'pi pi-fw pi-calculator',
                    items: formattedAlgorithms,
                    expanded: false,
                  })

                  return formattedAlgorithms;
                }
                , (error) => {
                  console.error('Error fetching data:', error);
                }
              )
            });
          }
        },

        (error) => {
          console.error('Error fetching data:', error);
        }
      );

  }

  // ******************************************************************************************************************************//

  toggleItem(algorithm: any) {
    algorithm.expanded = !algorithm.expanded; // Toggle the expanded property
  }

  private initDrawingBoard() {
    this.initDrawFlow();
    if (!this.locked) {
      this.addEditorEvents();
      this.dragEvent();
    }
  }

  // Private functions
  private initDrawFlow(): void {
    if (typeof document !== 'undefined') {
      const drawFlowHtmlElement = document.getElementById('drawflow');
      this.editor = new Drawflow(drawFlowHtmlElement as HTMLElement);

      this.editor.reroute = true;
      this.editor.curvature = 0.5;
      this.editor.reroute_fix_curvature = true;
      this.editor.reroute_curvature = 0.5;
      this.editor.force_first_input = false;
      this.editor.line_path = 1;
      this.editor.editor_mode = 'edit';
      this.editor.useuuid = true;

      this.editor.start();
    }
  }

  private addEditorEvents() {
    // Event listeners for the Drawflow editor
    this.editor.on('nodeCreated', (id: any) => {
      console.log('Editor Event :>> Node created ' + id, this.editor.getNodeFromId(id));

    });

    this.editor.on('nodeRemoved', (id: any) => {
      console.log('Editor Event :>> Node removed ' + id);
      // Remove node info from list of nodes (playground_nodes)
      this.playground_nodes = this.playground_nodes.filter(node => node.id_drawflow !== id);
      console.log('Playground nodes after removal: ', this.playground_nodes);

      //Remove connection info from list of connections if node is present in the connection (playground_connections)
      this.playground_connections = this.playground_connections.filter(
        conn => !(conn.output_id === id || conn.input_id === id));

      console.log('Playground connections after removal: ', this.playground_connections);
    });

    this.editor.on('nodeSelected', (id: any) => {
      console.log('Editor Event :>> Node selected ' + id, this.editor.getNodeFromId(id));
      this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${id}`];
      console.log('Editor Event :>> Node selected :>> this.selectedNode :>> ', this.selectedNode);
      console.log('Editor Event :>> Node selected :>> this.selectedNode :>> ', this.selectedNode.data);
    });

    this.editor.on('click', (e: any) => {
      console.log('Editor Event :>> Click :>> ', e);
      if (e.target.closest('.drawflow_content_node') != null || e.target.classList[0] === 'drawflow-node') {
        if (e.target.closest('.drawflow_content_node') != null) {
          this.selectedNodeId = e.target.closest('.drawflow_content_node').parentElement.id;
        } else {
          this.selectedNodeId = e.target.id;
        }
        this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${this.selectedNodeId.slice(5)}`];
        console.log('Editor Event :>> Click :>> this.selectedNode :>> ', this.selectedNode);
        console.log('Editor Event :>> Click :>> this.selectedNodeId :>> ', this.selectedNodeId);
      }

      if (e.target.closest('#editNode') != null || e.target.classList[0] === 'edit-node-button') {
        // Open modal with Selected Node   
        this.open(this.nodeModal, this.selectedNodeId);
      }

      if (e.target.closest('#editNode') === null) {
        this.hideEditButton();
      }
    });

    this.editor.on('moduleCreated', (name: any) => {
      console.log('Editor Event :>> Module Created ' + name);
    });

    this.editor.on('moduleChanged', (name: any) => {
      console.log('Editor Event :>> Module Changed ' + name);
    });

    this.editor.on('connectionCreated', (connection: any) => {
      console.log('Editor Event :>> Connection created ', connection);
      this.playground_connections.push(connection);

      console.log('Playground connections: ', this.playground_connections);

    });

    this.editor.on('connectionRemoved', (connection: any) => {
      console.log('Editor Event :>> Connection removed ', connection);

      //Remove connection info from list of connections (playground_connections)
      this.playground_connections = this.playground_connections.filter(conn => !(conn.output_id === connection.output_id && conn.input_id === connection.input_id));

      console.log('Playground connections after removal: ', this.playground_connections);
    });

    this.editor.on('contextmenu', (e: any) => {
      console.log('Editor Event :>> Context Menu :>> ', e);

      if (e.target.closest('.drawflow_content_node') != null || e.target.classList[0] === 'drawflow-node') {
        if (e.target.closest('.drawflow_content_node') != null) {
          this.selectedNodeId = e.target.closest('.drawflow_content_node').parentElement.id;
        } else {
          this.selectedNodeId = e.target.id;
        }
        this.selectedNode = this.editor.drawflow.drawflow.Home.data[`${this.selectedNodeId.slice(5)}`];

        this.showEditButton();
      }
    });

    this.editor.on('zoom', (zoom: any) => {
      console.log('Editor Event :>> Zoom level ' + zoom);
    });

    this.editor.on('addReroute', (id: any) => {
      console.log('Editor Event :>> Reroute added ' + id);
    });

    this.editor.on('removeReroute', (id: any) => {
      console.log('Editor Event :>> Reroute removed ' + id);
    });

    this.editor.on('nodeMoved', (id: any) => {
      console.log('Editor Event :>> Node moved ' + id);
    });

    this.editor.on('translate', (position: any) => {
      console.log(
        'Editor Event :>> Translate x:' + position.x + ' y:' + position.y
      );
    });

    this.editor.on('dblclick', (e: any) => {
      console.log(
        'Editor Event :>> Translate dblclick'
      );
    });

    this.editor.container.addEventListener('dblclick', (e: any) => {
      if (e.target.closest(".drawflow_content_node")?.parentElement) {
        this.openModalConfig();
      }
    });
  }


  private dragEvent() {
    var elements = Array.from(document.getElementsByClassName('drag-drawflow'));

    elements.forEach(element => {
      element.addEventListener("dblclick", (event) => { });

    });

  }

  public allowDrop(ev: any) {
    ev.preventDefault();
  }

  drag(ev: any) {
    if (ev.type === "touchstart") {
      this.selectedNode = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      ev.dataTransfer.setData("model", ev.target.getAttribute('data-model'));
      ev.dataTransfer.setData("category", ev.target.getAttribute('data-category'));
      ev.dataTransfer.setData("icon", ev.target.getAttribute('data-icon'));
    }
  }

  drop(ev: any) {
    if (ev.type === "touchend") {

    } else {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("node");
      var category = ev.dataTransfer.getData("category");
      var model = ev.dataTransfer.getData("model");
      var icon = ev.dataTransfer.getData("icon");
      console.log('Drop data: ', data, category, icon);
      this.addNodeToDrawFlow(data, category, model, icon, ev.clientX, ev.clientY);
    }
  }

  private addNodeToDrawFlow(name: string, category: string, model: string, icon: string, pos_x: number, pos_y: number): false | true {
    if (this.editor.editor_mode === 'fixed') {
      return false;
    }

    pos_x = pos_x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)));
    pos_y = pos_y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)));

    let html = '';

    if (name) {
      if (model == "null")
        html = `<div class="title-box"><i class="${icon}"></i> <span>${name}</span></div>`;
      else
        html = `<div class="title-box"><i class="${icon}"></i> <span>${model}</span></div>`;

      var data = { "id_drawflow": -1, "category": category, "op_type": name, "model": model, "params": {} };
      const nodeId = this.editor.addNode(name, 1, 1, pos_x, pos_y, name, { data }, html);
      data.id_drawflow = nodeId;
      this.playground_nodes.push(data);
      console.log('Playground nodes: ', this.playground_nodes);
    }

    return true;
  }

  async runTest() {
    this.isLoading = true;
    //Node params have not been updated, get that information
    this.playground_nodes.forEach(node => {
      const nodeKey = `savedParams_${node.id_drawflow}`;
      const savedParams = localStorage.getItem(nodeKey);
      this.playground_nodes = this.playground_nodes.map(n => {
        if (n.id_drawflow === node.id_drawflow && savedParams) {
          return { ...n, params: JSON.parse(savedParams) };
        }
        return n;
      });
      console.log('Test: Updated playground_nodes:', this.playground_nodes);
    });

    //Parse the node graphs (nodes and connections)
    this.playground_nodes.forEach(node => {
      console.log(node); // Each node object
    });

    const nodesJson = {
      nodes: this.playground_nodes.map(node => ({
        id: node.id_drawflow,
        category: node.category,
        op_type: node.op_type,
        model: node.model,
        params: node.params
      })),

      edges: this.playground_connections.map(conn => ({
        source: conn.output_id,
        target: conn.input_id
      }))
    };
    console.log(JSON.stringify(nodesJson, null, 2));


    this._apiservice.run_pipeline(JSON.stringify(nodesJson, null, 2)).subscribe(
      (data: any) => {
        try {

          const last_vis = null;
          const visualizations = data.visualizations;

          // Store visualization for each node in localStorage
          for (const key in visualizations) {
            if (visualizations.hasOwnProperty(key)) {
              const value = JSON.parse(visualizations[key]);
              console.log('Visualization for node:', key, value);

              // 1. Get possible stored params for the node
              const finalNodeKey = `savedParams_${key}`;
              const savedParams = localStorage.getItem(finalNodeKey);

              // 2. If there are saved params, merge them with the new plot data
              if (savedParams) {
                const savedParamsObj = JSON.parse(savedParams);
                savedParamsObj['plot'] = value;

                const kwargs = { ...savedParamsObj };
                localStorage.setItem(finalNodeKey, JSON.stringify(savedParamsObj));

                console.log('Saving parameters for:', key);
              }

              //3. Load the last Plotly figure into the modal and open it
              const modalVis = this.modalService.open(PlotModalComponent, {
                centered: true,
                backdrop: 'static',
                size: 'xl'
              });

              // Assign the parsed Plotly JSON to the modal component
              modalVis.componentInstance.itemSelected = this.editor.drawflow.drawflow.Home.data[`${key}`];
              modalVis.componentInstance.graph = value;
            }


          }
          alert(data.message)
          this.showExportButton = true;
          this.exportData = data.results
        } catch (e) {
          console.error('Failed to parse plot data:', e);
          alert('Could not parse the plot data returned from the server.');
        } finally {
          this.isLoading = false; // END loading
          this.cdRef.detectChanges();
        }
      },
      (error: { detail: any; error: { detail: any; }; }) => {
        console.log(error);
        const errorMessage = error.detail || error.error?.detail || 'An unexpected error occurred.';
        alert('Error fetching parameters: ' + errorMessage);
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
  }


  onClear() {
    this.editor.clear();
  }

  changeMode() {
    debugger
    this.locked = !this.locked;
    this.editor.editor_mode = this.locked != null && this.locked == false ? 'edit' : 'fixed';
  }

  onZoomOut() {
    this.editor.zoom_out();
  }

  onZoomIn() {
    this.editor.zoom_in();
  }

  onZoomReset() {
    this.editor.zoom_reset();
  }

  private openModalConfig() {

    //Node types with no modal configuration
    if (this.selectedNode.name === 'Preprocessing' || this.selectedNode.name === 'Predict Model' || this.selectedNode.name === 'Decision Function Model') {
    }
    else if (this.selectedNode.name === 'Load Dataset') { //Load Dataset modal
      const modalRef = this.modalService.open(ConfigDatasetComponentsComponent, {
        centered: true,
        backdrop: 'static',
        size: 'lg'
      });

      modalRef.componentInstance.itemSelected = this.selectedNode;
    }
    else if (this.selectedNode.name === 'Visualization') { //Plot modal
      const modalVis = this.modalService.open(PlotModalComponent, {
        centered: true,
        backdrop: 'static',
        size: 'xl'
      });
      modalVis.componentInstance.itemSelected = this.selectedNode;
    }
    else { //Modal for every algorithm with configuration
      const modalRef = this.modalService.open(ConfigComponentsComponent, {
        centered: true,
        backdrop: 'static',
        size: 'lg'
      });

      modalRef.componentInstance.itemSelected = this.selectedNode;

    }
  }


  private hideEditButton() {
    this.editButtonShown = false;
    this.editDivHtml = document.getElementById('editNode')!;

    if (this.editDivHtml) {
      this.editDivHtml.remove();
    }
  }

  open(content: any, nodeId: string) {
    this.hideEditButton();
    // const { inputsCount, outputsCount } = this.countInOutputsOfNode(JSON.parse(oldNodeStringified));

    this.openModalConfig()
    // const modalRef = this.modalService.open(content, { size: 'xl', backdrop: 'static', keyboard: false });
  }

  private showEditButton() {
    this.editButtonShown = true;
    this.editDivHtml = document.createElement('div');
    this.editDivHtml.id = 'editNode';
    this.editDivHtml.innerHTML = '<i class="fas fa-pen" aria-hidden="true"></i>';
    this.editDivHtml.className = 'edit-node-button';

    const selectedNodeHtml = document.getElementById(this.selectedNodeId);
    selectedNodeHtml?.append(this.editDivHtml);
  }

  onThemeSwitchChange() {
    const htmlElement = document.querySelector('[data-bs-theme]')
    this.renderer.setAttribute(htmlElement, 'data-bs-theme', this.isLightTheme ? 'dark' : 'light');
    this.isLightTheme = !this.isLightTheme;
  }
  exportToTxt() {
    // (same logic as above)
    this.showExportButton = false;
  }

}
