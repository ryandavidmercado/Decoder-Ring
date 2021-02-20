// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // you can add any code you want within this function scope

  // we define easily parsable range constants for upper/lowercase chars
  const upperCaseRange = [65, 90];
  const lowerCaseRange = [97, 122];

  // we provide an easily parsable range check for use later on
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

  function alphabetMapGenerator(encode = true) {
    let output = {};

    /* We split the alphabet into two parts, excluding i and j,
    so that we can handle the special i/j case down the line. */
    const alphabetA = "abcdefgh";
    const alphabetB = "klmnopqrstuvwxyz";

    /* We hold these as seperate digits to avoid less-parsable
    modulo checks down the line and minimize string conversion*/
    let firstDigit = 1;
    let secondDigit = 1;

    /* We define this as a function to avoid repeating code when handling
    the first and second parts of the alphabet.*/
    function alphabetLooper(alphabet) {
      for (let i = 0; i < alphabet.length; i++) {
        let key, value;
        const [encoded, decoded] = [`${firstDigit}${secondDigit}`, alphabet[i]];

        // We properly assign our source and target values based on encode status
        [key, value] = encode ? [decoded, encoded] : [encoded, decoded];

        output[key] = value;
        firstDigit++;

        // We handle wrapping onto the next row of the square
        if (firstDigit > 5) {
          firstDigit = 1;
          secondDigit++;
        }
      }
    }

    alphabetLooper(alphabetA);

    /* We handle the special i/j case, iterating afterwards to continue
    with alphabetB */
    if (encode) output.i = output.j = "42";
    else output["42"] = "(i/j)";
    firstDigit++;

    alphabetLooper(alphabetB);

    return output;
  }

  function encoder(input, alphabetMap) {
    let output = "";
    if (/\d/.test(input)) return false;
    for (let i = 0; i < input.length; i++) {
      const charCode = charCoderLowerCase(input[i]);
      // we re-get the char because charCoderLowerCase automatically converts uppercase chars to lowercase ones
      const char = String.fromCharCode(charCode);

      // we only use the map for lowercase characters, passing the character straight for others.
      if (inRange(charCode, lowerCaseRange)) output += alphabetMap[char];
      else output += char;
    }
    return output;
  }

  function decoder(input, alphabetMap) {
    let output = "";
    for (let i = 0; i < input.length; i++) {
      /* We break out of the loop iteration to handle special characters in the provided input */
      /* The regex checks to see whether the character is an alphanumeric digit. */
      if (/\D/.test(input[i])) {
        output += input[i];
        continue;
      }

      /* We define our next encoded character pair as the currently pointed-at
      character appended by the next character */
      const nextPair = `${input[i]}${input[i + 1]}`;
      const nextChar = alphabetMap[nextPair];

      /* If our next decoded character is invalid, we know that the input is faulty. */
      if (typeof nextChar === "undefined") return false;
      output += nextChar;

      /* We iterate an extra time, as we've already handled the next character in the input. */
      i++;
    }
    return output;
  }

  /* we allow alphabetMap as a parameter so that we can build out user-defined Polybius squares down the line.
  Otherwsie, we call alphabetMapGenerator w/ our encode status as a parameter. */
  function polybius(input, encode = true, alphabetMap) {
    if (!alphabetMap) alphabetMap = alphabetMapGenerator(encode);
    // Because the logic of these two functions is so different, we call them instead of writing them out in here.
    return encode ? encoder(input, alphabetMap) : decoder(input, alphabetMap);
  }

  return {
    polybius,
  };
})();

module.exports = polybiusModule.polybius;
