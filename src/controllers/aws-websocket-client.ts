import WebSocket from 'ws';
'use strict';

import { Response, Request, NextFunction } from 'express';
import readline from 'readline';

export let index = async (req: Request, res: Response) => {
    return res.render('index', {
      layout: 'layout',
      title: 'Index',
      message: 'Hello'
    });
};

export let testClient = async (req: Request, res: Response) => {
    const url = 'wss://qizjzebghf.execute-api.us-east-2.amazonaws.com/FirstStage?name=Cuong';
    const ws = new WebSocket(url);
    const body = {
        action: 'sendmessage',
        data: 'client is sending..',
    };


    ws.on('open', () => console.log('connected'));
    // ws.send(JSON.stringify(body));
    ws.on('message', data => {
        console.log(`From server: ${data}`);
        setTimeout(function timeout() {
            ws.send(JSON.stringify(body));
        }, 500);
    });
    ws.on('close', () => {
        console.log('disconnected');
        process.exit();
    });

    readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    }).on('line', data => {
        ws.send(data);
    });
};
