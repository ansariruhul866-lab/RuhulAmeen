import re

with open('scripts/new_thumbs.html', 'r', encoding='utf-8', errors='ignore') as f:
    s = f.read()

print('Title:', re.findall(r'<title>(.*?)</title>', s))
files = re.findall(r'\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', s, re.IGNORECASE)
print('Found image files count:', len(files))
for f in sorted(set(files)):
    print(' ', f)

# Also let's extract (ID, filename) pairs
matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\][\s\S]{1,400}?\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', s, re.IGNORECASE)
print('\nMatched (ID, filename) count:', len(matches))
seen = set()
for fid, fname in matches:
    if fid not in seen:
        seen.add(fid)
        print(f"  {fname} -> {fid}")
