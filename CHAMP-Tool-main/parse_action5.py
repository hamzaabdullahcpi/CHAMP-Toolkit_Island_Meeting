import json
import re

with open("new_actions.json", "r") as f:
    actions = json.load(f)

action5 = next(a for a in actions if a["id"] == 5)

for p in action5["pathways"]:
    # Format key actors
    if isinstance(p.get("keyActors"), str):
        actors_str = p["keyActors"].strip()
        if actors_str:
            # remove "Key actors:" if present
            actors_str = re.sub(r"^Key actors:\s*", "", actors_str, flags=re.IGNORECASE)
            p["keyActors"] = [a.strip() for a in actors_str.split(",") if a.strip()]
        else:
            p["keyActors"] = []
    
    # Format illustrative examples
    formatted_examples = []
    for ex in p.get("illustrativeExamples", []):
        if isinstance(ex, str):
            # Extract a title (usually the first few words or up to a comma/dash/is/shows)
            # A simple heuristic: take the first sentence or up to a specific keyword
            title_match = re.split(r'(?:\s+is\s+|\s+demonstrates\s+|\s+shows\s+|\s+illustrates\s+|-)', ex, 1)
            title = title_match[0].strip()
            if len(title.split()) > 10:
                title = " ".join(title.split()[:5]) + "..."
            
            # Remove "Click here to know more" if it's a separate thing, but user said:
            # "click here to know more sentence will be part of the paragraph (make sure it is)"
            # So I will just keep it.
            
            excerpt = ex[:120] + "..." if len(ex) > 120 else ex
            formatted_examples.append({
                "title": title,
                "excerpt": excerpt,
                "fullText": ex
            })
    p["illustrativeExamples"] = formatted_examples

with open("action5_formatted.json", "w") as f:
    json.dump(action5, f, indent=2)

