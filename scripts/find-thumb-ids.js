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

follow('https://drive.google.com/drive/folders/102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp?usp=drive_link', (html) => {
  // Look for any string containing 1... that is 33 chars
  const matches = html.match(/1[a-zA-Z0-9_-]{32}/g) || [];
  const unique = [...new Set(matches)];
  console.log('All 33-char drive IDs starting with 1:', unique);
});
