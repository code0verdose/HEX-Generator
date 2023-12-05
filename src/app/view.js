import { createCard } from "./controller.js";

const titleNode = document.querySelector(".hex-title");
const historyTrackNode = document.querySelector(".history-track");

let isFirstRender = true;

const updateFavicon = (hexColor, negativeHexColor) => {
  const favicon = document.getElementById("favicon");

  const halfHeight = 50;
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect x="0" y="0" width="100" height="${halfHeight}" fill="${hexColor}" />
      <rect x="0" y="${halfHeight}" width="100" height="${halfHeight}" fill="${negativeHexColor}" />
    </svg>
  `;

  const svgDataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;

  favicon.href = svgDataUri;
};

const renderHistory = (generationsHistory) => {
  if (isFirstRender) {
    generationsHistory.forEach((el) => {
      const historyCardNode = createCard(el);
      historyTrackNode.appendChild(historyCardNode);
    });
    historyTrackNode.scrollLeft = -historyTrackNode.scrollWidth;
    isFirstRender = false
  } else {
    const latestElement = generationsHistory[generationsHistory.length - 1];
    const historyCardNode = createCard(latestElement);
    historyTrackNode.appendChild(historyCardNode);
    historyTrackNode.scrollLeft = -historyTrackNode.scrollWidth;
  }
};

export { titleNode, updateFavicon, renderHistory };
