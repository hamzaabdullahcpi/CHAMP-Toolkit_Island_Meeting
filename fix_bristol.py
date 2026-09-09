import json
with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)

for action in actions:
    for pathway in action.get("pathways", []):
        if pathway.get("title") == "Locally Anchored Multilevel Climate Finance Structures":
            examples = pathway.get("illustrativeExamples", [])
            new_examples = []
            
            first_text = ""
            second_text = ""
            bristol_idx = -1
            
            for i, ex in enumerate(examples):
                title = ex.get("title", "")
                if title == "First":
                    first_text = ex.get("fullText", "")
                elif title == "Second":
                    second_text = ex.get("fullText", "")
                elif "Bristol" in title and "Thriving Places" not in title:
                    bristol_idx = i
                    new_examples.append(ex)
                else:
                    new_examples.append(ex)
                    
            if bristol_idx != -1:
                # find bristol in new_examples
                for ex in new_examples:
                    if "Bristol" in ex.get("title", "") and "Thriving Places" not in ex.get("title", ""):
                        if "subExamples" not in ex:
                            ex["subExamples"] = []
                        if first_text:
                            ex["subExamples"].append({
                                "title": "Bristol Climate Action Investment",
                                "excerpt": "Developed as part of its Net Zero Investment Co-Innovation Lab...",
                                "fullText": first_text
                            })
                        if second_text:
                            ex["subExamples"].append({
                                "title": "Bristol City Leap Community Energy Fund",
                                "excerpt": "A GBP 1.5 million, grant-and-loan facility backed by Ameresco and Vattenfall...",
                                "fullText": second_text
                            })
            
            # remove First and Second
            new_examples = [ex for ex in new_examples if ex.get("title") not in ["First", "Second"]]
            pathway["illustrativeExamples"] = new_examples

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)

