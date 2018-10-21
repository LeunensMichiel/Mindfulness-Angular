import { Page, TextPage } from "./page.model";

export class Excercise {
    title:string;
    pages:Page[];

    constructor(
    ){
        this.title = "";
        this.pages = [new TextPage()];
        this.pages[0].position = 0;
    }

    public addPage(position: number, page: Page){
        this.pages
            .filter( page => page.position >= position )
            .forEach( p => p.position += 1);
        page.position = position;
        this.pages.splice(position += 1, 0, page);
        this.pages.sort((a, b) => a.position - b.position);
    }

    public deletePage(position: number){
        this.pages.splice(position += 1, 1);
        this.pages
            .filter( page => page.position >= position )
            .forEach( p => p.position -= 1);
    }

    public changePagePosition(startPosition: number, endPosition: number){
        if (startPosition != endPosition){
            if (startPosition < endPosition){
                this.pages
                    .filter( page => page.position > startPosition && page.position <= endPosition)
                    .forEach( p => p.position--);
            } 
            if (startPosition > endPosition){
                this.pages
                    .filter( page => page.position >= endPosition && page.position < startPosition)
                    .forEach( p => p.position++);
            }    
            this.pages[startPosition].position = endPosition;
            this.pages.sort((a, b) => a.position - b.position);
        }
    }
}