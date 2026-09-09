import json

with open('src/data/content.ts', 'r') as f:
    content = f.read()

start_idx = content.find('"title": "The Cities Climate Finance Leadership Alliance (CCFLA)"')

if start_idx != -1:
    target_end = content.find('        ],\n        "transferability":', start_idx)
    
    if target_end != -1:
        start_of_replace = content.find('          {\n            "title": "The Cities Climate Finance Leadership Alliance (CCFLA)"', start_idx - 100)
        
        new_block = '''          {
            "title": "The Cities Climate Finance Leadership Alliance (CCFLA)",
            "excerpt": "The Cities Climate Finance Leadership Alliance (CCFLA) provides a multi-level, multi-stakeholder space for practitioners...",
            "fullText": "The Cities Climate Finance Leadership Alliance (CCFLA) provides a multi-level, multi-stakeholder space for practitioners to connect, exchange experience and build networks around urban climate finance. Through its thematic Action Groups, CCFLA members can convene around priority topics such as project preparation, adaptation finance, enabling environments, private finance and other emerging financing challenges, sharing practical approaches and identifying opportunities for collaboration. Participation is open across CCFLA’s diverse membership, including national governments, city networks and subnational actors, demand- and supply-side finance organizations, and expert and technical organizations, helping connect perspectives across levels of government and across the climate finance ecosystem."
          }
'''
        new_content = content[:start_of_replace] + new_block + content[target_end:]
        with open('src/data/content.ts', 'w') as f:
            f.write(new_content)
        print("Trimmed action 6.1 examples successfully")
