import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TypeComponent } from '../../../../models/components/type-component.enum';
import { MethodCallapi } from '../../../../models/method-callapi.enum';
import { ComponentItem } from '../../../../models/components/component-item';
import { ApiService } from '../../../../providers/api.service';
import prettyBytes from 'pretty-bytes';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-tab-call-api',
  templateUrl: './tab-call-api.component.html',
  styleUrls: ['./tab-call-api.component.css']
})
export class TabCallApiComponent implements OnInit {

  @Input() itemSelected: ComponentItem
  components = TypeComponent;
  methodsCallapi = MethodCallapi;

  constructor(private apiService: ApiService, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  async callapi() {
    const url = (document.querySelector("[data-url]") as HTMLInputElement).value
    const method = (document.querySelector("[data-method]") as HTMLInputElement).value
    const element = this.elementRef.nativeElement.querySelector("[data-response-section]");
    const headers = this.keyValuePairsToObjects(this.elementRef.nativeElement.querySelector("[data-request-headers]"));
    const params = this.keyValuePairsToObjects(this.elementRef.nativeElement.querySelector("[data-query-params]"));

    try {
      await this.apiService.getData(url, method, headers, params).then(
        response => {          
          if (element && response !== undefined && response !== null) {
            this.renderer.removeClass(element, 'd-none');
            this.updateResponse(response.data);
            this.updateResponseDetails(response);
            this.updateResponseHeaders(response.headers)
          }
        }
      )   

    } catch (error) {
      if (element) {
        this.renderer.removeClass(element, 'd-none');
        this.updateResponse(error);
      }
    }
  }

  private updateResponseDetails(response: any) {
    debugger
    const statusElement = this.elementRef.nativeElement.querySelector('[data-status]');
    if (statusElement) {
      this.renderer.setProperty(statusElement, 'textContent', response.status.toString());
    }

    const timeElement = this.elementRef.nativeElement.querySelector('[data-time]');
    if (timeElement) {
      this.renderer.setProperty(timeElement, 'textContent', response.customData.time.toString());
    }

    const sizeElement = this.elementRef.nativeElement.querySelector('[data-size]');
    if (sizeElement) {
      this.renderer.setProperty(sizeElement, 'textContent', prettyBytes(
        JSON.stringify(response.data).length +
        JSON.stringify(response.headers).length
      ));
    }
  }

  private updateResponse(response: any) {
    // const jsonResponseBody = document.querySelector("[data-json-response-body]")
    // if (jsonResponseBody) {
    //   jsonResponseBody.innerHTML = JSON.stringify(response);
    //   // jsonResponseBody.innerHTML = response;
    // }

    const jsonResponseBodyElement = this.elementRef.nativeElement.querySelector('[data-json-response-body]');
    if (jsonResponseBodyElement) {
      jsonResponseBodyElement.innerText = JSON.stringify(response, null, 2);
    }
  }

  private updateResponseHeaders(headers: any) {
    const responseHeadersContainer = document.querySelector(
      "[data-response-headers]"
    ) as HTMLInputElement;

    responseHeadersContainer.innerHTML = ""
    Object.entries(headers).forEach(([key, value]) => {
      const keyElement = document.createElement("div")
      keyElement.textContent = key
      responseHeadersContainer.append(keyElement)
      const valueElement = this.renderer.createElement('div');
      valueElement.textContent = value
      responseHeadersContainer.append(valueElement)
    })
  }

  addQueryParam() {
    const queryParamsContainer = this.elementRef.nativeElement.querySelector('[data-query-params]');
    if (queryParamsContainer)
      queryParamsContainer.append(this.createKeyValuePair())
  }
  addRequestHeader() {
    const requestHeadersContainer = this.elementRef.nativeElement.querySelector('[data-request-headers]');
    requestHeadersContainer.append(this.createKeyValuePair())
  }

  addJsonRequestBody() {
    const jsonRequestBodyElement = this.elementRef.nativeElement.querySelector('[data-json-request-body]');
    if (jsonRequestBodyElement && !jsonRequestBodyElement.querySelector('textarea')) {
      const textareaElement = this.renderer.createElement('textarea');
      // Configurações opcionais do textarea, como atributos e estilos
      this.renderer.setAttribute(textareaElement, 'rows', '5');
      this.renderer.setAttribute(textareaElement, 'cols', '90');
      // this.renderer.setStyle(textareaElement, 'resize', 'none');
      // Adiciona o textarea ao div
      this.renderer.appendChild(jsonRequestBodyElement, textareaElement);
    }

  }

  private createKeyValuePair() {
    const keyValueTemplate = this.elementRef.nativeElement.querySelector('[data-key-value-template]');
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector("[data-remove-btn]").addEventListener("click", (e: any) => {
      e.target.closest("[data-key-value-pair]").remove()
    })
    return element
  }

  private keyValuePairsToObjects(container: any) {
    const pairs = container.querySelectorAll("[data-key-value-pair]")
    return [...pairs].reduce((data, pair) => {
      const key = pair.querySelector("[data-key]").value
      const value = pair.querySelector("[data-value]").value
  
      if (key === "") return data
      return { ...data, [key]: value }
    }, {})
  }
}

