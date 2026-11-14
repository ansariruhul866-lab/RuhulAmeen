import os
import re

SRC_DIR = 'src'

def replace_accents_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    orig = content

    # In three.js / JS colors where string hex is passed
    if 'Three' in content or 'three' in content:
        content = re.sub(r'color="#ff5500"', 'color="#E5262B"', content)
        content = re.sub(r'color="#ff3b00"', 'color="#E5262B"', content)

    # Tailwind classes with #ff5500
    content = content.replace('#ff5500', 'var(--accent,#E5262B)')
    content = content.replace('#ff6a1a', 'var(--accent-hover,#ff3338)')
    content = content.replace('#ff3b00', 'var(--accent-hover,#ff3338)')
    content = content.replace('#ff7733', 'var(--accent-hover,#ff3338)')

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated accents in {filepath}")

for root, dirs, files in os.walk(SRC_DIR):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            replace_accents_in_file(os.path.join(root, file))

print("Accent unification complete.")
