const fs = require('fs');

const html = fs.readFileSync('scripts/thumbnails.html', 'utf8');

// Search for image extensions (.jpg, .png, .webp, .jpeg) in thumbnails.html
const imgRegex = /"([^"]+\.(jpg|png|webp|jpeg))"/gi;
const files = [];
let m;
while ((m = imgRegex.exec(html)) !== null) {
  const filename = m[1];
  const idx = m.index;
  const sliceBefore = html.substring(Math.max(0, idx - 300), idx);
  const idMatch = sliceBefore.match(/"(1[a-zA-Z0-9_-]{32})"/);
  files.push({
    name: filename,
    id: idMatch ? idMatch[1] : null,
  });
}

console.log('Total thumbnail files found:', files.length);
console.log(JSON.stringify(files.slice(0, 30), null, 2));
