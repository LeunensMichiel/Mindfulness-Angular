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

    public fromJson(json: any) {
        const par = new Paragraph()
        par.position = json.position;
        par.content = json.content;
        par.type = json.type;
        return par
    }

    static copyJson(json:any){
        const par = new Paragraph()
        par.position = json.position;
        par.content = json.content;
        par.type = json.type;
        return par
    }

    public toJson():any{
        return {
            position: this.position,
            content: this.content,
            type: this.type
        }
    }
}