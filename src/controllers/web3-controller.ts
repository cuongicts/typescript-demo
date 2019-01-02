'use strict';

import Web3 from 'web3';

// const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:83456'));
const web3_provider = 'http://localhost:8545';
const _web3 = new Web3();
_web3.setProvider(new Web3.providers.HttpProvider(web3_provider));





exports.web3 = _web3;

