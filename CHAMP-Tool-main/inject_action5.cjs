const fs = require('fs');

const action5Data = JSON.parse(fs.readFileSync('action5_formatted_all.json', 'utf8'));

// clean up any weird titles and keyActors from formatting
action5Data.pathways = action5Data.pathways.map(p => {
    // Strip trailing colons from titles
    p.title = p.title.replace(/:\s*$/, '');
    
    // Also remove "Overview:" or "Overview" from overview if needed (it seems empty mostly, so ok)
    
    // Key actors
    if (Array.isArray(p.keyActors)) {
        p.keyActors = p.keyActors.filter(a => a.length > 0 && a.toLowerCase() !== 'key actors');
    }

    // Filter out "considerations" from transferability
    if (Array.isArray(p.transferability)) {
        p.transferability = p.transferability.filter(t => t.toLowerCase() !== 'considerations');
    }
    
    // Implementation guidance - check if any elements contain a long string separated by •
    if (Array.isArray(p.implementationGuidance)) {
        let newGuidance = [];
        p.implementationGuidance.forEach(g => {
            if (g.includes("•")) {
                newGuidance.push(...g.split("•").map(i => i.trim()).filter(i => i));
            } else {
                newGuidance.push(g);
            }
        });
        p.implementationGuidance = newGuidance.filter(g => g.toLowerCase() !== 'implementation guidance' && !g.startsWith('Developing local transition') && !g.startsWith('Working with de-risking') && !g.startsWith('The below actions could help create') && !g.startsWith('Using procurement as a market-shaping'));
    }
    return p;
});

// Since the existing structure in content.ts is a TS string, we should replace it programmatically.
let content = fs.readFileSync('src/data/content.ts', 'utf8');

// The best way is to extract the actionsData array, replace item 5, and put it back.
// Since actionsData might be complicated, let's use a simpler approach.
// I'll extract it using regex, parse it, replace item 5, then stringify back.

const match = content.match(/export const actionsData = (\[[\s\S]*?\]);\s*export/);
if (match) {
    let actionsArray;
    try {
        // Evaluate it as js
        actionsArray = eval(match[1]);
    } catch(e) {
        console.error("Eval failed:", e);
    }
    
    if (actionsArray) {
        const idx = actionsArray.findIndex(a => a.id === 5);
        if (idx !== -1) {
            actionsArray[idx] = action5Data;
        } else {
            actionsArray.push(action5Data);
        }
        
        const newActionsStr = JSON.stringify(actionsArray, null, 2);
        content = content.replace(/export const actionsData = \[[\s\S]*?\];\s*(?=export)/, `export const actionsData = ${newActionsStr};\n\n`);
        fs.writeFileSync('src/data/content.ts', content);
        console.log("Success");
    }
} else {
    console.log("Regex match failed");
}
