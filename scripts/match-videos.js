const fs = require('fs');

const html = fs.readFileSync('scripts/videos.html', 'utf8');

const regex = /\["([a-zA-Z0-9_-]{33})",\[\],"([^"]+\.mp4)"/gi;
// Let's search for .mp4 with surrounding context
const mp4Regex = /"([^"]+\.mp4)"/gi;
const files = [];
let m;
while ((m = mp4Regex.exec(html)) !== null) {
  const filename = m[1];
  const idx = m.index;
  // Look backwards for a 33-char drive ID
  const sliceBefore = html.substring(Math.max(0, idx - 300), idx);
  const idMatch = sliceBefore.match(/"(1[a-zA-Z0-9_-]{32})"/);
  files.push({
    name: filename,
    id: idMatch ? idMatch[1] : null,
  });
}

console.log('Total mp4 files found:', files.length);
console.log(JSON.stringify(files, null, 2));
