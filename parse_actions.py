import re
import json

with open("extracted_paragraphs.txt", "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f if line.strip()]

actions = []
current_action = None
current_pathway = None
current_section = None

def finalize_pathway():
    if current_pathway:
        if current_action:
            if "pathways" not in current_action:
                current_action["pathways"] = []
            current_action["pathways"].append(current_pathway)

def finalize_action():
    finalize_pathway()
    if current_action:
        actions.append(current_action)

action_idx = 0

for line in lines:
    if line.startswith("Action ") and ":" in line and not line.startswith("Action pathway"):
        # e.g., Action 1: Develop Shared Commitments...
        # Wait, Action 5 appears twice in the text? Yes, the text is repeated at the end.
        if action_idx == 6: break # skip the repeated Action 5 at the end
        
        finalize_action()
        current_action = {
            "id": int(re.search(r"Action (\d+)", line).group(1)),
            "title": line.split(":", 1)[1].strip(),
            "description": "",
            "systemsLogic": "",
            "pathways": []
        }
        current_pathway = None
        current_section = "action_desc"
        action_idx += 1
        continue
    
    if current_action:
        if line.startswith("Systems Logic:"):
            current_section = "systemsLogic"
            current_action["systemsLogic"] = line.replace("Systems Logic:", "").strip()
            continue
        
        if line.lower().startswith("action pathway"):
            continue # skip the header
            
        if re.match(r"^[1-6]\.[1-9]\.?", line):
            finalize_pathway()
            current_pathway = {
                "title": re.sub(r"^[1-6]\.[1-9]\.?\s*", "", line).strip(),
                "overview": "",
                "whatItIs": "",
                "implementationGuidance": [],
                "whyItIsNeeded": "",
                "keyActors": "",
                "illustrativeExamples": [],
                "transferability": [],
                "enablingConditions": []
            }
            current_section = "pathway_title"
            continue
            
        if current_pathway:
            if line.startswith("Overview"):
                current_section = "overview"
                if len(line) > 8:
                    current_pathway["overview"] += line[8:].strip() + " "
                continue
            if line.startswith("What it is:"):
                current_section = "whatItIs"
                current_pathway["whatItIs"] += line[11:].strip() + " "
                continue
            if line.startswith("Implementation Guidance:"):
                current_section = "implementationGuidance"
                rem = line[24:].strip()
                if rem: current_pathway["implementationGuidance"].append(rem)
                continue
            if line.startswith("Why it is needed:") or line.startswith("Why it is important:"):
                current_section = "whyItIsNeeded"
                current_pathway["whyItIsNeeded"] += line.split(":", 1)[1].strip() + " "
                continue
            if line.startswith("Key actors:"):
                current_section = "keyActors"
                current_pathway["keyActors"] += line[11:].strip() + " "
                continue
            if line.startswith("Illustrative examples:"):
                current_section = "illustrativeExamples"
                rem = line[22:].strip()
                if rem: current_pathway["illustrativeExamples"].append(rem)
                continue
            if line.startswith("Transferability"):
                current_section = "transferability"
                rem = line[15:].strip()
                if rem: current_pathway["transferability"].append(rem)
                continue
            if line.startswith("Enabling conditions"):
                current_section = "enablingConditions"
                rem = line[19:].strip()
                if rem: current_pathway["enablingConditions"].append(rem)
                continue
                
            # append to current section
            if current_section == "whatItIs":
                current_pathway["whatItIs"] += line + " "
            elif current_section == "overview":
                current_pathway["overview"] += line + " "
            elif current_section == "implementationGuidance":
                current_pathway["implementationGuidance"].append(line)
            elif current_section == "whyItIsNeeded":
                current_pathway["whyItIsNeeded"] += line + " "
            elif current_section == "keyActors":
                current_pathway["keyActors"] += line + " "
            elif current_section == "illustrativeExamples":
                current_pathway["illustrativeExamples"].append(line)
            elif current_section == "transferability":
                current_pathway["transferability"].append(line)
            elif current_section == "enablingConditions":
                current_pathway["enablingConditions"].append(line)
        else:
            if current_section == "action_desc":
                current_action["description"] += line + " "
            elif current_section == "systemsLogic":
                current_action["systemsLogic"] += line + " "

finalize_action()

with open("new_actions.json", "w") as f:
    json.dump(actions, f, indent=2)
