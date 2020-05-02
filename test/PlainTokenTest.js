const PlainToken = artifacts.require("PlainToken");

contract("Plain Token Deploy", async (accounts) => {
  it("should deploy", async () => {
    const instance = await PlainToken.new();
    assert.ok(instance, "Could not deploy contract.");
  });
});

contract("Plain Token Test", async (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await PlainToken.new();
  });

  it("should put 100000000 units in the first account", async () => {
    const balance = await instance.balanceOf.call(accounts[0]);
    assert.equal(balance.toString(), "100000000");
  });
});
