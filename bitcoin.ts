import Axios, { AxiosRequestConfig } from 'axios';
import * as bitcoin from 'bitcoinjs-lib';
import { RegtestUtils } from 'regtest-client';

const APIPASS = process.env.APIPASS || 'satoshi';
const APIURL = process.env.APIURL || 'https://regtest.bitbank.cc/1';
const rootUrl = `https://api.blockcypher.com/v1/btc/test3`;
const wsUrl = 'wss://socket.blockcypher.com/v1/btc/test3';

const regtestUtils = new RegtestUtils({ APIPASS, APIURL });
const dhttp = regtestUtils.dhttp;
const TESTNET = bitcoin.networks.testnet;

const sourceAddr = {
  private: 'b76bba4b2470fdd04ef8675223391e098eccb95630cb60bd152307c685011eb8',
  public: '02e553cef065f4a94e87e7dccf6de51dc67ab46dd7fbace77512605bd5e51da457',
  address: 'mvmHofxksD6gzBheQqVT2yxY65DBDUvRgU',
};

const destAddr = {
  private: 'b6675d61581526c8887677a4a7db1712bbb76bdb2dcd9e08bde4bbf19839519e',
  public: '02163e8c469c6d2fcc03d3d7f3704f00a9fa3e2309753255784ffffc650836509a',
  address: 'mnuiTqi49gWhzkiJfMZBEEeAyXvaw8n6PV',
};

// const keyPair = bitcoin.ECPair.makeRandom({ network: TESTNET });
// const { address, signature } = bitcoin.payments.p2pkh({
//   pubkey: keyPair.publicKey,
//   network: TESTNET,
// });

// console.log(`privateKey: ${keyPair.privateKey.toString('hex')}`);
// console.log(`publicKey: ${keyPair.publicKey.toString('hex')}`);
// console.log(`address: ${address}`);

try {
  const key = bitcoin.ECPair.fromPrivateKey(Buffer.from(sourceAddr.private, 'hex'));
  const psbt = new bitcoin.Psbt();

  const amountWeHave = 1000000; // 0.01 BTC
  const amountToKeep = 800000; // 0.008 BTC
  const transactionFee = 1000; // .00001 BTC
  const amountToSend = amountWeHave - amountToKeep - transactionFee;
  psbt.addInput({
    hash: '',
    index: 0
  });
  psbt.addOutput({
    address: destAddr.address,
    value: amountToSend
  });
  psbt.addOutput({
    address: sourceAddr.address,
    value: amountToKeep
  });
  psbt.signInput(0, key);
  psbt.validateSignaturesOfInput(0);
  psbt.finalizeAllInputs();
  const tx_hex = psbt.extractTransaction().toHex();
  console.log('our beautiful transaction: ', tx_hex);
} catch (err) {
  console.log(`Got error: ${err}`);
}