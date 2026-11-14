import re
import os
import urllib.request
import time

os.makedirs('public/images/videos', exist_ok=True)

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

print(f"Downloading thumbnails for {len(unique_videos)} videos...")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

downloaded = []
for idx, (fid, fname) in enumerate(unique_videos, 1):
    slug_base = re.sub(r'[^a-zA-Z0-9]+', '-', fname.replace('.mp4', '').replace('.mov', '')).strip('-').lower()
    out_file = f"public/images/videos/{slug_base}.jpg"
    thumb_url = f"https://lh3.googleusercontent.com/d/{fid}=w1200"
    
    if os.path.exists(out_file) and os.path.getsize(out_file) > 1000:
        downloaded.append((fid, fname, slug_base, out_file))
        continue

    try:
        req = urllib.request.Request(thumb_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp, open(out_file, 'wb') as out:
            data = resp.read()
            out.write(data)
            print(f"[{idx}/{len(unique_videos)}] Saved {out_file} ({len(data)} bytes)")
        downloaded.append((fid, fname, slug_base, out_file))
    except Exception as e:
        print(f"[{idx}/{len(unique_videos)}] Failed {fname} ({fid}): {e}")
    time.sleep(0.1)

print(f"\nSuccessfully downloaded {len(downloaded)} thumbnails locally!")
