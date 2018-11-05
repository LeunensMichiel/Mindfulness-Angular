import { Cmd } from "./command.model"
import { GenericCollection, GenericItem } from "../GenericCollection.model";

export class Insert implements Cmd {
    param: GenericItem[];    
    extraParam: any;
    inputItems: GenericCollection[];

    constructor(inputItems: GenericCollection[], param:any[]){
        this.inputItems = inputItems;
        this.param = param;
        this.extraParam = null;
    }

    execute(): boolean {
        this.inputItems[0].addItem(this.param[0].position, this.param[0]);
        return true;
    }
        
    undo() {
        this.inputItems[0].deleteItem(this.param[0].position);
    }
}