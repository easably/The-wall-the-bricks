interface Brick {
    name: string;
    componentName: string;
	description?: string;
    component: () => Promise<any>;
  }

export const emotionalList: Brick[] = [
	{
		name: 'Balloon',
		componentName: 'BalloonComponent',
		component: () => import('src/app/bricks/emotional/balloon/balloon.component')
	},
	{
		name: 'Scale',
		componentName: 'ScaleComponent',
		component: () => import('src/app/bricks/emotional/scale/scale.component')
	},
	{
		name: 'Water',
		componentName: 'WaterComponent',
		component: () => import('src/app/bricks/emotional/water/water.component')
	}
];

export const logicalList: Brick[] = [
	{
		name: 'Synonyms',
		componentName: 'SynonymsComponent',
		description: 'Find the synonym for the word',
		component: () => import('src/app/bricks/logical/synonyms/synonyms.component')
	},
	{
		name: 'Similar Words',
		componentName: 'SimilarWordsComponent',
		description: 'Which one do you hear?',
		component: () => import('src/app/bricks/logical/similar-words/similar-words.component')
	},
];