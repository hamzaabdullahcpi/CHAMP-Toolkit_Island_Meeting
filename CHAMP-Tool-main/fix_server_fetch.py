import re

with open('server.ts', 'r') as f:
    content = f.read()

old_code = """      const actionsRecords = await fetchTable('Actions');
      const pathwaysRecords = await fetchTable('Pathways');
      const examplesRecords = await fetchTable('Examples');

      // Stitch them together
      const formattedActions = actionsRecords.map((a: any) => {
        const actionId = a.fields["Action ID"] || 0;
        const actionTitle = a.fields["Title"] || "Untitled Action";
        const actionDesc = a.fields["Description"] || "";
        const systemsLogic = a.fields["Systems Logic"] || "";
        
        // Find pathways linked to this action
        const myPathways = pathwaysRecords.filter((p: any) => {
            const linkedAction = p.fields["Action Category"];
            return linkedAction && linkedAction.includes(a.id);
        }).map((p: any) => {
            const pathwayTitle = p.fields["Pathway Title"] || "Untitled Pathway";
            const pathwayDesc = p.fields["Overview"] || "";
            
            // Find examples linked to this pathway
            const myExamples = examplesRecords.filter((e: any) => {
                const linkedPathway = e.fields["Belongs to Pathway"];
                return linkedPathway && linkedPathway.includes(p.id);
            }).map((e: any) => ({
                title: e.fields["Example Title"] || "Untitled Example",
                excerpt: e.fields["Excerpt"] || "",
                fullText: e.fields["Full Text"] || ""
            }));

            return {
                title: pathwayTitle,
                overview: pathwayDesc,
                illustrativeExamples: myExamples
            };
        });"""

new_code = """      const actionsRecords = await fetchTable('Actions');
      const pathwaysRecords = await fetchTable('Pathways');
      const examplesRecords = await fetchTable('Illustrative Examples');
      const subExamplesRecords = await fetchTable('Sub-Examples');
      const guidanceRecords = await fetchTable('Implementation Guidance');

      // Stitch them together
      const formattedActions = actionsRecords.map((a: any) => {
        const actionId = a.fields["Action Number"] || 0;
        const actionTitle = a.fields["Title"] || "Untitled Action";
        const actionDesc = a.fields["Description"] || "";
        const systemsLogic = a.fields["Systems Logic"] || "";
        
        // Find pathways linked to this action
        const myPathways = pathwaysRecords.filter((p: any) => {
            const linkedAction = p.fields["Belongs to Action"];
            return linkedAction && linkedAction.includes(a.id);
        }).map((p: any) => {
            const pathwayTitle = p.fields["Pathway Title"] || "Untitled Pathway";
            const pathwayDesc = p.fields["Overview"] || "";
            const whatItIs = p.fields["What it is"] || "";
            const whyItIsNeeded = p.fields["Why it is needed"] || "";
            const keyActors = p.fields["Key Actors"] || [];
            const transferability = (p.fields["Transferability Considerations"] || "").split('\\n\\n').map((s:string) => s.replace('• ', '').trim()).filter(Boolean);
            const enablingConditions = (p.fields["Enabling Conditions"] || "").split('\\n\\n').map((s:string) => s.replace('• ', '').trim()).filter(Boolean);
            
            // Find guidance linked to this pathway
            const myGuidance = guidanceRecords.filter((g: any) => {
                const linkedPathway = g.fields["Belongs to Pathway"];
                return linkedPathway && linkedPathway.includes(p.id);
            }).sort((a:any, b:any) => (a.fields["Step Order"] || 0) - (b.fields["Step Order"] || 0))
            .map((g: any) => ({
                title: g.fields["Step Title"] || "Untitled Step",
                content: g.fields["Detailed Content"] || ""
            }));

            // Find examples linked to this pathway
            const myExamples = examplesRecords.filter((e: any) => {
                const linkedPathway = e.fields["Belongs to Pathway"];
                return linkedPathway && linkedPathway.includes(p.id);
            }).map((e: any) => {
                // Find sub-examples linked to this example
                const mySubExamples = subExamplesRecords.filter((sub: any) => {
                    const linkedExample = sub.fields["Belongs to Parent Example"];
                    return linkedExample && linkedExample.includes(e.id);
                }).map((sub: any) => ({
                    title: sub.fields["Sub-Example Title"] || "Untitled Sub-Example",
                    excerpt: sub.fields["Excerpt"] || "",
                    fullText: sub.fields["Full Text"] || "",
                    link: sub.fields["Learn More URL"] || ""
                }));

                return {
                    title: e.fields["Example Title"] || "Untitled Example",
                    excerpt: e.fields["Excerpt"] || "",
                    fullText: e.fields["Full Text / Concept Explanation"] || "",
                    link: e.fields["Learn More URL"] || "",
                    subExamples: mySubExamples.length > 0 ? mySubExamples : undefined
                };
            });

            return {
                title: pathwayTitle,
                overview: pathwayDesc,
                whatItIs,
                whyItIsNeeded,
                keyActors,
                transferability,
                enablingConditions,
                implementationGuidance: myGuidance.length > 0 ? myGuidance : undefined,
                illustrativeExamples: myExamples.length > 0 ? myExamples : undefined
            };
        });"""

content = content.replace(old_code, new_code)

with open('server.ts', 'w') as f:
    f.write(content)
