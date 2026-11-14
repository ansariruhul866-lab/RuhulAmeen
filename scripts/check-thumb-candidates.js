const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('scripts/thumbnails.html', 'utf8');

// Find all 33-char drive IDs in thumbnails.html
const allIds = [...new Set(html.match(/1[a-zA-Z0-9_-]{32}/g) || [])];
console.log('Total candidate IDs in thumbnails.html:', allIds.length);

// Test first 15 candidate IDs with Drive thumbnail API
function checkId(id) {
  return new Promise((resolve) => {
    const url = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode, location: res.headers.location });
    });
  });
}

(async () => {
  const results = await Promise.all(allIds.slice(0, 20).map(checkId));
  const valid = results.filter(r => r.status === 302);
  console.log(`Valid thumbnail IDs (${valid.length}/${results.length}):`);
  console.log(valid.map(v => v.id));
})();
