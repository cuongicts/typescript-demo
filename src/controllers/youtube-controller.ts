import fs from 'fs';
import ytdl from 'ytdl-core';

const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

const url = 'https://www.youtube.com/watch?v=cgp_bO64c4Q';
const formats = [];
// ytdl().pipe(fs.createWriteStream('a.flv'));

ytdl.getInfo(url, (err, info) => {
  if (err) {
    console.log('err:', err);
  }
  info.formats.forEach(item => {
    if (item.size) {
      item.size = bytesToSize(Number(item.size));
      formats.push(item);
    }
  });
  return formats;
});