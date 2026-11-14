const fs = require('fs');

function inspectDump(filename) {
  const html = fs.readFileSync(filename, 'utf8');
  console.log(`\nAnalyzing ${filename}...`);
  
  // Find substrings containing .mp4, .mov, .jpg, .png
  const mediaMatches = [...html.matchAll(/["']([^"']+\.(mp4|mov|jpg|png|webp|jpeg))["']/gi)].map(m => m[1]);
  console.log('Media file names found:', [...new Set(mediaMatches)].slice(0, 20));

  // Find occurrences of drive IDs near file titles
  // Format in JSON often: ["ID","TITLE"
  const pairMatches = [...html.matchAll(/\["([a-zA-Z0-9_-]{33})",\[\],"([^"]+)"/g)].map(m => ({ id: m[1], title: m[2] }));
  console.log('Pairs found format 1:', pairMatches.slice(0, 10));

  // Format 2: "ID",["TITLE" or similar
  const pairMatches2 = [...html.matchAll(/\["([a-zA-Z0-9_-]{33})",null,"([^"]+)"/g)].map(m => ({ id: m[1], title: m[2] }));
  console.log('Pairs found format 2:', pairMatches2.slice(0, 10));
}

inspectDump('scripts/videos.html');
inspectDump('scripts/thumbnails.html');
