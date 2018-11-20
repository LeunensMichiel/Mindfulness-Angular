import {Cmd, TypeCmd} from './command.model';
import {GenericCollection, GenericItem, GenericItemWithList} from '../GenericCollection.model';

export class Insert extends Cmd {


    constructor(inputItem: GenericItemWithList, param:any[]){
       super(inputItem, TypeCmd.INSERT, param);
        console.log(param);
    }

    execute(): boolean {
        this.inputItem.list.addItem(this.param[0]);
        return true;
    }
        
    undo() {
        this.inputItem.list.deleteItem(this.param[0].position);
    }

}
