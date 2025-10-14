export class ComponentItem {
    [key: string]: any;
    id: string;
    name: string;
    class: string;
    data: any;
    html: string;
    inputs: any[];
    outputs: any[];

    constructor(obj?: {
        name?: string,
        class?: string,
        data?: any,
        html?: string,
        id?: string,
        inputs?: any[],
        outputs?: any[]
    }) {

        const {
            name,
            class: objClass,
            data,
            html,
            id,
            inputs,
            outputs
        } = obj || {};

        this.class = objClass || '';
        this.data = data;
        this.html = html || '';
        this.id = id || '';
        this.inputs = inputs || [];
        this.outputs = outputs || [];
        this.name = name || '';
    }
}
