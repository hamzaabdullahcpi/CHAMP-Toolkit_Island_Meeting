import { actionsData } from './src/data/content.ts';

const action6 = actionsData.find(a => a.id === 6);
const lastPathway = action6.pathways[action6.pathways.length - 1];
console.log('Action 6 last pathway name:', lastPathway.title);
console.log('Number of illustrative examples:', lastPathway.illustrativeExamples ? lastPathway.illustrativeExamples.length : 0);
