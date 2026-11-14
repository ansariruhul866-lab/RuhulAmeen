import re

with open('scripts/fresh_thumbs.html', 'r', encoding='utf-8', errors='ignore') as f:
    s = f.read()

print('Title:', re.findall(r'<title>(.*?)</title>', s))

# Look for image extensions
images = re.findall(r'\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', s, re.IGNORECASE)
print('Total image filename occurrences:', len(images))
for img in sorted(set(images)):
    print(' ', img)

# Extract (ID, filename)
matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\][\s\S]{1,400}?\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', s, re.IGNORECASE)
print('\nMatched (ID, filename):', len(matches))
seen = set()
unique_thumbs = []
for fid, fname in matches:
    if fid not in seen:
        seen.add(fid)
        unique_thumbs.append((fid, fname))
        print(f"  {fname} -> {fid}")

print(f"\nTotal unique thumbnails: {len(unique_thumbs)}")
