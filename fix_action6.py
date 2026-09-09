import json

with open('src/data/content.ts', 'r') as f:
    content = f.read()

# The "How to enable partnerships:" and following items are not examples, they are implementation guidance that leaked into examples.
# Let's fix that.
# Find the start of illustrativeExamples for the last pathway
# We know the first three are actual examples: GPSC, RISE UP, Beat the Heat
# The rest are text nodes. Let's slice the string.
start_idx = content.find('"title": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge"')
if start_idx != -1:
    end_obj = content.find('}', start_idx)
    end_obj_with_bracket = content.find('}', end_obj + 1) # Sometimes fullText has braces. Wait, let's just find the closing bracket of the object.
    
    # We can just replace the whole text block using string manipulation to end the array after the 3rd example.
    # A safer way is to find the exact substring and replace it.
    
    replace_str = '''          {
            "title": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge",
            "excerpt": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge",
            "fullText": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge"
          },'''
    
    target_end = content.find('        ],\n        "transferability":', start_idx)
    
    if target_end != -1:
        start_of_replace = content.find('          {\n            "title": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge"', start_idx - 100)
        
        # New block:
        new_block = '''          {
            "title": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge",
            "excerpt": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge",
            "fullText": "UNEP Beat the Heat Initiative, under the Global Cooling Pledge"
          }
'''
        new_content = content[:start_of_replace] + new_block + content[target_end:]
        with open('src/data/content.ts', 'w') as f:
            f.write(new_content)
        print("Trimmed action 6 examples further")
