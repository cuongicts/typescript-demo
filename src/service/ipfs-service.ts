import fs from 'fs';
const ipfsClient = require('ipfs-http-client');

import ipfsHostConfig from '../common/ipfs-config';

const ipfs = ipfsClient({
  host: ipfsHostConfig.node,
  port: ipfsHostConfig.port,
  protocol: ipfsHostConfig.protocol,
});

export const addFileToIpfs = async (filename: string, filePath: string) => {
  try {
    const handler = p => {
      console.log(p);
    };
    const fileData = fs.readFileSync(filePath);
    console.log('read file sync');
    const response = await ipfs.add(fileData, { progress: handler });
    console.log(`uploaded to ipfs: ${JSON.stringify(response)}`);
    const fileResult = response.length ? response[0] : undefined;
    console.log(`fileResult: ${JSON.stringify(fileResult)}`);
    console.log(`url: ${ipfsHostConfig.host}/${fileResult.hash}`);
    return fileResult;
  } catch (err) {
    throw new Error(`addFileToIpfs error: ${err.message}`);
  }
};

export const addToIpfs = async (params) => {

};

addFileToIpfs('', './quanghai.jpg');