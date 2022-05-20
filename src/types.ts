export interface RobotCommands {
    startX: number;
    startY: number;
    startOrientation: string;
    moves: string[];
}


export interface Input {
    width: number;
    height: number;
    robotCommands: RobotCommands[];
}

export interface RobotState {
    lastX: number;
    lastY: number;
    lastOrientation: string;
    isLost: boolean;
}