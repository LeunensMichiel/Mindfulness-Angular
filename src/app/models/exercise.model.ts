import { Page, TextPage, AudioPage, InputPage } from "./page.model";
import { GenericCollection, GenericItem } from "./GenericCollection.model";

export class Exercise extends GenericCollection implements GenericItem {
    private _id: string;
    private _title: string;
    position: number;

    constructor(title?: string, pages?: Page) {
        super();
        this._title = title || "";
        this.items = [new TextPage()];
        this.items[0].position = 0;
    }

    /**
   * Getter id
   * @return {string}
   */
    public get id(): string {
        return this._id;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(_id: string) {
        this._id = _id;
    }

    /**
       * Getter title
       * @return {string}
       */
    public get title(): string {
        return this._title;
    }

    /**
     * Setter title
     * @param {string} value
     */
    public set title(_title: string) {
        this._title = _title;
    }

    /**
     * Getter pages
     * @return {GenericItem[]}
     */
    public get pages(): GenericItem[] {
        return this.items;
    }

    /**
     * Setter pages
     * @param {GenericItem[]} value
     */
    public set pages(pages: GenericItem[]) {
        this.items = pages;
    }

    public addPage(page: Page) {
        page.position = this.items.length;
        this.items.push(page);
    }

    public deletePage(position: number) {
        this.items.splice(position, 1);
        this.items
            .filter(page => page.position >= position)
            .forEach(p => p.position -= 1);
    }

    public changePagePosition(startPos: number, direction: number) {
        var endPos = (startPos + direction);
        if (startPos != endPos && endPos >= 0 && endPos < this.items.length) {
            this.items[startPos].position = endPos;
            this.items[endPos].position = startPos;
            this.items.sort((a, b) => a.position - b.position);
            return true;
        }
        return false;
    }

    fromJson(json: any): Exercise {
        const ex = new Exercise();
        ex.title = json.title;
        ex.position = json.position;

        if (json.hasOwnProperty("pages")) {
            ex.items = json.items.map(it => {
                if ("items" in it) {
                    return new TextPage().fromJson(it);
                } else if ("fileUrl" in it) {
                    return new AudioPage().fromJson(it);
                } else {
                    return new InputPage().fromJson(it);
                }
            });
        }
        ex._id = json._id;
        return ex
    }

    toJSON() {
        return {
            _id: this._id,
            title: this._title,
            pages: this.items.map(page => page.toJSON())
        };
    }
}
