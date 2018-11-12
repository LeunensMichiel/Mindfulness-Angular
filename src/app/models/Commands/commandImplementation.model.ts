import { Cmd } from "./command.model";

export abstract class CmdImplementation {
    private commandCache: Cmd[]
    private cmdValue: number;
    private timer = null;

    constructor() {
        this.commandCache = [];
        this.cmdValue = -1;
    }

    addCommand(cmd: Cmd) {
        if (this.cmdValue < this.commandCache.length - 1) {
            this.commandCache.length = this.cmdValue + 1
        }
        this.commandCache.push(cmd);
        switch (cmd.toString()) {
            case "INSERT":
                this.addItem(cmd);
                break;
            case "DELETE":
                this.removeItem(cmd);
                break;
            case "UPDATE":
                this.update(cmd);
                break;
        }
        this.executeCurrentCommand();
    }

    onKeydown(event) {
        if (event.metaKey) {
            if (event.key == 'z')
                this.undoCurrentCommand();
            if (event.key == 'Z')
                this.executeCurrentCommand();
        }
    }

    private executeCurrentCommand() {
        if (this.cmdValue < this.commandCache.length - 1) {
            this.cmdValue += 1;
            this.commandCache[this.cmdValue].execute();
            this.resetTimer();
        }
    }

    undoCurrentCommand() {
        if (this.cmdValue >= 0) {
            this.commandCache[this.cmdValue].undo();
            var cmd = this.commandCache[this.cmdValue];
            console.log(cmd.toString());
            this.cmdValue -= 1;
            this.resetTimer();
        }
    }

    private setTimer() {
        this.timer = setTimeout(() => {
            this.saveItem();
            this.timer = null;
        }, 3000);
    }

    private resetTimer() {
        if (this.timer != null)
            clearTimeout(this.timer);
        this.setTimer();
    }

    abstract saveItem();
    abstract addItem(cmd: Cmd): any;
    abstract removeItem(cmd: Cmd);
    abstract changePos(cmd: Cmd);
    abstract update(cmd: Cmd);
}