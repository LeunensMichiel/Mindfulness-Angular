import { Cmd } from "./command.model"
import { GenericCollection, GenericItem } from "../GenericCollection.model";
import { TextPage } from "../page.model";

export class Update implements Cmd {
    param: GenericItem[];    
    extraParam: any;
    inputItems: GenericCollection[];

    constructor(inputItems: GenericCollection[], param:any[]){
        this.inputItems = inputItems;
        this.param = param;
        this.extraParam = null
        console.log(param);
    }

    execute(): boolean {
        this.inputItems[0].changeItem(this.param[0]);
        return true;
    }
    
    undo() {
        this.inputItems[0].changeItem(this.param[1]);
    }  

    toString():String {
        return "UPDATE";
    }
}