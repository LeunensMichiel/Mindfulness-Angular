import { GenericCollection, GenericItem } from '../GenericCollection.model'
export interface Cmd {
    param: GenericItem[];
    extraParam:any;
    inputItems: GenericCollection[];

    execute():boolean;

    undo();

    toString();
}