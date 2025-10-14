import { Injectable } from '@angular/core';
// import axios from 'axios-observable';
import axios from 'axios';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string = environment.apiUrl;

  constructor() { }

  public async getData(url: string, method: string, headers?: any, params?: any) {

    debugger
    const startTime = new Date().getTime(); // Captura o tempo antes da requisição
    let timeTaken: any = null;

    // const headersObject = {}
    // if (Object.keys(headers).length > 0) {
    //   Object.assign(headersObject, ...headers);
    // }

    // Configuração da solicitação
    const requestOptions: any = {
      method: method, // Método da solicitação (GET neste caso)
      params: {
        // key: 'value',
        destinationParams: params,
        destinationUrl: url, // Passa a URL de destino para o servidor
        destinationHeaders : headers
      }
    };

    // if (Object.keys(headers).length > 0) {
    //   requestOptions.destinationHeaders = headers;
    // }

    try {
      // Faz a solicitação para o seu servidor
      const responseData = await axios.get(this.API_URL, requestOptions)
        .then(response => {
          console.log(JSON.stringify(response.data)); // Dados da resposta recebida do servidor
          const endTime = new Date().getTime(); // Captura o tempo após a requisição
          timeTaken = endTime - startTime; // Calcula a diferença de tempo

          return {
            data: response.data,
            headers: response.headers,
            status: response.status,
            customData: { time: timeTaken }
          }
        })
        .catch(error => {
          console.error('Erro:', error); // Exibe o erro no console
        });

      return responseData; // Retorna os dados da resposta

    } catch (error: any) {
      let errorMessage = 'Erro ao fazer a solicitação';
      if (error.response && error.response.status) {
        errorMessage += `, status ${error.response.status}`;
      } else if (error.status) {
        errorMessage += `, status ${error.status}`;
      }
      debugger
      throw new Error(errorMessage);
      // throw new Error(`Erro ao fazer a solicitação: ${error}`);
    }

  }

}
