with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace('app.post("/api/migrate"', 'app.get("/api/migrate"')

with open('server.ts', 'w') as f:
    f.write(content)
