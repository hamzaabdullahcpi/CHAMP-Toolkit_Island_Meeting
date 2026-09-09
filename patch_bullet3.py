import re

with open('src/components/StepView.tsx', 'r') as f:
    content = f.read()

target1 = "const lines = text.split('\\n');"
replacement1 = "const lines = text.split(/\\r?\\n/);"
content = content.replace(target1, replacement1)

target2 = r"const bulletMatch = trimmed.match(/^(?:[-*+•—–·◦⁃]|\d+\.)\s+(.*)/);"
replacement2 = r"const bulletMatch = trimmed.match(/^(?:[-*+•—–·◦⁃]|\d+\.)\s*(.*)/);"
content = content.replace(target2, replacement2)

with open('src/components/StepView.tsx', 'w') as f:
    f.write(content)

