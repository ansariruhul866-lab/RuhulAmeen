const https = require('https');

function follow(url, cb) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      follow(res.headers.location, cb);
    } else {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => cb(data));
    }
  });
}

follow('https://drive.google.com/drive/folders/102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp?usp=drive_link', (data) => {
  const generalMatches = [...data.matchAll(/"([a-zA-Z0-9_-]{28,35})"/g)].map(m => m[1]);
  const unique = [...new Set(generalMatches)];
  console.log('Thumbnail IDs found:', unique.slice(0, 15));
});
