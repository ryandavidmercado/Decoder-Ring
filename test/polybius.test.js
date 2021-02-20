// Write your tests here!
const polybius = require("../src/polybius"),
  expect = require("chai").expect;

describe("polybius()", () => {
  describe("encoding", () => {
    it("should encode i/j to 42", () => {
      expect(polybius("ij")).to.equal("4242");
    });
    it("should ignore capital letters", () => {
      expect(polybius("HELLO")).to.equal(polybius("hello"));
    });
    it("should maintain spaces in the message", () => {
      expect(polybius("i i i ")).to.equal("42 42 42 ");
    });
  });

  describe("decoding", () => {
    it("should decode 42 to (i/j)", () => {
      expect(polybius("4242", false)).to.equal("(i/j)(i/j)");
    });
    it("should maintain spaces in the message", () => {
      expect(polybius("11 32   55 ", false)).to.equal("a h   z ");
    });
  });

  describe("edge cases", () => {
    it("should return false when provided an invalid cipher for decryption", () => {
      expect(polybius("273255", false)).to.be.false;
    });
  });
});
