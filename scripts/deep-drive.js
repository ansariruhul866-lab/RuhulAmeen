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

function parseFolder(url, label) {
  follow(url, (html) => {
    console.log(`\n=================== ${label} ===================`);
    // Extract file names and IDs from Google Drive JSON payload
    // Drive often has [null,"FILENAME",null,null,null,null,null,null,null,"FILE_ID"]
    const regex = /\["([a-zA-Z0-9_-]{28,35})",\["([a-zA-Z0-9_-]{28,35})"\],"([^"]+)"/g;
    let match;
    let found = [];
    while ((match = regex.exec(html)) !== null) {
      found.push({ id: match[1], name: match[3] });
    }
    
    // Also look for name/ID pairs in another format
    const nameIdRegex = /\["([a-zA-Z0-9_-]{33})",\[\],"([^"]+\.(mp4|mov|jpg|png|webp|jpeg|psd))"/gi;
    let m2;
    while ((m2 = nameIdRegex.exec(html)) !== null) {
      found.push({ id: m2[1], name: m2[2] });
    }

    // Generic search for media extensions
    const extRegex = /"([^"]+\.(mp4|mov|jpg|png|webp|jpeg))",\[\],\[\],"([a-zA-Z0-9_-]{33})"/gi;
    let m3;
    while ((m3 = extRegex.exec(html)) !== null) {
      found.push({ id: m3[3], name: m3[1] });
    }

    console.log(`Found ${found.length} parsed items for ${label}:`);
    console.log(found.slice(0, 15));
  });
}

parseFolder('https://drive.google.com/drive/folders/1mSxMvGmzP1d0FdfEbcY6WsZHJkyGoSF9?usp=drive_link', 'VIDEOS');
parseFolder('https://drive.google.com/drive/folders/102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp?usp=drive_link', 'THUMBNAILS');
