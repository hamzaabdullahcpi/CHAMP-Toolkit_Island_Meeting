import json

with open("all_actions_formatted.json", "r") as f:
    actions = json.load(f)

for action in actions:
    for pathway in action.get("pathways", []):
        examples = pathway.get("illustrativeExamples", [])
        new_examples = []
        
        # We need state variables to collect nested examples
        current_system_demo = None
        current_local_hubs = None
        
        skip_indices = set()
        
        for i, ex in enumerate(examples):
            if i in skip_indices:
                continue
                
            title = ex.get("title", "")
            
            # InfraCredit Merge
            if "InfraCredit Nigeria" in title:
                # check if next one is the broken piece
                if i + 1 < len(examples) and "The model has also been replicated beyond" in examples[i+1].get("title", ""):
                    ex["fullText"] += "\n\n" + examples[i+1].get("fullText", "")
                    skip_indices.add(i+1)
            
            # System Demonstrators Parent Detection
            if "System Demonstrators" == title.strip():
                ex["subExamples"] = []
                current_system_demo = ex
                new_examples.append(ex)
                continue
                
            # CCFLA Local Hubs Parent Detection
            if "CCFLA Local Hubs" == title.strip() or "CCFLA Local Hubs" in title:
                ex["subExamples"] = []
                current_local_hubs = ex
                new_examples.append(ex)
                continue
            
            # Sub-examples for System Demonstrators
            system_demo_children = ["CoAction Lund", "Bristol Thriving Places", "Green Routes", "Makindye", "Stockholm"]
            if current_system_demo and any(child.lower() in title.lower() for child in system_demo_children):
                current_system_demo["subExamples"].append(ex)
                continue
                
            # Sub-examples for CCFLA Local Hubs
            local_hub_children = ["Brazil", "Central Asia"]
            if current_local_hubs and any(child.lower() in title.lower() for child in local_hub_children):
                current_local_hubs["subExamples"].append(ex)
                continue
                
            new_examples.append(ex)
            
        pathway["illustrativeExamples"] = new_examples

with open("all_actions_formatted.json", "w") as f:
    json.dump(actions, f, indent=2)

