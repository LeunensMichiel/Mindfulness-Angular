import { GenericItem } from "./GenericCollection.model";

export class Paragraph implements GenericItem {
    _id:String;
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
        par._id = json._id;
        par.position = json.position;
        par.content = json.content;
        par.type = json.type;
        return par
    }

  toJSON(){
        return {
            _id: this._id,
            position: this.position,
            content: this.content,
            type: this.type
        }
    }
}
