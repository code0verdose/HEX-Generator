const titleNode = document.querySelector(".hex-title");
const historyTrackNode = document.querySelector(".history-track");

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

const generationsHistory =
  JSON.parse(sessionStorage.getItem(SESSION_HISTORY_KEY)) ?? [];

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

function updateFavicon(hexColor) {
  const favicon = document.getElementById("favicon");

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="50" fill="${hexColor}" />
    </svg>
  `;

  const svgDataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;

  favicon.href = svgDataUri;
}

function updateHistory(hex, negativeHex) {
  const historyObject = {
    hex,
    negativeHex,
    timestamp: Date.now(),
  };

  generationsHistory.push(historyObject);
  sessionStorage.setItem(
    SESSION_HISTORY_KEY,
    JSON.stringify(generationsHistory)
  );

  renderHistory();
}

function createCard({ hex, negativeHex }) {
  const cardNode = document.createElement("div");
  cardNode.className = "his-card";

  cardNode.innerHTML = `<p class="his-text" style="background: ${hex}"><strong>${hex.toUpperCase()}</strong></p>
                        <p class="his-text" style="background: ${negativeHex}"><strong>${negativeHex.toUpperCase()}</strong></p>`;

  return cardNode;
}

function renderHistory() {
  historyTrackNode.innerHTML = "";
  generationsHistory.forEach((el) => {
    const historyCardNode = createCard(el);
    historyTrackNode.append(historyCardNode);
  });
}

function renderBody() {
  const hex = generateHex();
  document.body.style.backgroundColor = hex;

  // Получение негативного цвета
  const negativeHex = getNegativeColor(hex);

  titleNode.textContent = hex;
  titleNode.style.color = negativeHex;

  updateHistory(hex, negativeHex);

  document.title = `${hex} - HEX Generator`;
  updateFavicon(hex);
}

renderBody();

document.body.addEventListener("click", renderBody);
