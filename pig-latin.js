const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



const getInput = (input) => {
    const lowerCaseVowels = ['a','e','i','o','u','y'];
    const vowels = [...lowerCaseVowels, ...lowerCaseVowels.map((letter) => letter.toUpperCase())]

    let phrase = input;
    let output = '';

    const separate = (whole) => {
        return whole.split(' ');
    }
    
    const findParts = (word) => {
        let prefix = '';
        let stem = '';
        let i = 0;
        for (i = 0; i < word.length; i++) {
            if (vowels.includes(word[i])) {
                break;
            }
            prefix += word[i];
        }
        for (; i < word.length; i++) {
            stem += word[i];
        }
        return {prefix, stem};
    }
    const separated = separate(phrase);
    for (let i = 0; i < separated.length; i++) {
        const word = separated[i];
        let {prefix, stem} = findParts(word);
        stem = stem.toLowerCase();
        let firstLetter = stem[0];
        if (i === 0) {
            firstLetter = firstLetter.toUpperCase()
        } 
        let oldStem = stem.substring(1, stem.length);
        stem = firstLetter;
        for (let i = 0; i < oldStem.length; i++) {
            stem += oldStem[i];
        }
        
        output += stem + prefix.toLowerCase() + 'ay' + ' ';
    }
    console.log(output);
    rl.close();
}

rl.question("What is the phrase that you want to translate?\n", getInput);



rl.on("close", function() {
    process.exit(0);
});