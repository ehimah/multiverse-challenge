import { InputReader } from './InputReader';
import { OutputWriter } from './OutputWriter';
import { Robot } from './Robot';
import { Input } from './types';
import { World } from './World';

export class Runner {
    private inputReader: InputReader;
    private outputWriter: OutputWriter;

    constructor(inputReader: InputReader, outputWriter: OutputWriter) {
        this.inputReader = inputReader;
        this.outputWriter = outputWriter;
    }

    private run(input: Input) {
        const { width, height, robotCommands } = input;
        const world = new World(width, height);

        for (const command of robotCommands) {
            var robot = new Robot(command.startX, command.startY, command.startOrientation);
            const robotIndex = world.addRobot(robot);

            for (const move of command.moves) {
                // console.log(robot.toString(), move);
                world.moveRobot(robotIndex, move);

                if (world.hasRobotIWithinBounds(robotIndex)) {
                    break;
                }
            }
            // console.log('----- end of robot -----');
        }
        this.outputWriter.write(world.getRobotStates());
    }

    public start() {
        const input = this.inputReader.readInput();
        this.run(input);
    }
}
