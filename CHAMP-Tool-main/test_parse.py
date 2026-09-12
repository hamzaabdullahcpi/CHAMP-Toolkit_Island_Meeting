import re

with open("extracted_paragraphs.txt", "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f if line.strip()]

for line in lines:
    if line.startswith("Action ") and ":" in line and not line.lower().startswith("action pathway"):
        print("Found Action:", line)

