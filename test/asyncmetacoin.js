var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('Async MetaCoin', function (accounts) {
  it("should put 10000 MetaCoin in the first account", async () => {
    var instance = await MetaCoin.deployed();
    var balance = await instance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it("should call a function that depends on a linked library", async () => {
    var meta = await MetaCoin.deployed();
    var outCoinBalance = await meta.getBalance.call(accounts[0]);
    var metaCoinBalance = outCoinBalance.toNumber();
    outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    var metaCoinEthBalance = outCoinBalanceEth.toNumber();

    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
  });
  it("should send coin correctly", async () => {
    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];
    var amount = 10;

    var meta = await MetaCoin.deployed();
    var balance1 = await meta.getBalance.call(account_one);
    var account_one_starting_balance = balance1.toNumber();
    var balance2 = await meta.getBalance.call(account_two);
    var account_two_starting_balance = balance2.toNumber();
    
    await meta.sendCoin(account_two, amount, { from: account_one });
    
    var balance1after = await meta.getBalance.call(account_one);
    var account_one_ending_balance = balance1after.toNumber();
    var balance2after = await meta.getBalance.call(account_two);
    var account_two_ending_balance = balance2after.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
