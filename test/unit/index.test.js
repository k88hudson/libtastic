const {assert} = require("chai");
const Libtastic = require("../../src/libtastic");

describe("An example test", () => {
  it("should pass", () => {
    assert.isTrue(true);
  });
  it("should add stuff", () => {
    const libt = new Libtastic();
    assert.equal(libt.add(1, 2), 3);
  });
});
