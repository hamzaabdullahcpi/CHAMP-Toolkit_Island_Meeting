import json

with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)

for a in actions:
    if a["id"] == 5:
        for p in a["pathways"]:
            print("Pathway:", p.get("title"))
            for ex in p.get("illustrativeExamples", []):
                print("  -> Title:", ex.get("title"))
