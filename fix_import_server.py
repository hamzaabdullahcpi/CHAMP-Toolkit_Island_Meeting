import re

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace('import { createServer as createViteServer } from "vite";', 'import { createServer as createViteServer } from "vite";\nimport { actionsData } from "./src/data/content";')
content = content.replace('const { actionsData } = await import("./src/data/content.ts");', '')

with open('server.ts', 'w') as f:
    f.write(content)
