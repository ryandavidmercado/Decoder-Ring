# Decoder Ring
<img src="https://github.com/ryandavidmercado/Decoder-Ring/blob/main/screenshots/preview.png?raw=true" width="50%" alt="Preview" />

An exhaustively tested implementation of several encoding and decoding text algorithms. Enables the user to input messages for encode or decode using a Caesar Shift, Polybius Square, or Substitution Cipher.

[Live Preview](https://ryandavidmercado.github.io/Decoder-Ring/)

## Use
* Caesar Shift: The user inputs a message for encode or decode, along with the number of characters (between 1 and 25) to shift the alphabet by. The message is then encoded or decoded according to the provided character shift.
* Polybius Square: The user inputs a message for encode or decode. The message is then processed using a standard Polybius Square.
* Substitution Cipher: The user inputs a message for encode or decode, along with a 26-character alphabet that the standard A-Z alphabet will be mapped to. The message is processed according to the provided alphabet.

All inputs are validated against the constraints of the cipher (for instance, a Polybius decode must contain only valid Polybius digits, while a substitution cipher alphabet must contain 26 unique characters). The user is warned should these constraints not be fulfilled upon submit.

## Purpose
Built to demonstrate use of several key development practices:
* Unit testing with Mocha and Chai
* An understanding of Node module exports and functionality, and
* A proficiency in complex algorithmic work

## Lessons Learned
Building the application with a tests-first workflow demonstrated the benefits of validating code against unit tests. While naive implementations of the ciphers provided seemingly correct results, the comprehensive suite of unit tests quickly demonstrated these implementations' failure to account for many edge cases, including invalid inputs for messages and cipher parameters. This workflow enabled rapid iteration of the implementations, ensuring a consistent user experience.

## Tech Stack
* HTML/CSS/JS
* Mocha
* Chai
* Bootstrap
