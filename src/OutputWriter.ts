import { RobotState } from "./types";

export class OutputWriter {
    private getLine(robotState: RobotState) {
        let value = `(${robotState.lastX}, ${robotState.lastY}, ${robotState.lastOrientation})`;
        if (robotState.isLost) {
            value += ' LOST';
        }
        return value;
    }
    
    public write(robotStates: RobotState[]) {
        for (const robotState of robotStates) {
            console.log(this.getLine(robotState));
        }
    }
}
