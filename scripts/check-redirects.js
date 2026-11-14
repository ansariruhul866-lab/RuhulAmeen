const https = require('https');

function followRedirect(url, id) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      followRedirect(res.headers.location, id);
    } else {
      console.log(`ID ${id}: final status ${res.statusCode}, content-type: ${res.headers['content-type']}`);
    }
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

candidateIds.forEach(id => {
  followRedirect(`https://drive.google.com/thumbnail?id=${id}&sz=w400`, id);
});
