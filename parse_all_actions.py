import json
import re

with open("new_actions.json", "r") as f:
    actions = json.load(f)

def clean_pathways(pathways):
    for p in pathways:
        # Title clean
        if p.get("title"):
            p["title"] = p["title"].replace(r":\s*$", "").strip()
        
        # Key actors
        if isinstance(p.get("keyActors"), str):
            actors = re.sub(r"^Key actors:?\s*", "", p["keyActors"], flags=re.IGNORECASE)
            # Split by comma or bullet
            if "•" in actors:
                p["keyActors"] = [a.strip() for a in actors.split("•") if a.strip()]
            else:
                p["keyActors"] = [a.strip() for a in actors.split(",") if a.strip()]
        
        # Illustrative Examples
        formatted_examples = []
        for ex in p.get("illustrativeExamples", []):
            if isinstance(ex, str):
                if ex.lower().startswith("click here to know more"): continue
                
                title_match = re.split(r'(?:\s+is\s+|\s+demonstrates\s+|\s+shows\s+|\s+illustrates\s+|-)', ex, 1)
                title = title_match[0].strip()
                if len(title.split()) > 10:
                    title = " ".join(title.split()[:5]) + "..."
                
                excerpt = ex[:120] + "..." if len(ex) > 120 else ex
                formatted_examples.append({
                    "title": title,
                    "excerpt": excerpt,
                    "fullText": ex
                })
        
        # We also need to find standalone "click here" and append them to previous examples
        # but let's just let fix_examples.cjs handle it later or handle it here.
        # This script won't execute anyway unless I want it to. I am just putting this here in case user says yes to the previous message.
        p["illustrativeExamples"] = formatted_examples
        
    return pathways

for action in actions:
    if action["id"] == 5:
        # action 5 is already processed and looks better in content.ts. We'll skip or just re-process.
        continue
    
    # We can process others
    action["pathways"] = clean_pathways(action["pathways"])

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)
