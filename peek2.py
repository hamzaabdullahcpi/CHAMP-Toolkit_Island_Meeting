import json
with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)
for action in actions:
    for pathway in action.get("pathways", []):
        ig = pathway.get("implementationGuidance", [])
        if len(ig) > 0:
            print(f"--- {pathway.get('title')} ---")
            print(f"Item 0: {ig[0]}")
            if len(ig) > 1:
                print(f"Item 1: {ig[1]}")
