import json
with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)
for action in actions:
    for pathway in action.get("pathways", []):
        if pathway.get("title") == "Innovative and De-risking Financial Tools and Mechanisms":
            print("Highlight Boxes:", [h["title"] for h in pathway.get("highlightBoxes", [])])
            print("IG length:", len(pathway.get("implementationGuidance", [])))
            for i, ig in enumerate(pathway.get("implementationGuidance", [])):
                print(f"IG {i}: {ig[:50]}...")
            
            for ex in pathway.get("illustrativeExamples", []):
                print(f"Ex: {ex['title']}")
