import json
with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)
for action in actions:
    for pathway in action.get("pathways", []):
        for ex in pathway.get("illustrativeExamples", []):
            if "Viability Fund\u2019s support offer" in ex.get("title", ""):
                print(f"Action: {action.get('title')}, Pathway: {pathway.get('title')}")
