import { Cmd } from "./command.model"
import { GenericCollection, GenericItem } from "../GenericCollection.model";
import { TextPage } from "../page.model";

export class Switch implements Cmd {
    param: GenericItem[];    
    extraParam: any;
    inputItems: GenericCollection[];

    constructor(inputItems: GenericCollection[], extraParam: any){
        this.inputItems = inputItems;
        this.param = null;
        this.extraParam = extraParam;
    }

    execute(): boolean {
        this.inputItems[0].changeItemPos(this.extraParam.startPos, this.extraParam.direction);
        return true;
    }
    
    undo() {
        this.inputItems[0].changeItemPos(this.extraParam.startPos, this.extraParam.direction);
    }  

    toString():String{
        return "SWITCH";
    }
}