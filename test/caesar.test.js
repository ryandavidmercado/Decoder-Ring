// Write your tests here!
const ceaser = require("../src/caesar"),
  expect = require("chai").expect;

describe("ceasar()", () => {
  describe("base cases", () => {
    it("successfully encodes by the value of the shift", () => {
      expect(ceaser("test", 3)).to.equal("whvw");
    });
    it("succesfully decodes by the value of the shift", () => {
      expect(ceaser("whvw", 3, false)).to.equal("test");
    });
  });

  describe("edge cases", () => {
    it("ignores capital letters", () => {
      expect(ceaser("TeSt", 1)).to.equal("uftu");
    });
    it("handles shifts past the end of the alphabet", () => {
      expect(ceaser("z", 1)).to.equal("a");
      expect(ceaser("a", 1, false)).to.equal("z");
    });
    it("maintains spaces and other nonalphabetic symbols when encoding and decoding", () => {
      expect(ceaser("a! ", 1)).to.equal("b! ");
      expect(ceaser("b! ", 1, false)).to.equal("a! ");
    });
  });

  describe("invalid shift values", () => {
    it("returns false when shift value is === 0", () => {
      expect(ceaser("test", 0)).to.be.false;
    });
    it("returns false when shift value is > 25", () => {
      expect(ceaser("test", 26)).to.be.false;
    });
    it("returns false when shift value is < -25", () => {
      expect(ceaser("test", -26)).to.be.false;
    });
    it("returns false when shift value is not present", () => {
      expect(ceaser("test")).to.be.false;
    });
  });
});
