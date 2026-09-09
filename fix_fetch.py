with open('migrate_to_airtable.ts', 'r') as f:
    content = f.read()

content = content.replace("import fetch from 'node-fetch';", "")

with open('migrate_to_airtable.ts', 'w') as f:
    f.write(content)
