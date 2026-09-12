import json
import re

with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)

for action in actions:
    for pathway in action.get("pathways", []):
        # Format implementationGuidance
        ig_list = pathway.get("implementationGuidance", [])
        new_ig = []
        for ig in ig_list:
            if isinstance(ig, str):
                # Split by first period to create a title, but ensure we don't break abbreviations
                parts = ig.split('. ', 1)
                if len(parts) > 1:
                    title = parts[0]
                    content = parts[1]
                    # if title is too long, just use a snippet
                    if len(title.split()) > 15:
                        title = ' '.join(title.split()[:10]) + '...'
                        content = ig
                else:
                    title = ig
                    content = ig
                new_ig.append({"title": title, "content": content})
            else:
                new_ig.append(ig) # already an object?
        
        pathway["implementationGuidance"] = new_ig

        # Distribute highlightBoxes
        if "highlightBoxes" in pathway:
            for box in pathway["highlightBoxes"]:
                b_title = box.get("title", "")
                
                if "Blended Finance" in b_title:
                    # attach to IG
                    for ig in pathway["implementationGuidance"]:
                        if "Blend public finance" in ig["title"] or "Blend public finance" in ig["content"]:
                            ig["callout"] = box
                            break
                            
                elif "Viability Fund" in b_title:
                    # attach to Example
                    for ex in pathway.get("illustrativeExamples", []):
                        if "Viability Fund" in ex.get("title", ""):
                            if "subExamples" not in ex:
                                ex["subExamples"] = []
                            # check if not already there
                            if not any(se.get("title") == b_title for se in ex["subExamples"]):
                                ex["subExamples"].append({
                                    "title": b_title,
                                    "excerpt": box.get("content", "")[:100] + "...",
                                    "fullText": box.get("content", "")
                                })
                            break
            del pathway["highlightBoxes"]

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)

