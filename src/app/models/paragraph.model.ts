import { GenericItem } from "./GenericCollection.model";

export class Paragraph implements GenericItem {
    public position: number;
    public content: string;
    public type:string;

    constructor(){
        this.content = "";
        this.position = 0;
        this.type = "text";
    }

    fromJson(json: any):Paragraph {
        const par = new Paragraph();
        par.position = json.position;
        par.content = json.content;
        par.type = json.type;
        return par
    }

  toJSON(){
        return {
            position: this.position,
            content: this.content,
            type: this.type
        }
    }
}
