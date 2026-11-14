import urllib.request
import re
import os

def parse_folder(folder_id):
    url = f'https://drive.google.com/drive/folders/{folder_id}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')
    
    # Pattern to match: [[null,"FILE_ID"], ... [[["FILENAME.EXT"
    # Or find all occurrences of AF_initDataCallback with ds:
    print(f"HTML length for {folder_id}: {len(html)}")
    
    # Let's find filenames ending with mp4, mov, jpg, png, webp
    matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\][^\]]+?\[\[\["([^"]+?\.(?:mp4|mov|jpg|jpeg|png|webp))"', html)
    print(f"Matched {len(matches)} files:")
    for fid, fname in matches:
        print(f"  {fid} -> {fname}")
    return matches

print("=== VIDEOS FOLDER ===")
videos = parse_folder('1mSxMvGmzP1d0FdfEbcY6WsZHJkyGoSF9')

print("\n=== THUMBNAILS FOLDER ===")
thumbs = parse_folder('102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp')
