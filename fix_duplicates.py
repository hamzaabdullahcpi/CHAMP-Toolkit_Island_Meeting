import json

with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)

for action in actions:
    for pathway in action.get("pathways", []):
        for ex in pathway.get("illustrativeExamples", []):
            if "subExamples" in ex:
                new_sub_ex = []
                for sub in ex["subExamples"]:
                    if sub.get("title") not in ["First", "Second"]:
                        new_sub_ex.append(sub)
                ex["subExamples"] = new_sub_ex

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)

