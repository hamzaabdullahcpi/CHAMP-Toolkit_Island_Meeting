const fs = require('fs');

const actionsData = JSON.parse(fs.readFileSync('all_actions_formatted.json', 'utf8'));

// clean up some weird titles
actionsData.forEach(action => {
    if (action.pathways) {
        action.pathways.forEach(p => {
            if (p.title) p.title = p.title.replace(/:\s*$/, '');
            if (p.overview && typeof p.overview === 'string') p.overview = p.overview.replace(/^Overview:?\s*/i, '');
        });
    }
});

let content = fs.readFileSync('src/data/content.ts', 'utf8');

const newActionsStr = JSON.stringify(actionsData, null, 2);
content = content.replace(/export const actionsData = (\[[\s\S]*?\]);\s*(?=export)/, `export const actionsData = ${newActionsStr};\n\n`);

fs.writeFileSync('src/data/content.ts', content);
console.log("Injected all actions");
