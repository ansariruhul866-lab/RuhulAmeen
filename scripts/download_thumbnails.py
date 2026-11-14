import os
import urllib.request
import re
import time

os.makedirs('public/images/thumbnails', exist_ok=True)

with open('scripts/fresh_thumbs.html', 'r', encoding='utf-8', errors='ignore') as f:
    s = f.read()

matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\][\s\S]{1,400}?\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', s, re.IGNORECASE)

seen = set()
unique_thumbs = []
for fid, fname in matches:
    if fid not in seen:
        seen.add(fid)
        unique_thumbs.append((fid, fname))

print(f"Downloading {len(unique_thumbs)} thumbnails to public/images/thumbnails/...")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

downloaded = []
for idx, (fid, fname) in enumerate(unique_thumbs, 1):
    slug_base = re.sub(r'[^a-zA-Z0-9]+', '-', fname.replace('.png', '').replace('.jpg', '')).strip('-').lower()
    # Keep slug reasonable length
    slug_base = slug_base[:60]
    out_file = f"public/images/thumbnails/{slug_base}.png"
    thumb_url = f"https://lh3.googleusercontent.com/d/{fid}=w1200"

    try:
        req = urllib.request.Request(thumb_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp, open(out_file, 'wb') as out:
            data = resp.read()
            out.write(data)
            print(f"[{idx}/{len(unique_thumbs)}] Saved {out_file} ({len(data)} bytes) for '{fname}'")
        downloaded.append((fid, fname, slug_base, out_file))
    except Exception as e:
        print(f"[{idx}/{len(unique_thumbs)}] Failed {fname}: {e}")
    time.sleep(0.1)

print(f"\nSuccessfully downloaded {len(downloaded)} thumbnails locally!")
