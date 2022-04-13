const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is the phrase that you want to translate?\n", translate);

rl.on("close", function () {
  process.exit(0);
});

function findPrefixAndStem(word) {
  const lowerCaseVowels = ["a", "e", "i", "o", "u", "y"];
  const vowels = [
    ...lowerCaseVowels,
    ...lowerCaseVowels.map((letter) => letter.toUpperCase()),
  ];
  let prefix = "";
  let stem = "";
  let i = 0;
  for (i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      break;
    }
    prefix += word[i];
  }
  for (let j = i; j < word.length; j++) {
    stem += word[j];
  }
  return { prefix, stem };
}

function separate(whole) {
  return whole.split(" ");
}

function fixLetterCase(stem, prefix, wordPosition) {
  stem = stem.toLowerCase();
  let firstLetter = stem[0];
  if (wordPosition === 0) {
    firstLetter = firstLetter.toUpperCase();
  }
  let oldStem = stem.substring(1, stem.length);
  stem = firstLetter;
  for (let i = 0; i < oldStem.length; i++) {
    stem += oldStem[i];
  }

  return stem + prefix.toLowerCase();
}

function translate(input) {
  let phrase = input;
  let output = "";

  const separated = separate(phrase);
  for (let i = 0; i < separated.length; i++) {
    const word = separated[i];
    let { prefix, stem } = findPrefixAndStem(word);
    output += fixLetterCase(stem, prefix, i) + "ay" + " ";
  }
  console.log(output);
  rl.close();
}