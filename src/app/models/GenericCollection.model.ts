export abstract class GenericCollection implements GenericItem{
    position: number;
    items: GenericItem[];

    public addItem(position: number, item: GenericItem) {
        item.position = position;
        this.items
            .filter(it => it.position >= position)
            .forEach(it => it.position += 1);
        this.items.splice(position, 0, item);
    }

    public deleteItem(position: number) {
        var item = this.items[position];
        this.items.splice(position, 1);
        this.items
            .filter(it => it.position >= position)
            .forEach(it => it.position -= 1);
        return item
    }

    public changeItemPos(startPos: number, direction: number){
        var endPos = (startPos + direction);
        if(startPos != endPos && endPos >= 0 && endPos < this.items.length){
            var item = this.items[endPos];
            this.items[endPos] = this.items[startPos];
            this.items[endPos].position = endPos;
            this.items[startPos] = item;
            this.items[startPos].position = startPos;
            return true;
        }
        return false;
    }

    public changeItem(item: GenericItem){
        this.items[item.position]= item;
    }

    abstract toJson();
    abstract fromJson(json:any);
}

export abstract class GenericItem {
    position: number;

    abstract toJson():any 
    abstract fromJson(json:any)
    
}