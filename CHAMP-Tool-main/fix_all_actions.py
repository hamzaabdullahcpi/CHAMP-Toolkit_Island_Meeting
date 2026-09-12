import json
import re

with open("new_actions.json", "r") as f:
    actions = json.load(f)

def extract_title(text):
    split_pattern = r'\b(demonstrates?|shows?|illustrates?|is|provides?|brings?|has developed|works|helps|aimed|was established)\b'
    match = re.split(split_pattern, text, 1, flags=re.IGNORECASE)
    
    title = match[0].strip()
    
    if not title or len(title.split()) > 15:
        title = re.split(r'[,.;:\-]', text, 1)[0].strip()
        if len(title.split()) > 10:
            title = " ".join(title.split()[:7]) + "..."
            
    if title:
        title = title[0].upper() + title[1:]
    return title

for action in actions:
    for p in action.get("pathways", []):
        if p.get("title"):
            p["title"] = re.sub(r':\s*$', '', p["title"]).strip()
            
        if isinstance(p.get("keyActors"), str):
            actors = re.sub(r'^Key actors:?\s*', '', p["keyActors"], flags=re.IGNORECASE)
            if "•" in actors:
                p["keyActors"] = [a.strip() for a in actors.split("•") if a.strip()]
            else:
                p["keyActors"] = [a.strip() for a in actors.split(",") if a.strip()]
        
        for field in ["implementationGuidance", "transferability", "enablingConditions"]:
            if isinstance(p.get(field), list):
                new_list = []
                for item in p[field]:
                    if "•" in item:
                        new_list.extend([i.strip() for i in item.split("•") if i.strip()])
                    else:
                        new_list.append(item)
                p[field] = [i for i in new_list if i.lower() not in [field.lower(), 'considerations'] and not i.lower().startswith('recommendations for actors')]

        formatted_examples = []
        raw_examples = p.get("illustrativeExamples", [])
        
        merged_examples = []
        for ex in raw_examples:
            if isinstance(ex, dict):
                merged_examples.append(ex.get("fullText", ex.get("excerpt", "")))
            elif isinstance(ex, str):
                if ex.lower().startswith("click here") or ex.lower().startswith("to know more"):
                    if merged_examples:
                        merged_examples[-1] += "\n\n" + ex.strip()
                else:
                    merged_examples.append(ex.strip())
                    
        for ex in merged_examples:
            title = extract_title(ex)
            excerpt = ex[:120] + "..." if len(ex) > 120 else ex
            formatted_examples.append({
                "title": title,
                "excerpt": excerpt,
                "fullText": ex
            })
            
        p["illustrativeExamples"] = formatted_examples

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)

