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
        if not any(a["id"] == current_action["id"] for a in actions):
            actions.append(current_action)

for i, line in enumerate(lines):
    if line.startswith("Action ") and ":" in line and not line.lower().startswith("action pathway"):
        match = re.search(r"Action (\d+)", line)
        if match:
            act_id = int(match.group(1))
            
            finalize_action()
            
            if any(a["id"] == act_id for a in actions):
                current_action = None
                current_pathway = None
                continue
                
            current_action = {
                "id": act_id,
                "title": line.split(":", 1)[1].strip(),
                "description": "",
                "systemsLogic": "",
                "pathways": []
            }
            current_pathway = None
            current_section = "action_desc"
        continue

    if not current_action:
        continue

    if line.lower().startswith("systems logic:"):
        current_section = "systemsLogic"
        current_action["systemsLogic"] = line[14:].strip()
        continue

    if line.lower().startswith("action pathway"):
        continue

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
        line_lower = line.lower()
        if line_lower.startswith("overview"):
            current_section = "overview"
            rem = line[8:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            current_pathway["overview"] += rem + " "
            continue
        if line_lower.startswith("what it is"):
            current_section = "whatItIs"
            rem = line[10:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            current_pathway["whatItIs"] += rem + " "
            continue
        if line_lower.startswith("implementation guidance"):
            current_section = "implementationGuidance"
            rem = line[23:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            if rem: current_pathway["implementationGuidance"].append(rem)
            continue
        if line_lower.startswith("why it is needed") or line_lower.startswith("why it is important"):
            current_section = "whyItIsNeeded"
            idx = line_lower.find(":")
            if idx != -1:
                rem = line[idx+1:].strip()
            else:
                rem = line[16:].strip() if "needed" in line_lower else line[19:].strip()
            current_pathway["whyItIsNeeded"] += rem + " "
            continue
        if line_lower.startswith("key actors"):
            current_section = "keyActors"
            rem = line[10:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            current_pathway["keyActors"] += rem + " "
            continue
        if line_lower.startswith("illustrative examples"):
            current_section = "illustrativeExamples"
            rem = line[21:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            if rem: current_pathway["illustrativeExamples"].append(rem)
            continue
        if line_lower.startswith("transferability"):
            current_section = "transferability"
            rem = line[15:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            if rem: current_pathway["transferability"].append(rem)
            continue
        if line_lower.startswith("enabling conditions"):
            current_section = "enablingConditions"
            rem = line[19:].strip()
            if rem.startswith(":"): rem = rem[1:].strip()
            if rem: current_pathway["enablingConditions"].append(rem)
            continue
        
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

print(len(actions))
