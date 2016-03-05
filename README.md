# shhh

Allows temporarily disabling console output, for instance when used with noisy unit tests.

For production use you probably want to use something like [Winston](https://github.com/winstonjs/winston)

## Installation

```bash
npm install --save shhh
```

## Usage

```javascript
const shhh = require('shhh');

console.log('This is visible');
shhh.enable();
console.log('This is hidden');
console.error('This is hidden too');
console.time('timer');
console.timeEnd('timer'); // nothing shows up here either
shhh.disable();
console.info('This is visible again');
```

## Usage in mocha tests

dummyMath.js

```javascript
module.exports.add = function(val1, val2) {
  console.log('Doing some math..');
  console.log('Adding ' + val1 + ' + ' + val2);
  const result = val1 + val2;
  console.log('Result is ' + result);
  return result;
}
```

test.js

```javascript
const shhh = require('shhh');
const dummyMath = require('dummyMath');

describe('Some noisy module', function() {
  before(function() {
    console.log('Starting tests');       // printed to console
    shhh.enable();
    console.log('Tests about to run..'); // not printed to console
  });

  after(function() {
    console.log('Tests finished');       // not printed to console
    shhh.disable();
    console.log('done');                 // printed to console
  });

  it('should do stuff without console being annoying', function() {
    // The function is very noisy but that stuff won't show up in test output
    const result = dummyMath.add(1, 1);
    // No assertion library for simplicity
    if (result !== 2) {
      throw new Error('1 + 1 should be 2');
    }
  });
})
```