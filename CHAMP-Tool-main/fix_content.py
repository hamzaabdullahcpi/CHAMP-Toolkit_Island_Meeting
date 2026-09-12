import json
import re

with open('src/data/content.ts', 'r') as f:
    content = f.read()

# We need to find the array of illustrative examples inside the last pathway of Action 6 and trim it.
# It's easier to just do it via string replacement or finding the specific text block.
# Let's find: "title": "Part II: COUNTRY MULTILEVEL GOVERNANCE JOURNEYS"
# and remove it and everything after it up to the end of the illustrativeExamples array.

index_part_2 = content.find('"title": "Part II: COUNTRY MULTILEVEL GOVERNANCE JOURNEYS"')
if index_part_2 != -1:
    # Find the start of the object containing this title
    start_obj = content.rfind('{', 0, index_part_2)
    # We want to replace from `start_obj` to the end of the `illustrativeExamples` array
    # Let's find the end of the array, which is `        ],\n        "transferability":`
    end_array = content.find('],\n        "transferability":', start_obj)
    if end_array != -1:
        # Just remove the whole chunk and leave it as an empty object or just remove the commas
        # Let's see if there's a preceding comma
        preceding_comma = content.rfind(',', 0, start_obj)
        if preceding_comma != -1 and content[preceding_comma:start_obj].strip() == ',':
            new_content = content[:preceding_comma] + '\n        ' + content[end_array:]
        else:
            new_content = content[:start_obj] + '\n        ' + content[end_array:]
        
        with open('src/data/content.ts', 'w') as f:
            f.write(new_content)
        print("Fixed content.ts")
    else:
        print("Could not find end of array")
else:
    print("Could not find Part II title")
