import re
import json

def parse_html(filename):
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # In Drive HTML, files are inside AF_initDataCallback with data array
    # Look for [null,"FILE_ID"] followed eventually by [["FILENAME",null,1]]
    # or "Download", ... "FILE_ID"
    print(f"=== Parsing {filename} ===")
    
    # Search for all strings like [[null,"1..."]
    # Let's find all pairs of (id, filename)
    # In earlier curl output, we saw:
    # [[null,"1i5IpKRoqhSTdJNalhGyJf83Hsd6WEL4G"], ... [[["thank you landscape.mp4",null,1]]]
    # and [null,"1W7yt8uXdhUNzWxqI0dpXUn9J0ML3drtx"], ... [[["tips for skin and hair.mp4",null,1]]]
    
    # Let's extract blocks
    # Regex for ID:
    # Look for pattern: \[\[null,"([a-zA-Z0-9_-]{25,})"\][\s\S]*?\[\[\["([^"]+?\.(?:mp4|mov|jpg|jpeg|png|webp))"
    items = []
    # Let's search by filename first:
    fnames = re.findall(r'\[\[\["([^"]+?\.(?:mp4|mov|jpg|jpeg|png|webp))"', content)
    print("Found filenames:", len(fnames))
    for fn in set(fnames):
        # find the ID closest before this filename
        pos = content.find(fn)
        snippet = content[max(0, pos-2000):pos]
        id_matches = re.findall(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"', snippet)
        if not id_matches:
            id_matches = re.findall(r'"([a-zA-Z0-9_-]{33})"', snippet)
        fid = id_matches[-1] if id_matches else "UNKNOWN"
        print(f"  {fn} -> ID: {fid}")
        items.append((fn, fid))
    return items

parse_html('scripts/videos.html')
parse_html('scripts/thumbs.html')
