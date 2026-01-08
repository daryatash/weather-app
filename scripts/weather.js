import { meteoData } from './data.js'

export const renderMeteoData = () => {
  const cardsList = document.querySelector(".cards");
  cardsList.innerHTML = "";

  meteoData.forEach((card) => {
    const cardsItem = document.createElement("li");

    cardsItem.className = "cards__item";

    const progressBarValue = (card.more.progressValue - card.more.progressMin) / (card.more.progressMax - card.more.progressMin) * 100

    cardsItem.innerHTML = `
            <h3 class="cards__item-title">${card.title}</h3>
            <img src="${card.icon}" alt="" class="cards__item-icon" width="32" height="32">
            <p class="cards__item-value">${card.value}</p>
            <div class="cards__item-more">
                ${
                  card.more.progressBar
                    ? `<div class="cards__item-progress progress">
                            <div class="progress__bar ${
                                card.title === "Давление"
                                  ? "progress__bar--pressure"
                                  : ""
                              }" style="--indicator-position: ${progressBarValue}%">
                            </div>
                            <div class="progress__indicator" style="--indicator-position: ${progressBarValue}%; left: ${progressBarValue}%"></div>
                        </div>`
                    : ""
                }
                ${
                  card.more.secondDescription
                    ? `<div class="cards__item-descriptions">
                            <div><p>${card.more.firstDescription}</p></div>
                            <div><p>${
                              card.more.secondDescription
                                ? card.more.secondDescription
                                : ""
                            }</p></div>
                        </div>`
                    : `<p class="cards__item-description">
                            ${card.more.firstDescription}
                        </p>`
                }
            </div>
        `;
    cardsList.appendChild(cardsItem);
  });
};