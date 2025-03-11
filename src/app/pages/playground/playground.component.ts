import { Component, ViewEncapsulation, OnInit, ViewChild, Inject, ElementRef, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { ApiService } from '../../core/services/api/app.api.service';
import drawflow from 'drawflow';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject } from '@angular/core';
import Drawflow from 'drawflow';


@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [RouterOutlet, PanelMenuModule, MenubarModule, CardModule],
  templateUrl: './playground.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent implements OnInit {
  componentsList: any;
  items: MenuItem[];
  nodes: MenuItem[];

  private staticdata_algorithms: any;
  private timeseries_algorithms: any;

  editor: Drawflow;
  
  constructor(private _apiservice: ApiService, private hostElRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object,
  @Inject(DOCUMENT) private document: Document) {
  }

  private initDrawFlow(el: HTMLElement): void {
    try {
      if (!!el) {
        this.editor = new Drawflow(el);
        this.editor.reroute = true;
        this.editor.editor_mode = 'edit';
       // this.editor.drawflow = ""
        this.editor.start();
      } else {
        console.error('Drawflow host element does not exist');
      }

    } catch (exception) {
      console.error('Unable to start Drawflow', exception);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && !!this.hostElRef?.nativeElement) {
      const { nativeElement } = this.hostElRef;
      this.initDrawFlow(nativeElement);
    } else {
      console.warn('Drawflow initialization skipped because it is not running in the browser environment.');
    }
    this.getAlgorithms('static_data');
    this.getAlgorithms('time_series');
    this.getData();
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              }
            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];
    this.nodes = [
      {
        label: 'Images',
        icon: 'pi pi-fw pi-image',
        items: [
          {
            label: 'Algorithms',
            icon: 'pi pi-fw pi-calculator',
            items: [

            ]
          },
          {
            label: 'Preprocessing',
            icon: 'pi pi-fw pi-lock'
            //icon: 'pi pi-fw pi-file-edit'
          },
          {
            label: 'Visualization',
            icon: 'pi pi-fw pi-lock'
            //icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Static Data',
        icon: 'pi pi-fw pi-database',
        items: [
          {
            label: 'Algorithms',
            icon: 'pi pi-fw pi-calculator',
            items: this.staticdata_algorithms
          },
          {
            label: 'Preprocessing',
            icon: 'pi pi-fw pi-lock'
            //icon: 'pi pi-fw pi-file-edit'
          },
          {
            label: 'Visualization',
            icon: 'pi pi-fw pi-lock'
            //icon: 'pi pi-fw pi-external-link'
          },
          {
            separator: true
          },
          {
            label: 'Misc.',
            icon: 'pi pi-fw pi-align-justify'
          }
        ]
      },
      {
        label: 'Time Series',
        icon: 'pi pi-fw pi-clock',
        items: [
          {
            label: 'Algorithms',
            icon: 'pi pi-fw pi-calculator',
            items: this.timeseries_algorithms,
          },
          {
            label: 'Preprocessing',
            icon: 'pi pi-fw pi-lock'
            //icon: 'pi pi-fw pi-file-edit'
          },
          {
            label: 'Visualization',
            icon: 'pi pi-fw pi-lock'
            //icon: 'pi pi-fw pi-external-link'
          }
        ]
      }
    ];
  }

  getData() {
    this._apiservice.getdata()
      .subscribe(
        (response) => {
          this.componentsList = response;
          //console.log(this.componentsList)
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  getLibraryAlgorithms(_category: string, _library: string) {
    let libraryAlgorithms: any
    this._apiservice.getLibraryAlgorithms(_category, _library)
      .subscribe(
        (response) => {
          libraryAlgorithms = response
          // Map the components array to the desired format
          libraryAlgorithms = libraryAlgorithms.map((element: string) => {
            return {
              label: element.charAt(0).toUpperCase() + element.slice(1), // Capitalize first letter
              icon: 'pi pi-fw pi-calculator', // Assuming a default icon
              items: [] // No dynamic items initially
            };
          });
          //console.log(libraryAlgorithms)
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    return libraryAlgorithms
  }

  getAlgorithms(_category: string) {
    this._apiservice.getAlgorithms(_category)
      .subscribe(
        (response) => {
          if (_category == 'static_data') {
            this.staticdata_algorithms = response
            // Map the components array to the desired format
            this.staticdata_algorithms = this.staticdata_algorithms.map((element: string) => {
              return {
                label: element.charAt(0).toUpperCase() + element.slice(1), // Capitalize first letter
                icon: 'pi pi-fw pi-calculator', // Assuming a default icon
                items: this.getLibraryAlgorithms(_category, element)
              };
            });
            //console.log(this.staticdata_algorithms)
          }
          if (_category == 'time_series') {
            this.timeseries_algorithms = response
            // Map the components array to the desired format
            this.timeseries_algorithms = this.timeseries_algorithms.map((element: string) => {
              return {
                label: element.charAt(0).toUpperCase() + element.slice(1), // Capitalize first letter
                icon: 'pi pi-fw pi-calculator', // Assuming a default icon
                items: this.getLibraryAlgorithms(_category, element)
              };
            });
            //console.log(this.timeseries_algorithms)
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}

