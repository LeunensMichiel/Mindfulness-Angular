import { Page, TextPage } from "./page.model";
import { GenericCollection } from "./GenericCollection.model";

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

    public addPage(page: Page){
        page.position = this.pages.length;
        this.pages.push(page);
    }

    public deletePage(position: number){
        this.pages.splice(position , 1);
        this.pages
            .filter( page => page.position >= position )
            .forEach( p => p.position -= 1);
    }

    public changePagePosition(startPos: number, direction: number){
        var endPos = (startPos + direction);
        if(startPos != endPos && endPos >= 0 && endPos < this.pages.length){
            this.pages[startPos].position = endPos;
            this.pages[endPos].position = startPos;
            this.pages.sort((a, b) => a.position - b.position);
            return true;
        }
        return false;
    }
}
