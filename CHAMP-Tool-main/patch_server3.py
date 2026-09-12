import re

with open('server.ts', 'r') as f:
    content = f.read()

content = content.replace('p.fields[\\"Transferability Considerations\\"]', 'p.fields["Transferability Considerations"]')
content = content.replace('|| \\"\\")', '|| "")')

content = content.replace('p.fields[\\"Enabling Conditions\\"]', 'p.fields["Enabling Conditions"]')

with open('server.ts', 'w') as f:
    f.write(content)
