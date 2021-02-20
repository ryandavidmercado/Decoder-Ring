// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope

  // we define an easily parsable range constant for uppercase chars
  const upperCaseRange = [65, 90];

  // we define an easily parsable function to check if a number is w/in a given range
  function inRange(number, [start, end]) {
    if (number < start || number > end) return false;
    return true;
  }

  /* this returns a character's char code, 
  converting to lowercase if necessary */
  function charCoderLowerCase(char) {
    const charCode = char.charCodeAt(0);
    if (inRange(charCode, upperCaseRange)) return charCode + 32;
    else return charCode;
  }

  function alphabetMapGenerator(targetAlphabet, encode) {
    if (!targetAlphabet) return false;
    targetAlphabet = targetAlphabet.toLowerCase();

    const output = {};

    /* By keeping a log of our target characters,
    as we iterate through them, we're able to check for duplicates */

    const targetLog = new Set();
    const baseAlphabet = "abcdefghijklmnopqrstuvwxyz";
    if (targetAlphabet.length !== 26) return false;
    for (let i = 0; i < 26; i++) {
      if (targetLog.has(targetAlphabet[i])) return false;
      targetLog.add(targetAlphabet[i]);

      let key, value;
      [key, value] = encode
        ? [baseAlphabet[i], targetAlphabet[i]]
        : [targetAlphabet[i], baseAlphabet[i]];
      output[key] = value;
    }
    return output;
  }

  function substitution(input, alphabet, encode = true) {
    const alphabetMap = alphabetMapGenerator(alphabet, encode);
    let output = "";

    if (!alphabetMap) return false;

    for (let i = 0; i < input.length; i++) {
      const charCode = charCoderLowerCase(input[i]);
      const char = String.fromCharCode(charCode);
      if (alphabetMap.hasOwnProperty(char)) output += alphabetMap[char];
      else output += char;
    }

    return output;
  }

  return {
    substitution,
  };
})();

module.exports = substitutionModule.substitution;
