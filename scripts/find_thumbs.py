import re

with open('scripts/thumbs.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Look for image extensions or image mime-types
images = set(re.findall(r'([^"\\/\s]+\.(?:jpg|jpeg|png|webp|psd))', content, re.IGNORECASE))
print("Unique image names in thumbs.html:", len(images))
for img in sorted(images):
    print(" ", img)

# Also let's find ID -> name mappings:
for m in re.finditer(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\][\s\S]{1,400}?\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', content, re.IGNORECASE):
    print(f"Match: {m.group(1)} --> {m.group(2)}")
