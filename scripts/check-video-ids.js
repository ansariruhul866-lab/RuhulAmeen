const https = require('https');

function checkFile(id) {
  const url = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
  https.get(url, (res) => {
    console.log(`ID: ${id} -> Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}`);
  });
}

const candidateIds = [
  '1kP3x9x8ZVNmw34GjPriKjg_aln135Opo',
  '1MDW-smTCvTMbvnpFXeB6xdcoue1ZPP8s',
  '1Sh6gxCs3j2ItFtu5orS0WCap299CUJSE',
  '18rzlxD0L1n4jAhAl_JtYRO1ZMbuKpcFU',
  '1m9IMY_NKa9P25jxIRxGJJo1bQ6hJqtxT',
  '1JMu1utm78YtirT3OFvm5YGMqmZG_wgxr',
  '1yQ8qL2USqP7Fw_SJQimMmn6kNGr9o4w8'
];

candidateIds.forEach(checkFile);
