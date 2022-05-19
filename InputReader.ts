import * as fs from 'fs';
import { Input, RobotCommands } from './types';

export class InputReader {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    private parseLine(line: string): RobotCommands {

        const regex = /\((?<startX>\d), (?<startY>\d), (?<startOrientation>[A-Z])\) (?<directions>[L,F,R]+)/;

        var match = regex.exec(line);

        if (!match) {
            console.log('Invalid input');
            throw new Error('Invalid input');
        }

        var { startX, startY, startOrientation, directions } = match.groups as any;
        var moves = directions.split('');

        const command: RobotCommands = {
            startX: parseInt(startX),
            startY: parseInt(startY),
            startOrientation,
            moves
        };
        return command;
    }

    public readInput(): Input {
        const fileContent = fs.readFileSync(this.fileName, 'utf8');
        const lines = fileContent.split('\n');

        var [width, height] = lines[0].split(' ').map(x => parseInt(x));

        const commands: RobotCommands[] = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.length > 0) {
                const command = this.parseLine(line);
                commands.push(command);
            }
        }

        return { width, height, robotCommands: commands };
    }
}
