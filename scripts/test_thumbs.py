import urllib.request
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}
url = 'https://drive.google.com/drive/folders/102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp?usp=sharing'
req = urllib.request.Request(url, headers=headers)
try:
    resp = urllib.request.urlopen(req)
    content = resp.read().decode('utf-8', errors='ignore')
    print('Final URL:', resp.geturl())
    print('Title:', re.findall(r'<title>(.*?)</title>', content))
    files = re.findall(r'\[\[\["([^"]+?\.(?:jpg|jpeg|png|webp|psd))"', content)
    print('Files found:', len(files), files[:15])
except Exception as e:
    print('Error:', e)
