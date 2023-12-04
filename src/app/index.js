const titleNode = document.querySelector(".hex-title");

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

function generateHex() {
  const res = [];

  for (let i = 0; i < 6; i++) {
    const randomSymbol = Math.floor(Math.random() * dictionaryHex.length);
    res.push(dictionaryHex[randomSymbol]);
  }

  return "#" + res.join("");
}

function getNegativeColor(hexColor) {
  // Преобразование hex в rgb
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Инвертирование цвета
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  // Преобразование обратно в hex
  const invertedHex =
    "#" +
    invertedR.toString(16).padStart(2, "0") +
    invertedG.toString(16).padStart(2, "0") +
    invertedB.toString(16).padStart(2, "0");

  return invertedHex;
}

function renderBody() {
  const hex = generateHex();
  document.body.style.backgroundColor = hex;

  // Получение негативного цвета
  const negativeHex = getNegativeColor(hex);

  titleNode.textContent = hex;
  titleNode.style.color = negativeHex;
}

renderBody();

document.body.addEventListener("click", renderBody);
