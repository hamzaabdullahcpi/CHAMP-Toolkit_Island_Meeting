import re

with open('server.ts', 'r') as f:
    content = f.read()

target1 = "const transferability = (p.fields[\"Transferability Considerations\"] || \"\").split(/\\r?\\n/).map((s:string) => s.replace(/^(?:[-*+•—–·◦⁃]|\\\\d+\\\\.)\\\\s*/, '').trim()).filter(Boolean);"
replacement1 = r"const transferability = (p.fields[\"Transferability Considerations\"] || \"\").split(/\r?\n/).map((s:string) => s.replace(/^(?:[-*+•—–·◦⁃]|\d+\.)\s*/, '').trim()).filter(Boolean);"
content = content.replace(target1, replacement1)

target2 = "const enablingConditions = (p.fields[\"Enabling Conditions\"] || \"\").split(/\\r?\\n/).map((s:string) => s.replace(/^(?:[-*+•—–·◦⁃]|\\\\d+\\\\.)\\\\s*/, '').trim()).filter(Boolean);"
replacement2 = r"const enablingConditions = (p.fields[\"Enabling Conditions\"] || \"\").split(/\r?\n/).map((s:string) => s.replace(/^(?:[-*+•—–·◦⁃]|\d+\.)\s*/, '').trim()).filter(Boolean);"
content = content.replace(target2, replacement2)

with open('server.ts', 'w') as f:
    f.write(content)
