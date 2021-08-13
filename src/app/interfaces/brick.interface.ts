import { brickProps, emotionalBrickInitializationData } from "../types/brick.type";


export declare interface LogicalBrick {
    emotionalComponent: EmotionalBrick;

    /**
     * Method that initialize Logical Brick component
     */
    initialize: (emotionalComponent: EmotionalBrick) => void;
}

export declare interface EmotionalBrick {
    /**
     * A callback method that initialize Emotional Component
     * with passed parameters
     */
    initializeBrick: (initData: emotionalBrickInitializationData) => void;

    /**
     * A getter that returns Emotional Brick properties
     */
    get brickProps(): brickProps;

    /**
     * Sets user's result data to update Emotional Component
     */
    set brickState(value: number);
}
