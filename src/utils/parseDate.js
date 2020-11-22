const numbers = {
  primo: 1,
  secondo: 2,
};

const months = {
  gennaio: 1,
  febbraio: 2,
  marzo: 3,
  aprile: 4,
  maggio: 5,
  giugno: 6,
  luglio: 7,
  agosto: 8,
  settembre: 9,
  ottobre: 10,
  novembre: 11,
  dicembre: 12,
};

const re = new RegExp([
  `(?:il\\s*)?`,
  `(\\d+|${Object.keys(numbers).join('|')})`,
  `[- /]+`,
  `(\\d+|${Object.keys(months).join('|')})`,
  `[- /]+`,
  `(\\d+)?\\s*`,
].join(''));

console.log('regexp', re.source);

export default (text) => {
  console.log('parseDate', text);
  const match = text.match(re);
  if (!match) {
    return 'nulla';
  }

  const dayOfMonth = +match[1] || numbers[match[1]];
  const month = +match[2] || months[match[2]];
  let year = +match[3];
  if (isNaN(year)) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const possibleDate = new Date(currentYear, month - 1, dayOfMonth);
    if (possibleDate < now) {
      year = currentYear + 1;
    } else {
      year = currentYear;
    }
  }
  return `${year}-${month}-${dayOfMonth}`;
};
