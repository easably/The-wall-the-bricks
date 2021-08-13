export type brickProps = {
    name: string;
    timeGame: boolean;
    viewPosition: 'top' | 'botton' | 'full';
}

export type emotionalBrickInitializationData = {
    gameTimer?: number | null;
}