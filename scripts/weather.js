import { meteoData } from './meteoData.js'

export const renderMeteoData = () => {
  const cardsList = document.querySelector(".cards");
  cardsList.innerHTML = "";

  meteoData.forEach((card) => {
    const { title, icon, value, more } = card

    const cardsItem = document.createElement("li");

    cardsItem.className = "cards__item";

    let validProgressValue = more.progressValue

    if (validProgressValue < more.progressMin) {
      validProgressValue = more.progressMin
    }

    if (validProgressValue > more.progressMax) {
      validProgressValue = more.progressMax
    }

    const progressBarValue = (validProgressValue - more.progressMin) / (more.progressMax - more.progressMin) * 100

    cardsItem.innerHTML = `
            <h3 class="cards__item-title"></h3>
            <img src="" alt="" class="cards__item-icon" width="32" height="32">
            <p class="cards__item-value"></p>
            <div class="cards__item-more">
                ${
                  more.progressBar
                    ? `<div class="cards__item-progress progress">
                            <div class="progress__bar ${
                                title === "Давление"
                                  ? "progress__bar--pressure"
                                  : ""
                              }">
                            </div>
                            <div class="progress__indicator"></div>
                        </div>`
                    : ""
                }
                ${
                  more.secondDescription
                    ? `<div class="cards__item-descriptions">
                            <div class="cards__item-first-description"><p></p></div>
                            <div class="cards__item-second-description"><p></p></div>
                        </div>`
                    : `<p class="cards__item-description"></p>`
                }
            </div>
        `;

    cardsItem.querySelector('.cards__item-title').textContent = title
    cardsItem.querySelector('.cards__item-icon').src = icon
    cardsItem.querySelector('.cards__item-value').textContent = value

    if (more.progressBar) {
      const progressBar = cardsItem.querySelector('.progress__bar')
      const indicator = cardsItem.querySelector('.progress__indicator')
      
      progressBar.style.setProperty('--indicator-position', `${progressBarValue}%`);
      indicator.style.setProperty('--indicator-position', `${progressBarValue}%`);
      indicator.style.left = `${progressBarValue}%`;
    }

    if (more.secondDescription) {
      const descriptions = cardsItem.querySelector('.cards__item-descriptions');
      descriptions.children[0].querySelector('p').textContent = more.firstDescription;
      descriptions.children[1].querySelector('p').textContent = more.secondDescription;
    } else {
      cardsItem.querySelector('.cards__item-description').textContent = more.firstDescription;
    }
    
    cardsList.appendChild(cardsItem);
  });
};