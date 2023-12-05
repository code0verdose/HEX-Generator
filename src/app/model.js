const SESSION_HISTORY_KEY = "session_history";

const dictionaryHex = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const getGenerationsHistory = () => {
  return JSON.parse(sessionStorage.getItem(SESSION_HISTORY_KEY)) ?? [];
};

const setGenerationsHistory = (history) => {
  sessionStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(history));
};

const generateHex = () => {
  const res = [];

  for (let i = 0; i < 6; i++) {
    const randomSymbol = Math.floor(Math.random() * dictionaryHex.length);
    res.push(dictionaryHex[randomSymbol]);
  }

  return "#" + res.join("");
};

export {
  dictionaryHex,
  getGenerationsHistory,
  setGenerationsHistory,
  generateHex,
};
