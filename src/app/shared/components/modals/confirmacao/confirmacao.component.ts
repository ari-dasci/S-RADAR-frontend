import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {

  @Input() confirmacao: string = "Tem certeza que deseja realizar essa ação?";
  @Input() titulo: string = "Atenção"
  @Input() confirmarLabel: string = "Confirmar"
  @Input() cancelarLabel: string = "Cancelar"
  @Input() html: boolean = false;
  @Input() opcionalLabel: string;
  public botaoOpcionalVermelho : boolean;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() { }

  public confirmar() {
    this.activeModal.close(true);
  }

  public cancelar() {
    this.activeModal.close(false);
  }

  public botaoOpcional() {
    this.activeModal.close('nao');
  }

}
