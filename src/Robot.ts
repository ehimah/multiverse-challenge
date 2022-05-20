
export class Robot {
    private x: number;
    private y: number;
    private orientation: string;


    private directionMap: Map<string, [string, string]>;
    constructor(x: number, y: number, orientation: string) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;

        this.directionMap = new Map<string, [string, string]>([
            ['N', ['W', 'E']],
            ['E', ['N', 'S']],
            ['W', ['S', 'R']],
            ['S', ['E', 'W']],
        ]);
    }

    public move(direction: string) {
        switch (direction) {
            case 'R':
            case 'L':
                this.turn(direction);
                break;
            case 'F':
                switch (this.orientation) {
                    case 'N':
                        this.y++;
                        break;
                    case 'S':
                        this.y--;
                        break;
                    case 'E':
                        this.x++;
                        break;
                    case 'W':
                        this.x--;
                        break;
                }
        }
    }

    private turn(direction: string) {
        var [left, right] = this.directionMap.get(this.orientation) as [string, string];
        switch (direction) {
            case 'R':
                this.orientation = right;
                break;
            case 'L':
                this.orientation = left;
                break;
        }
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }

    public getOrientation() {
        return this.orientation;
    }

    public toString() {
        var value = `(${this.x},${this.y},${this.orientation})`;
        return value;
    }
}
