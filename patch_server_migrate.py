import re

with open('server.ts', 'r') as f:
    content = f.read()

migration_code = """
  // Migration Route
  app.post("/api/migrate", async (req, res) => {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const pat = process.env.AIRTABLE_PAT;
    
    if (!baseId || !pat) {
      return res.status(400).json({ error: "Missing AIRTABLE_BASE_ID or AIRTABLE_PAT in environment variables." });
    }

    try {
      // Dynamic import to avoid circular issues and keep it fresh
      const { actionsData } = await import("./src/data/content.ts");
      const API_URL = `https://api.airtable.com/v0/${baseId}`;
      const headers = {
        'Authorization': `Bearer ${pat}`,
        'Content-Type': 'application/json'
      };

      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      const createRecord = async (tableName: string, fields: any) => {
        const response = await fetch(`${API_URL}/${encodeURIComponent(tableName)}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                records: [{ fields }],
                typecast: true
            })
        });
        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Failed to create record in ${tableName}: ${err}`);
        }
        const data = await response.json();
        return (data as any).records[0].id;
      };

      // Background migration to avoid timeout
      res.json({ success: true, message: "Migration started in the background. Please check terminal logs." });

      (async () => {
        console.log("🚀 Starting Airtable migration...");
        for (const action of actionsData) {
            console.log(`▶ Creating Action ${action.id}...`);
            const actionFields = {
                "Action Number": action.id,
                "Title": action.title || "",
                "Description": action.description || "",
                "Systems Logic": action.systemsLogic || "",
            };
            const actionRecordId = await createRecord("Actions", actionFields);
            await delay(300);

            if (action.pathways) {
                for (const pathway of action.pathways) {
                    console.log(`  ↳ Pathway: ${pathway.title}...`);
                    const pathwayFields = {
                        "Pathway Title": pathway.title || "",
                        "Belongs to Action": [actionRecordId],
                        "Overview": pathway.overview || "",
                        "What it is": pathway.whatItIs || "",
                        "Why it is needed": pathway.whyItIsNeeded || "",
                        "Key Actors": pathway.keyActors || [],
                        "Transferability Considerations": (pathway.transferability || []).map((t: any) => `• ${t}`).join('\\n\\n'),
                        "Enabling Conditions": (pathway.enablingConditions || []).map((e: any) => `• ${e}`).join('\\n\\n')
                    };
                    const pathwayRecordId = await createRecord("Pathways", pathwayFields);
                    await delay(300);

                    if (pathway.implementationGuidance) {
                        let stepOrder = 1;
                        for (const step of pathway.implementationGuidance) {
                            const stepFields = {
                                "Step Title": step.title || "",
                                "Belongs to Pathway": [pathwayRecordId],
                                "Detailed Content": step.content || "",
                                "Step Order": stepOrder++
                            };
                            await createRecord("Implementation Guidance", stepFields);
                            await delay(300);
                        }
                    }

                    if (pathway.illustrativeExamples) {
                        for (const ex of pathway.illustrativeExamples) {
                            const exFields = {
                                "Example Title": ex.title || "",
                                "Belongs to Pathway": [pathwayRecordId],
                                "Excerpt": ex.excerpt || "",
                                "Full Text / Concept Explanation": ex.fullText || "",
                                "Learn More URL": ex.link || ""
                            };
                            const exRecordId = await createRecord("Illustrative Examples", exFields);
                            await delay(300);

                            if (ex.subExamples) {
                                for (const sub of ex.subExamples) {
                                    const subFields = {
                                        "Sub-Example Title": sub.title || "",
                                        "Belongs to Parent Example": [exRecordId],
                                        "Excerpt": sub.excerpt || "",
                                        "Full Text": sub.fullText || "",
                                        "Learn More URL": sub.link || ""
                                    };
                                    await createRecord("Sub-Examples", subFields);
                                    await delay(300);
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log("✅ Migration complete!");
      })().catch(console.error);

    } catch (error: any) {
      console.error("Migration setup error:", error);
    }
  });
"""

# Insert right before the Vite middleware setup
content = content.replace("  // Vite middleware for development", migration_code + "\n  // Vite middleware for development")

with open('server.ts', 'w') as f:
    f.write(content)
