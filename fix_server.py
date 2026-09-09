import re

with open('server.ts', 'r') as f:
    content = f.read()

# Update the parsing logic in server.ts
old_actions = """        const actionDesc = a.fields["Description"] || "";"""
new_actions = """        const actionDesc = a.fields["Description"] || "";
        const systemsLogic = a.fields["Systems Logic"] || "";"""

old_return_action = """            id: actionId,
            title: actionTitle,
            description: actionDesc,
            pathways: myPathways"""
new_return_action = """            id: actionId,
            title: actionTitle,
            description: actionDesc,
            systemsLogic: systemsLogic,
            pathways: myPathways"""

content = content.replace(old_actions, new_actions)
content = content.replace(old_return_action, new_return_action)

with open('server.ts', 'w') as f:
    f.write(content)
