import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wbot',
  templateUrl: './wbot.component.html',
  styleUrls: ['./wbot.component.css']
})
export class WbotComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.loadChat();
  }

  public cancelar() {
    this.activeModal.close(false);
  }

  private loadChat() {
    const d = new Date();
    let h: number = d.getHours();
    let min: number = d.getMinutes();
    const hStr: string = h < 10 ? "0" + h : h.toString();
    const tStr: string = min < 10 ? "0" + min : min.toString();
    const hourAdjusted: number = h < 12 ? h : h - 12;
    const time = hourAdjusted < 10 ? `0${hourAdjusted}:${tStr} am` : `${hourAdjusted}:${tStr} pm`;

    const statusElement = document.querySelector('.status');
    if (statusElement) {
      statusElement.innerHTML = `last seen today at ${time}`;
    }

    const tickElement = document.querySelector('.tick');
    if (tickElement) {
      const tickSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='15' id='msg-dblcheck-ack' x='2063' y='2076'><path d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z' fill='#4fc3f7'/></svg>`;
      tickElement.innerHTML = tickSVG;
    }

    const emojiElement = document.querySelector('.emoji');
    if (emojiElement) {
      const emojiSVG = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' id='smiley' x='3147' y='3209'><path fill-rule='evenodd' clip-rule='evenodd' d='M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z' fill='#7d8489'/></svg>`;
      emojiElement.innerHTML = emojiSVG;
    }

    const sendElement = document.querySelector('.send .circle');
    if (sendElement) {
      const sendSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="send" width='24' height='24'>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path
        d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
        fill="#ffffff" class="color000000 svgShape" ></path>
    </svg>`;
      sendElement.innerHTML = sendSVG;
    }

    const nameElement = document.getElementById('name');
    if (nameElement) {
      nameElement.innerHTML = "s-adl-frontend";
    }
  }

}
