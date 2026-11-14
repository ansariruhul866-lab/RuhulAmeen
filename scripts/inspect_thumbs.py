import re

with open('scripts/thumbs.html', 'r', encoding='utf-8', errors='ignore') as f:
    s = f.read()

# Let's find any text that looks like a title or name:
# In Google Drive folder metadata, folder title is at the beginning
title_match = re.search(r'data:\["driveweb;[^"]*",\["[^"]*",null,"([^"]+)"', s)
if title_match:
    print("Folder Title:", title_match.group(1))

# Let's see what items are inside ds:0 or ds:1
for m in re.finditer(r'\[\[null,"([a-zA-Z0-9_-]{28,36})"\]', s):
    # print context after the ID
    pos = m.start()
    snippet = s[pos:pos+300]
    print(snippet)
    print("-" * 40)
