import { Robot } from "./Robot";
import { RobotState } from "./types";

export class World {
    private width: number;
    private height: number;
    private robots: Robot[];
    private robotStates: RobotState[];

    constructor(width: number, height: number) {
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
    public addRobot(robot: Robot) {
        this.robots.push(robot);
        this.robotStates.push({
            lastX: robot.getX(),
            lastY: robot.getY(),
            lastOrientation: robot.getOrientation(),
            isLost: false
        });
        return this.robots.length - 1;
    }

    /**
     * Checks if the robot is within the bounds of the world
     * @param index the index of the robot
     * @returns true if the robot is lost, false otherwise
     */
    hasRobotIWithinBounds(index: number) {
        const robot = this.robots[index];
        if (robot.getX() < 0 || robot.getX() > this.width) {
            return true;
        }
        if (robot.getY() < 0 || robot.getY() > this.height) {
            return true;
        }
        return false;
    }

    /**
     * Moves the specified robot in the specified direction
     * @param index the index of the robot
     * @param direction the direction to move
     */
    public moveRobot(index: number, direction: string) {
        const robot = this.robots[index];
        let [lastX, lastY, lastOrientation] = [robot.getX(), robot.getY(), robot.getOrientation()];

        robot.move(direction);

        const isLost = this.hasRobotIWithinBounds(index);

        this.robotStates[index] = {
            lastX: isLost ? lastX : robot.getX(),
            lastY: isLost ? lastY : robot.getY(),
            lastOrientation: isLost ? lastOrientation : robot.getOrientation(),
            isLost: isLost
        };
    }

    /**
     * The world as a string
     * @returns the string representation of the world
     */
    public toString() {
        var value = '';
        for (const robotState of this.robotStates) {
            value += `(${robotState.lastX},${robotState.lastY},${robotState.lastOrientation})`;
            if (robotState.isLost) {
                value += ' LOST';
            }
            value += '\n';
        }
        return value;
    }
}
