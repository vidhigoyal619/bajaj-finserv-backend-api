const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// function made to check prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
  const { data = [], file_b64 = null } = req.body;

  // made variables for the separating the alphabets and numbers.
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  
  // this is been used to find the highest lowercase alphabet.
  const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
  const highestLowercase = lowercaseAlphabets.sort().pop() || null;

  // It is used to check whether number is prime or not.
  const primeFound = numbers.some((num) => isPrime(Number(num)));

  // to handle different types of file format messages.
  const fileValid = file_b64 ? Buffer.from(file_b64, "base64").toString("base64") === file_b64 : false;
  const fileMimeType = fileValid ? "text/plain" : null; // Simplified MIME type handling
  const fileSizeKB = fileValid ? Buffer.from(file_b64, "base64").length / 1024 : null;

  // this is how the response would look like when user is requesting something in the text box.
  res.status(200).json({
    is_success: true,
    user_id: "vidhi_goyal_098756",
    email: "vidhigoyal@abc.com",
    roll_number: "0827IT211128",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: primeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
