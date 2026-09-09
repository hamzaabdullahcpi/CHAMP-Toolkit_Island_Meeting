import json

with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)

for action in actions:
    for pathway in action.get("pathways", []):
        
        # 1. Bristol Fix in Locally Anchored Multilevel Climate Finance Structures
        if pathway.get("title") == "Locally Anchored Multilevel Climate Finance Structures":
            examples = pathway.get("illustrativeExamples", [])
            new_examples = []
            bristol_ex = None
            skip_indices = set()
            
            # First pass: find bristol
            for ex in examples:
                if "Bristol" in ex.get("title", "") and "First" not in ex.get("title", "") and "Second" not in ex.get("title", ""):
                    bristol_ex = ex
                    if "subExamples" not in bristol_ex:
                        bristol_ex["subExamples"] = []
                        
            # Second pass: append First and Second
            for i, ex in enumerate(examples):
                title = ex.get("title", "")
                if title == "First" or title == "Second":
                    if bristol_ex:
                        bristol_ex["subExamples"].append(ex)
                    else:
                        pass # Should not happen if Bristol is there
                else:
                    new_examples.append(ex)
            
            # Actually, "Bristol" title is probably "Bristol" in that pathway. Let's see. Wait, "Bristol City Council" maybe? 
            # Let me just check the exact title.

        
        # 2 & 3. Innovative and De-risking Financial Tools and Mechanisms
        if pathway.get("title") == "Innovative and De-risking Financial Tools and Mechanisms":
            pathway["highlightBoxes"] = []
            
            # Extract "What is Blended Finance?" from implementationGuidance
            ig = pathway.get("implementationGuidance", [])
            new_ig = []
            i = 0
            while i < len(ig):
                if ig[i] == "What is Blended Finance?":
                    if i + 1 < len(ig):
                        pathway["highlightBoxes"].append({
                            "title": "What is Blended Finance?",
                            "content": ig[i+1]
                        })
                        i += 2
                    else:
                        i += 1
                else:
                    new_ig.append(ig[i])
                    i += 1
            pathway["implementationGuidance"] = new_ig
            
            # Extract "Viability Fund's support offer" from illustrativeExamples
            examples = pathway.get("illustrativeExamples", [])
            new_examples = []
            skip_indices = set()
            
            for i, ex in enumerate(examples):
                if i in skip_indices:
                    continue
                title = ex.get("title", "").strip()
                if title == "Viability Fund\u2019s support offer":
                    content = ""
                    if i + 1 < len(examples) and "The Viability Fund offers cities two core forms of support" in examples[i+1].get("title", ""):
                        content = examples[i+1].get("fullText", "")
                        skip_indices.add(i+1)
                    else:
                        content = ex.get("fullText", "")
                        
                    pathway["highlightBoxes"].append({
                        "title": "Viability Fund\u2019s support offer",
                        "content": content
                    })
                else:
                    new_examples.append(ex)
            pathway["illustrativeExamples"] = new_examples

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)

