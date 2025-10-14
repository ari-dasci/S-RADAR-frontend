import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeComponent } from '../../../../models/components/type-component.enum';
import { ComponentItem } from '../../../../models/components/component-item';

@Component({
  selector: 'app-nav-tabs-config',
  templateUrl: './nav-tabs-config.component.html',
  styleUrls: ['./nav-tabs-config.component.css']
})
export class NavTabsConfigComponent implements OnInit {

  @Input() componentName: string;
  @Input() itemSelected: ComponentItem;

  components = TypeComponent;

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {
  }

}
