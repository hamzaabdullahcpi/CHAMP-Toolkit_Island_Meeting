const fs = require('fs');
const tempMod = require('./temp_content.cjs');
const currentMod = require('./current_content.cjs');

const output = `
export const landingPageData = ${JSON.stringify(tempMod.landingPageData, null, 2)};

export const deepDiveData = ${JSON.stringify(tempMod.deepDiveData, null, 2)};

export const actionsData = ${JSON.stringify(currentMod.actionsData, null, 2)};
`;

fs.writeFileSync('src/data/content.ts', output);
console.log("Restored content.ts!");
