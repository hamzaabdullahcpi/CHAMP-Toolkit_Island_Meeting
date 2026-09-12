import re

with open('src/components/StepView.tsx', 'r') as f:
    content = f.read()

target = "const bulletMatch = trimmed.match(/^[\-\*\•]\s+(.*)/);"
replacement = "const bulletMatch = trimmed.match(/^(?:[-*+•—–·◦⁃]|\\\\d+\\\\.)\\\\s+(.*)/);"
content = content.replace(target, replacement)

with open('src/components/StepView.tsx', 'w') as f:
    f.write(content)
