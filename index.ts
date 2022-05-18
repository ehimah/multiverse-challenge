import * as fs from 'fs';

interface RobotCommands {
    startX: number;
    startY: number;
    startOrientation: string;
    moves: string[];
}

class Robot{
    private x:number;
    private y:number;
    private orientation:string;
    

    private directionMap : Map<string, [string, string]>;
    constructor(x:number, y:number, orientation:string){
        this.x = x;
        this.y = y;
        this.orientation = orientation;

        this.directionMap = new Map<string, [string, string]>([
            ['N', ['W', 'E']],
            ['E', ['N', 'S']],
            ['W', ['N', 'S']],
            ['S', ['W', 'E']],
        ]);
    }

    public move(direction:string){
        switch(direction){
            case 'R':
            case 'L':
                this.turn(direction);
                break;
            case 'F':
                switch(this.orientation){
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

    private turn(direction:string){
        var [left, right] = this.directionMap.get(this.orientation);
        switch(direction){
            case 'R':
                this.orientation = right;
                break;
            case 'L':
                this.orientation = left;
                break;
        }
    }

    public toString(){
        var value = `(${this.x},${this.y},${this.orientation})`;
        return value;
    }

    public getX(){
        return this.x;
    }

    public getY(){
        return this.y;
    }

    public getOrientation(){
        return this.orientation;
    }

    public calculateNextPosition(orientation:string, x: number, y: number): [number, number]{
        switch(orientation){
            case 'N':
                return [x, y + 1];
            case 'S':
                return [x, y - 1];
            case 'E':
                return [x + 1, y];
            case 'W':
                return [x - 1, y];
        }
    }
}

interface RobotState{
    lastX: number;
    lastY: number;
    lastOrientation: string;
    isLost: boolean;
}

class World {
    private width:number;
    private height:number;
    private robots: Robot[];
    private robotStates: RobotState[];

    constructor(width:number, height:number){
        this.width = width;
        this.height = height;

        this.robots = [];
        this.robotStates = [];
    }

    /**
     * Adds a robot to the world and returns the index of the robot
     * @param robot 
     * @returns 
     */
    public addRobot(robot: Robot){
        this.robots.push(robot);
        this.robotStates.push({
            lastX: robot.getX(),
            lastY: robot.getY(),
            lastOrientation: robot.getOrientation(),
            isLost: false
        });
        return this.robots.length - 1;
    }
    
    isLost(index: number) {
        const robot = this.robots[index];
        if(robot.getX() < 0 || robot.getX() >= this.width){
            return true;
        }
        if(robot.getY() < 0 || robot.getY() >= this.height){
            return true;
        }
        return false;
    }

    public move(index: number, direction:string){
        const robot = this.robots[index];
        [this.robotStates[index].lastX, this.robotStates[index].lastX] = [robot.getX(), robot.getY()];
        this.robotStates[index].lastOrientation = robot.getOrientation();

        robot.move(direction);

        if(this.isLost(index)){
            this.robotStates[index].isLost = true;
        }
    }

    public toString(){
        var value = '';
        for(const robotState of this.robotStates){
            value += `(${robotState.lastX},${robotState.lastY},${robotState.lastOrientation})`;
            if(robotState.isLost){
                value += ' LOST';
            }
            value += '\n';
        }
        return value;
    }
}


function run(
    width: number,
    height: number,
    commands: RobotCommands[]
){
    var world = new World(width, height);

    for(const command of commands){
        var robot = new Robot(command.startX, command.startY, command.startOrientation);
        const robotIndex = world.addRobot(robot);

        for(const move of command.moves){
            console.log(robot.toString(), move);
            world.move(robotIndex, move);
            
            if(world.isLost(robotIndex)){
                console.log(robot.toString(), 'LOST');
                break;
            }
        }
        console.log('----- end of robot -----');
    }
    console.log(world.toString());
}

(function start(){
    var input = fs.readFileSync('input.txt', 'utf8');
    var lines = input.split('\n');
    var [width, height] = lines[0].split(' ').map(x => parseInt(x));

    const commands: RobotCommands[] = [];

    for(var i = 1; i < lines.length; i++){
        const regex = /\((?<startX>\d), (?<startY>\d), (?<startOrientation>[A-Z])\) (?<directions>[L,F,R]+)/;

        var match = regex.exec(lines[i]);

        if(!match){
            console.log('Invalid input');
            return;
        }

        var {startX, startY, startOrientation, directions} = match.groups as any;
        var moves = directions.split('');

        const command: RobotCommands = {
            startX: parseInt(startX),
            startY: parseInt(startY),
            startOrientation,
            moves
        };
        commands.push(command);
    }

    run(width, height, commands);
})();

