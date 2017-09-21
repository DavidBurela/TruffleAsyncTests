# Truffle Async Test example
Practical example showing how to write Truffle tests async, instead of promise chaining

I used the default `truffle init` sample. Duplicated `test/metacoin.js` to `test/asyncmetacoin.js`, and refactored it to use async/await.

## Requirements
Requires Node 7.6+ or Node 8+ [https://www.infoq.com/news/2017/02/node-76-async-await/](https://www.infoq.com/news/2017/02/node-76-async-await/)

## How to run
1. Clone the repo
2. Start TestRPC in another termainal
3. Run `truffle test`
