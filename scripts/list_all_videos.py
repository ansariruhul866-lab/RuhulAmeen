import re

with open('scripts/videos.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Pattern for pairs of [null,"ID"], ... [[["FILENAME",null,1]]]
matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\][\s\S]{1,400}?\[\[\["([^"]+?\.(?:mp4|mov))"', content)

# Deduplicate by ID
seen = set()
unique_videos = []
for fid, fname in matches:
    if fid not in seen:
        seen.add(fid)
        unique_videos.append((fid, fname))

print(f"Total unique videos found: {len(unique_videos)}")
for i, (fid, fname) in enumerate(unique_videos, 1):
    print(f"{i}. {fname} -> {fid}")
