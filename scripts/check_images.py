import re

s = open('scripts/videos.html', encoding='utf-8', errors='ignore').read()
images = re.findall(r'\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp))"', s)
print('Images in videos folder:', images)
