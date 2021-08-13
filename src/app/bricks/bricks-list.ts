type brick = {
    name: string;
    componentName: string;
	description?: string;
    component: () => Promise<any>;
}

export const emotionalList: brick[] = [
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

export const logicalList: brick[] = [
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
	}
];