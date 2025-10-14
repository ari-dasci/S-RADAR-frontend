import { Injectable } from '@angular/core';
import { ItemInterface } from '../models/components/item-interface';
import { TypeComponent } from '../models/components/type-component.enum';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor() { }

  async startFromNode(jsonData: string) {
    
    const data = JSON.parse(jsonData);
    const moduleName = Object.keys(data.drawflow)[0];
    const nodes: { [key: string]: ItemInterface } = data.drawflow.Home.data;
    let currentNode: ItemInterface | undefined = Object.values(nodes).find((node: ItemInterface) => node.class === TypeComponent.StartFlow);
    const results: { [key: string]: { moduleName: string, activeName: string, result: any } } = {}; // Declara a variável results dentro da função

    while (currentNode && currentNode.outputs && Object.keys(currentNode.outputs).length > 0) {
      const outputKeys = Object.keys(currentNode.outputs);

      // You can implement your logic here to decide which output to follow
      // For simplicity, let's follow the first output
      if (currentNode.class === TypeComponent.CallApi) {
        // // Se o nó for uma chamada de API, chame o método callApi do serviço ApiService
        // this.apiService.callApi()
        //   .then((result) => {
        //     console.log("API call succeeded with result:", result);
        //     // Lógica de tratamento para sucesso
        //   })
        //   .catch((error) => {
        //     console.error("API call failed with error:", error);
        //     // Lógica de tratamento para falha
        //   });
      } else if (currentNode.class === "Response") {
        // Lógica relacionada ao nó "Response"
      } else if (currentNode.class === TypeComponent.SendMessage) {
        // Lógica relacionada ao nó "Response"
        results[currentNode.id] = { moduleName: moduleName, activeName: currentNode.name, result: currentNode.data.html }; // Salva o nome do nó e o resultado
      }

      const outputKey = outputKeys[0];

      // Verificar se currentNode.id já foi adicionado em results
      if (!(currentNode.id in results)) {
        results[currentNode.id] = { moduleName: moduleName, activeName: currentNode.name, result: currentNode.data }; // Adiciona apenas se não existir
      }

      const connection = currentNode.outputs[outputKey].connections[0];
      const nextNodeId = connection.node;

      console.log(`Node: ${currentNode.name}, Next Node: ${nextNodeId}`);


      currentNode = nodes[nextNodeId];
    }
  }

}
