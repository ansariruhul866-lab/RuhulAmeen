const https = require('https');

function fetchFolder(url, label) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (c) => (data += c));
    res.on('end', () => {
      console.log(`=== ${label} (HTTP ${res.statusCode}) ===`);
      // Find file IDs and names in the drive HTML
      const idMatches = data.match(/https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g);
      console.log('Direct file links:', idMatches ? idMatches.slice(0, 5) : 'none');
      
      const generalMatches = [...data.matchAll(/"([a-zA-Z0-9_-]{28,35})"/g)].map(m => m[1]);
      const unique = [...new Set(generalMatches)];
      console.log('Candidate IDs found:', unique.slice(0, 10));
    });
  });
}

fetchFolder('https://drive.google.com/drive/folders/1mSxMvGmzP1d0FdfEbcY6WsZHJkyGoSF9?usp=drive_link', 'VIDEOS');
fetchFolder('https://drive.google.com/drive/folders/102mHkP6o6aRLRFl6rh3BK2kl7lj1AXtp?usp=drive_link', 'THUMBNAILS');
