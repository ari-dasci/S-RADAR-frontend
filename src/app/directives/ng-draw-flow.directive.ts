import { Directive, ElementRef, OnInit } from '@angular/core';
import Drawflow from 'drawflow';

@Directive({
  selector: '[appNgDrawFlow]'
})
export class NgDrawFlowDirective implements OnInit {

  editor: Drawflow;

  constructor(private hostElRef: ElementRef) { }

  ngOnInit() {
    if (!!this.hostElRef?.nativeElement) {
      const { nativeElement } = this.hostElRef;
      this.initDrawFlow(nativeElement);
    }
  }

  private initDrawFlow(el: HTMLElement): void {
    try {
      if (!!el) {
        console.log(el)
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
}
