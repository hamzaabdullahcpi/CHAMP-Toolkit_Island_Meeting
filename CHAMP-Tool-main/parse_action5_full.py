import json
import re

with open("new_actions.json", "r") as f:
    actions = json.load(f)

action5 = next(a for a in actions if a["id"] == 5)

# I will just write a python script that cleans up the text blocks for the pathways 5.2, 5.3, 5.4.
# I will use the same clean structure logic.
# Key Actors -> Array
# Implementation Guidance -> Array
# Illustrative Examples -> Array of Objects
# Transferability -> Array
# Enabling Conditions -> Array

def parse_list(text, keyword):
    if not text: return []
    text = re.sub(f"^{keyword}:?\\s*", "", text, flags=re.IGNORECASE).strip()
    return [t.strip() for t in text.split("•") if t.strip()]

for p in action5["pathways"]:
    # Formatting Key Actors
    if isinstance(p.get("keyActors"), str):
        actors = re.sub(r"^Key actors:?\s*", "", p["keyActors"], flags=re.IGNORECASE)
        p["keyActors"] = [a.strip() for a in actors.split(",") if a.strip()]

    # Implementation guidance is already an array of strings in new_actions.json
    
    # Illustrative Examples
    formatted_examples = []
    for ex in p.get("illustrativeExamples", []):
        if isinstance(ex, str):
            if ex.startswith("Click here to know more"): continue
            
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
    p["illustrativeExamples"] = formatted_examples

with open("action5_formatted_all.json", "w") as f:
    json.dump(action5, f, indent=2)

