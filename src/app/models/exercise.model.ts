import { Page, TextPage, AudioPage, InputPage } from "./page.model";
import { GenericCollection, GenericItem } from "./GenericCollection.model";
import { Paragraph } from "./paragraph.model";

export class Exercise extends GenericCollection {
    title:string;
    pages:Page[];

    constructor(
    ){
        super();
        this.title = "";
        this.items = [new TextPage()];
        this.items[0].position = 0;
    }

    toJson() {
        return {
            title: this.title,
            position: this.position,
            items: this.items.map(it => it.toJson)
        }
    }

    fromJson(json:any){
        const ex = new Exercise();
        ex.title = json.title;
        ex.position = json.position;
        ex.items = json.items.map( it => {
            if ("items" in it) {
                return new TextPage().fromJson(it);
            } else if ("fileUrl" in it){
                return new AudioPage().fromJson(it);
            }else {
                return new InputPage().fromJson(it);
            }
        });
    }
}
