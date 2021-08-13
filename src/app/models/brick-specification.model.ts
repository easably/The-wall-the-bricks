export interface LogicalSpec {
    
}

export interface EmotionalSpec {
    name: string;
    timeGame: boolean;
    displayPosition: 'top' | 'botton' | 'full';
}

export interface EmotionalInitData {
    lives: number;
    timeGame: number;
}