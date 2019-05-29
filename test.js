const Web3 = require('web3');
const FusionContract = require('./src/config/FusionContract.json');
const GeneAidolsTokenContract = require('./src/config/GeneAidolsTokenContract.json');
const contractAddress = FusionContract.address;
const abi = FusionContract.abi;

const configs = [{
  // network: 'https://ropsten.infura.io/v3/851794074dfb45d78b579badd848f0f2',
  network: 'https://ropstenshared.bdnodes.net/?auth=o71aMIfQvZUkSDXAVIdNIOfu7XR2NnKrn0pkHD2RDkk',
  ws: `wss://ropsten.infura.io/ws/v3/c52f0b22f0ff443eb3346c75e4d8f5aa`,
  privateKey: '0x6ea45207cfc64c9e777b51aba0447042a68940fda3740b111962740d2f72520f',
}, {
  network: 'http://127.0.0.1:7545',
  privateKey: '0x2df4e80ebdd753dc092910ed7654c2c3c8b363a6b639109e27d4340380f83e90',
}, {
  network: 'http://18.179.90.142:18545/',
  privateKey: '0x6ea45207cfc64c9e777b51aba0447042a68940fda3740b111962740d2f72520f',
}];

const selectedAccount = configs[0];
const web3 = new Web3(new Web3.providers.HttpProvider(selectedAccount.network));
const wsProvider = new Web3.providers.WebsocketProvider(selectedAccount.ws);
const web3Ws = new Web3(wsProvider);
wsProvider.on('error', e => console.log('WS Error', e));
wsProvider.on('end', e => console.log('WS End', e));

const contract = new web3Ws.eth.Contract(abi, contractAddress);

const sendTx = (sendObject, privateKey) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const rawTx = {
    from: account.address,
    to: address,
    gasPrice: web3.utils.toHex(web3.utils.toWei('40', 'gwei')),
    gas: '',
    nonce: '',
    data: sendObject.encodeABI(),
  };
  const promises = [];
  const gas = await sendObject.estimateGas();
  rawTx.gas = web3.utils.toHex(gas);
  return new Promise((done, fail) => {
    web3.eth.getTransactionCount(account.address)
      .then(count => {
        rawTx.nonce = web3.utils.toHex(count);
        return sendObject.estimateGas();
      }).then(gas => {
        rawTx.gas = web3.utils.toHex(gas);
        return web3.eth.accounts.signTransaction(rawTx, privateKey);
      }).then(signedData => {
        console.log('Start send', new Date().getTime());
        web3.eth.sendSignedTransaction(signedData.rawTransaction)
          .on('receipt', (res) => {
            done(res);
          })
          .on('confirmation', (index, receipt) => {
            console.log('confirmation', index, new Date().getTime());
          })
          .on('error', err => {
            fail(err)
          });
      }).catch(err => {
        fail(err);
      });
  });
}

const sendMethod = async (methodName, params) => {
  const tokenContract = new web3.eth.Contract(abi);
  tokenContract.options.address = address;
  const sendObject = tokenContract.methods[methodName](...params);
  const result = await sendTx(sendObject, selectedAccount.privateKey);
  return result;
}


const getPastEvents = async (eventName, fromBlock) => {
  const results = await contract.getPastEvents(eventName, {
    fromBlock,
  });

  return results;
}


try {
  subscribeTransfer();
} catch (error) {
  console.log(error);
}
