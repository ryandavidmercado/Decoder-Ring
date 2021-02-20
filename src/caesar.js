// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // you can add any code you want within this function scope

  /* We define the ranges for uppercase/lowercase chars 
  and valid shift entries as easily parsable arrays. */
  const upperCaseRange = [65, 90];
  const lowerCaseRange = [97, 122];
  const shiftRange = [-25, 25];

  // The range functions provide easily parsable range checks for use later on
  function inRange(number, [start, end]) {
    if (number < start || number > end) return false;
    return true;
  }
  function belowRange(number, [start]) {
    if (number < start) return true;
    return false;
  }
  function aboveRange(number, [, end]) {
    if (number > end) return true;
    return false;
  }

  // We return a character's code, converting uppercase to lowercase if necessary
  function charCoderLowerCase(char) {
    const charCode = char.charCodeAt(0);
    if (inRange(charCode, upperCaseRange)) return charCode + 32;
    else return charCode;
  }

  function caesar(input, shift, encode = true) {
    if (!inRange(shift, shiftRange) || shift === 0 || shift === undefined)
      return false;

    // We inverse the shift value for decoding operations
    if (!encode) shift *= -1;

    let output = "";
    for (let i = 0; i < input.length; i++) {
      let charCode = charCoderLowerCase(input[i]);

      /* We first check to make sure our charCoder has returned
      a valid lowercase character*/
      if (inRange(charCode, lowerCaseRange)) {
        charCode += shift;

        /* If the shift overflows out of lowercase range,
        we add or subtract 26 to wrap back to the other end of the alphabet*/
        if (belowRange(charCode, lowerCaseRange)) {
          charCode += 26;
        } else if (aboveRange(charCode, lowerCaseRange)) {
          charCode -= 26;
        }
      }

      output += String.fromCharCode(charCode);
    }

    return output;
  }

  return {
    caesar,
  };
})();

module.exports = caesarModule.caesar;
