import {
  generateHex,
  getGenerationsHistory,
  setGenerationsHistory,
} from "./model.js";

import {
  titleNode,
  updateFavicon,
  renderHistory,
} from "./view.js";


const createCard = ({ hex, negativeHex }) => {
  const cardNode = document.createElement("div");
  cardNode.className = "his-card";

  cardNode.innerHTML = `<p class="his-text" style="background: ${hex}"><strong style="color: ${negativeHex}">${hex.toUpperCase()}</strong></p>
                        <p class="his-text" style="background: ${negativeHex}"><strong style="color: ${hex}">${negativeHex.toUpperCase()}</strong></p>`;

  return cardNode;
};

const getNegativeColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  const invertedHex =
    "#" +
    invertedR.toString(16).padStart(2, "0") +
    invertedG.toString(16).padStart(2, "0") +
    invertedB.toString(16).padStart(2, "0");

  return invertedHex;
};

const updateHistory = (hex, negativeHex) => {
  const historyObject = {
    hex,
    negativeHex,
    timestamp: Date.now(),
  };

  const generationsHistory = getGenerationsHistory();

  generationsHistory.push(historyObject);
  setGenerationsHistory(generationsHistory);

  renderHistory(generationsHistory);
};

const renderBody = () => {
  const hex = generateHex();
  document.body.style.backgroundColor = hex;

  const negativeHex = getNegativeColor(hex);

  titleNode.textContent = hex;
  titleNode.style.color = negativeHex;

  updateHistory(hex, negativeHex);

  document.title = `${hex} - HEX Generator`;
  updateFavicon(hex, negativeHex);
};

renderBody();

document.body.addEventListener("click", renderBody);

export { createCard };
