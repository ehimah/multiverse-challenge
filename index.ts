import * as fs from 'fs';
import { InputReader } from './InputReader';
import { Robot } from './Robot';
import { Input } from './types';
import { World } from './World';

class OutputWriter {
    public write(world: World){
        console.log(world.toString());
    }
}

class Runner {
    private inputReader: InputReader;
    private outputWriter: OutputWriter;

    constructor(fileName: string) {
        this.inputReader = new InputReader(fileName);
        this.outputWriter = new OutputWriter();
    }

    private run(input: Input) {
        const { width, height, robotCommands } = input;
        const world = new World(width, height);

        for(const command of robotCommands){
            var robot = new Robot(command.startX, command.startY, command.startOrientation);
            const robotIndex = world.addRobot(robot);
    
            for(const move of command.moves){
                // console.log(robot.toString(), move);
                world.moveRobot(robotIndex, move);
                
                if(world.hasRobotIWithinBounds(robotIndex)){
                    break;
                }
            }
            // console.log('----- end of robot -----');
        }
        this.outputWriter.write(world);
    }

    public start() {
        const input = this.inputReader.readInput();
        this.run(input);
    }
}

const runner = new Runner('input.txt');
runner.start();

