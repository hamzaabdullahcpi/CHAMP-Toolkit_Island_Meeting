with open('src/components/MindMapGraphic.tsx', 'r') as f:
    content = f.read()

content = content.replace('type: "spring"', 'type: "spring" as const')

with open('src/components/MindMapGraphic.tsx', 'w') as f:
    f.write(content)
