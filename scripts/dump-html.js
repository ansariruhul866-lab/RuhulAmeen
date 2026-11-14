const https = require('https');
const fs = require('fs');

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

follow('https://drive.google.com/drive/folders/1mSxMvGmzP1d0FdfEbcY6WsZHJkyGoSF9?usp=drive_link', (html) => {
  fs.writeFileSync('scripts/videos.html', html);
  console.log('Saved videos.html, length:', html.length);
});

follow('https://drive.google.com/drive/folders/102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp?usp=drive_link', (html) => {
  fs.writeFileSync('scripts/thumbnails.html', html);
  console.log('Saved thumbnails.html, length:', html.length);
});
