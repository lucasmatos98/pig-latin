const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("What is the phrase that you want to translate?\n", translatePhrase);

rl.on("close", function () {
    process.exit(0);
});

function findPrefixAndStem(word: string, vowels: string[]) {
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

function separate(whole: string) {
    return whole.split(" ");
}

function fixLetterCase(prefix: string, stem: string, wordPosition: number) {
    stem = stem.toLowerCase();
    let firstLetter = stem[0];
    if (wordPosition === 0 ||(prefix != '' && prefix[0] === prefix[0].toUpperCase())) {
        firstLetter = firstLetter.toUpperCase();
    }
    return { prefix: prefix.toLowerCase(), stem: firstLetter + stem.slice(1) };
}

function findPunctuation(prefix: string, stem: string) {
    const punctuations = [".", ",", "!", "?", ";", ":"];
    let punctuation = '';
    const lastCharacter = stem[stem.length - 1];
    if (punctuations.includes(lastCharacter)) {
        stem = stem.slice(0, stem.length - 1);
        punctuation = lastCharacter;
    }
    return { prefix, stem, punctuation };
}

function defineSuffix(hasNoConsonants: boolean) {
    if (hasNoConsonants) {
        return "yay";
    }
    return 'ay';
}

function hasNoConsonants(prefix: string, stem: string, vowels: string[]) {
    let hasNoConsonants = true;
    const word = prefix + stem;
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (!vowels.includes(letter)) {
            hasNoConsonants = false;
            break;
        }
    }

    return hasNoConsonants;
}

function translateWord(word:string, position:number) {
    const lowerCaseVowels = ["a", "e", "i", "o", "u", "y"];
    const vowels = [
        ...lowerCaseVowels,
        ...lowerCaseVowels.map((letter) => letter.toUpperCase()),
    ];
    let punctuation = '';
    if (hasNumbers(word)) {
        return word;
    }
    let { prefix, stem } = findPrefixAndStem(word, vowels);
    ({ prefix, stem } = fixLetterCase(prefix, stem, position));
    ({ prefix, stem, punctuation } = findPunctuation(prefix, stem));
    let suffix = defineSuffix(hasNoConsonants(prefix, stem, vowels));
    return stem + prefix + suffix + punctuation;
}

// * NOTE: Here i will consider if any letter is a number so the whole word is a number
function hasNumbers(word: string) {
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (Number.isInteger(Number(letter))) {
            return true;
        }
    }
    return false;
}

function translatePhrase(input: string) {
    let phrase = input;
    let output = "";

    const separated = separate(phrase);
    for (let i = 0; i < separated.length; i++) {
        let word = separated[i];
        output += translateWord(word, i) + " ";
    }

    console.log(output);
    rl.close();
}
