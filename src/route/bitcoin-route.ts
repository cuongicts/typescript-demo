import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';

const BlockIo = require('block_io');
const MyWallet = require('blockchain.info/MyWallet');
const blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3);
const pushTx = require('blockchain.info/pushtx').usingNetwork(3);
const router = express.Router();

const version = 2;
const apiKey = 'f09a-b652-4233-1557';
const secretPin = 'cuongnv0106';
const blockIO = new BlockIo(apiKey, secretPin, version);

router.get('/', async (req: Request, res: Response) => {
  try {
    const btcInfo = await axios.get(`https://api.blockchain.info/stats`);
    console.log(btcInfo.data);

    return res.json({
      status: 'success',
      data: btcInfo.data
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/balance', async (req: Request, res: Response) => {
  try {
    // const { walletId, password } = req.body;
    const walletId = '0548c099-3309-4560-bef4-b0c84fd2dcf9';
    const password = 'vancuong0106';
    const options = {
      apiHost: 'http://localhost:3000',
    };
    const myWallet = new MyWallet(walletId, password, options);

    const balance = await myWallet.getBalance();
    const accounts = await myWallet.listAccounts();
    return res.json({
      status: 'success',
      data: {
        accounts,
        balance
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/blockio', async (req: Request, res: Response) => {
  try {
    const toAddress = 'mnuiTqi49gWhzkiJfMZBEEeAyXvaw8n6PV';
    const balance = await new Promise((done, fail) => {
      blockIO.get_balance((err, result) => {
        if (err) {
          fail(err);
        }
        done(result.data);
      });
    });

    const withdrawResult = await new Promise((done, fail) => {
      blockIO.withdraw({
        amount: '0.001',
        from_addresses: '2NCy1fmWd3nnh8LKJP6vEFEqhcBW56cvkRD',
        to_addresses: toAddress,
      }, (err, result) => {
        if (err) {
          fail(err);
        }
        done(result);
      });
    });
    return res.json({
      status: 'success',
      data: {
        balance,
        withdrawResult
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/tx', async (req: Request, res: Response) => {
  try {
    const tx = '218bdb4472190494773a403051a3c69b76d2657f95379929fffec2ddc823b656';
    const txInfo = await new Promise((done, fail) => {
      blockIO.get_raw_transaction({ txid: tx }, (err, result) => {
        if (err) {
          fail(err);
        }
        done(result.data);
      });
    });

    return res.json({
      status: 'success',
      data: {
        txInfo
      },
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;