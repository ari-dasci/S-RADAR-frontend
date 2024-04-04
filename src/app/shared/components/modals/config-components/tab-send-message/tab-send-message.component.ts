import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentItem } from '../../../../models/components/component-item';
import { TypeComponent } from '../../../../models/components/type-component.enum';

@Component({
  selector: 'app-tab-send-message',
  templateUrl: './tab-send-message.component.html',
  styleUrls: ['./tab-send-message.component.css']
})
export class TabSendMessageComponent implements OnInit {

  @Input() itemSelected: ComponentItem

  @Output() sendMessageFormUpdated: EventEmitter<any> = new EventEmitter<any>();
  public formGeral: FormGroup;
  private components = TypeComponent;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }

  async ngOnInit() {
    await Promise.all([
      this.buildForms()
    ]);

    await Promise.all([
      this.fillFormGeral(),
      
      // Exemplo de como você pode detectar mudanças no FormGroup filho e emitir um evento
      this.formGeral.valueChanges.subscribe(value => {
        this.sendMessageFormUpdated.emit(value);
      })
    ]);


  }


  private async buildForms() {
    this.formGeral = this.fb.group({
      name: [''],
      nameOut: [''],
      data: [{}],
    });
  }

  fillFormGeral() {
    this.formGeral.patchValue({
      name: this.itemSelected.name,
      nameOut: this.itemSelected.name.concat('_result'),
      data: JSON.stringify(this.itemSelected.data)
    });

    if (this.itemSelected.class === this.components.StartFlow) {
      this.formGeral.disable()
    }
  }
}
