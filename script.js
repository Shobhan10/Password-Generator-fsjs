const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  // const textarea = document.createElement("textarea");
  const password = resultEl.textContent;

  if (!password) {
    return;
  }

  // textarea.value = password;
  // document.body.append(textarea);
  // textarea.select();
  // document.execCommand("copy");
  // textarea.remove();

  navigator.clipboard.writeText(password).then(() => {
    alert("Password is copied to clipboard");
  });
});

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.textContent = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let randomPassword = "";

  let checkedCount = lower + upper + number + symbol;

  if (checkedCount === 0) {
    return "";
  }

  for (i = 0; i < length; i += checkedCount) {
    if (lower) {
      randomPassword += randomFunc.lower();
    }
    if (upper) {
      randomPassword += randomFunc.upper();
    }
    if (number) {
      randomPassword += randomFunc.number();
    }
    if (symbol) {
      randomPassword += randomFunc.symbol();
    }
    // if (!lower && !upper && !number && !symbol) {
    //   break;
    // }
  }

  const generatedPassword = randomPassword.slice(0, length);
  return generatedPassword;
}

function getRandomLower() {
  const lowerAlphabets = "abcdefghijklmnopqrstuvwxyz";
  return lowerAlphabets[Math.floor(Math.random() * lowerAlphabets.length)];

  // return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  const upeperAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upeperAlphabets[Math.floor(Math.random() * upeperAlphabets.length)];

  // return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);

  // return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
