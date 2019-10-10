interface IpfsHostConfig {
  node: string;
  host: string;
  port: string;
  protocol: string;
}

const ipfsHostConfig: IpfsHostConfig = {
  node: 'ipfs.infura.io',
  host: 'https://ipfs.infura.io/ipfs',
  port: '5001',
  protocol: 'https',
};

export default ipfsHostConfig;