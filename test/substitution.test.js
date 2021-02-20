// Write your tests here!
const substitution = require("../src/substitution"),
  expect = require("chai").expect;

describe("substitution()", () => {
  describe("base functionality", () => {
    it("should correctly encode the given phrase using the provided alphabet", () => {
      expect(substitution("message", "plmoknijbuhvygctfxrdzeswaq")).to.equal(
        "ykrrpik"
      );
    });
    it("should correctly decode the given phrase using the provided alphabet", () => {
      expect(
        substitution("ykrrpik", "plmoknijbuhvygctfxrdzeswaq", false)
      ).to.equal("message");
    });
    it("should allow special characters as targets for encode", () => {
      expect(substitution("test", "abcd#fghijklmnopqrstuvwxyz")).to.equal(
        "t#st"
      );
    });
    it("should allow special characters as targets for decode", () => {
      expect(
        substitution("t#st", "abcd#fghijklmnopqrstuvwxyz", false)
      ).to.equal("test");
    });
  });
  describe("formatting", () => {
    it("should maintain spaces and non-alphabetic characters in the messages during encode", () => {
      expect(
        substitution("m ess #age~ ", "plmoknijbuhvygctfxrdzeswaq")
      ).to.equal("y krr #pik~ ");
    });
    it("should maintain spaces and non-alphabetic characters in the messages during decode", () => {
      expect(
        substitution("y krr #pik~ ", "plmoknijbuhvygctfxrdzeswaq", false)
      ).to.equal("m ess #age~ ");
    });
    it("should ignore capital letters during encode", () => {
      expect(substitution("abcd", "plmoknijbuhvygctfxrdzeswaq")).to.equal(
        substitution("ABCD", "plmoknijbuhvygctfxrdzeswaq")
      );
    });
    it("should ignore capital letters during decode", () => {
      expect(
        substitution("abcd", "plmoknijbuhvygctfxrdzeswaq", false)
      ).to.equal(substitution("ABCD", "plmoknijbuhvygctfxrdzeswaq", false));
    });
  });
  describe("edge cases", () => {
    it("should return false if the given alphabet isn't exactly 26 characters long", () => {
      expect(substitution("message", "abc")).to.be.false;
    });
    it("should return false if any duplicate characters exist in the given alphabet", () => {
      expect(substitution("message", "aacdefghijklmnopqrstuvwxyz")).to.be.false;
    });
  });
});
