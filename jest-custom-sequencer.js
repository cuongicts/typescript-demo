// import * as TestSequencer from '@jest/test-sequencer';
const path = require('path');
const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const pathToTest = path.join(__dirname, './src/controllers/__tests__');
    const orderPath = [
      `${pathToTest}/user.test.ts`,
      `${pathToTest}/youtube.test.ts`,
      `${pathToTest}/default.test.ts`,
    ];
    console.log(` orderPath: ${orderPath}`);
    return tests.sort((testA, testB) => {
      const indexA = orderPath.indexOf(testA.path);
      const indexB = orderPath.indexOf(testB.path);

      if (indexA === indexB) return 0; // do not swap when tests both not specify in order.

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA < indexB ? -1 : 1;
    });
  }
}

module.exports = CustomSequencer;