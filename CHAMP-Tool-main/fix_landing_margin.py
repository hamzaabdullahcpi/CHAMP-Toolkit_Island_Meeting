import re

with open('src/components/LandingPage.tsx', 'r') as f:
    content = f.read()

# Make sure the mind map container does not add too much margin so it stays visible on one screen
content = content.replace('className="mb-24 flex flex-col items-center w-full"', 'className="mb-16 flex flex-col items-center w-full"')

with open('src/components/LandingPage.tsx', 'w') as f:
    f.write(content)
