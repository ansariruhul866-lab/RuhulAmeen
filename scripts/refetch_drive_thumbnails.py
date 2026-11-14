import os
import urllib.request
import re
import time

folder_id = '102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp'
url = f'https://drive.google.com/drive/folders/{folder_id}'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

print(f"Fetching fresh Drive page for folder: {folder_id}...")
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req, timeout=20) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

with open('scripts/fresh_thumbs_latest.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f"Saved latest HTML ({len(html)} bytes). Analyzing for files...")

# Regex for Google Drive embedded JSON payload
# Matches files with IDs and image extensions
matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,45})"\][\s\S]{1,500}?\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd|tif|tiff))"', html, re.IGNORECASE)

seen = set()
unique_files = []
for fid, fname in matches:
    if fid not in seen and fid != folder_id:
        seen.add(fid)
        unique_files.append((fid, fname))

print(f"Found {len(unique_files)} image files in latest HTML payload:")
for i, (fid, name) in enumerate(unique_files, 1):
    print(f"  {i}. {fid} -> {name}")

# Also check for any file IDs pattern [fid, [name...]]
alt_matches = re.findall(r'\["([a-zA-Z0-9_-]{28,45})",\["([^"]+?\.(?:png|jpg|jpeg|webp))"', html, re.IGNORECASE)
for fid, fname in alt_matches:
    if fid not in seen and fid != folder_id:
        seen.add(fid)
        unique_files.append((fid, fname))
        print(f"  (Alt) {fid} -> {fname}")

os.makedirs('public/images/thumbnails', exist_ok=True)

downloaded = 0
for idx, (fid, fname) in enumerate(unique_files, 1):
    slug_base = re.sub(r'[^a-zA-Z0-9]+', '-', fname.replace('.png', '').replace('.jpg', '').replace('.jpeg', '')).strip('-').lower()
    slug_base = slug_base[:65]
    out_file = f"public/images/thumbnails/{slug_base}.png"
    
    thumb_url = f"https://lh3.googleusercontent.com/d/{fid}=w1600"
    try:
        req = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as r, open(out_file, 'wb') as out:
            data = r.read()
            out.write(data)
            print(f"[{idx}/{len(unique_files)}] Downloaded {out_file} ({len(data)} bytes)")
            downloaded += 1
    except Exception as e:
        print(f"[{idx}/{len(unique_files)}] Error downloading {fname}: {e}")
    time.sleep(0.1)

print(f"\nDone! Downloaded/Updated {downloaded} thumbnail files.")
