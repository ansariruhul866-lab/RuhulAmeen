import urllib.request
import re

url = 'https://drive.google.com/drive/folders/1mSxMvGmzP1d0FdfEbcY6WsZHJkyGoSF9'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Find all .mp4 occurrences with surrounding context
for m in re.finditer(r'([a-zA-Z0-9_-]{28,36}).{1,300}?([^"\\]+\.mp4)', html):
    print("Match:", m.group(1), "-->", m.group(2))

# Also test generic search for strings ending in .mp4
mp4s = set(re.findall(r'([^"\\/\s]+\.mp4)', html))
print("\nUnique MP4s found:", len(mp4s))
for f in mp4s:
    print(" ", f)
