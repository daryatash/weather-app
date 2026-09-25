export const renderWeather = (weather) => {
  const weatherBlock = document.querySelector(".weather__info");
  weatherBlock.innerHTML = "";

  weatherBlock.innerHTML = `
    <div class="weather__current">
      <h3 class="weather__city">${weather.city}</h3>
      <span class="weather__date">
        ${weather.day}, <time datetime="${weather.dateISO}">${weather.dateDayAndMonth}</time>
      </span>
      <span class="weather__time">
        <time datetime="${weather.time}">${weather.time}</time>
      </span>
    </div>
    <span class="weather__temperature">
      <span class="visually-hidden">Температура воздуха</span>${weather.temperature}°
    </span>
    <div class="weather__other">
      <div class="weather__details">
        <img
          src="./public/icons/broken-clouds.svg"
          alt=""
          class="weather__icon"
          width="24"
          height="24"
        />
        <span class="weather__condition">${weather.condition}</span>
      </div>
      <span class="weather__perceived-temperature">Ощущается как ${weather.feels_like}°</span>
    </div>
  `
};

export const renderWeatherCards = (cards) => {
  const cardsList = document.querySelector(".cards");
  cardsList.innerHTML = "";

  cards.forEach((card) => {
    const { title, icon, value, more } = card;

    const cardsItem = document.createElement("li");

    cardsItem.className = "cards__item";

    let validProgressValue = more.progressValue;

    if (validProgressValue < more.progressMin) {
      validProgressValue = more.progressMin;
    }

    if (validProgressValue > more.progressMax) {
      validProgressValue = more.progressMax;
    }

    const progressBarValue =
      ((validProgressValue - more.progressMin) /
        (more.progressMax - more.progressMin)) *
      100;

    const pressureTitle = "Давление"

    cardsItem.innerHTML = `
            <h3 class="cards__item-title"></h3>
            <img src="" alt="" class="cards__item-icon" width="32" height="32">
            <span class="cards__item-value"></span>
            <div class="cards__item-more">
                ${
                  more.progressBar
                    ? `<div class="cards__item-progress progress">
                            <div class="progress__bar ${
                              title === pressureTitle
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
                            <div class="cards__item-first-description"><span></span></div>
                            <div class="cards__item-second-description"><span></span></div>
                        </div>`
                    : `<span class="cards__item-description"></span>`
                }
            </div>
        `;

    cardsItem.querySelector(".cards__item-title").textContent = title;
    cardsItem.querySelector(".cards__item-icon").src = icon;
    cardsItem.querySelector(".cards__item-value").textContent = value;

    if (more.progressBar) {
      const progressBar = cardsItem.querySelector(".progress__bar");
      const indicator = cardsItem.querySelector(".progress__indicator");

      progressBar.style.setProperty("--indicator-percentage", `${progressBarValue}%`);
      indicator.style.setProperty("--indicator-percentage", `${progressBarValue}%`);
    }

    if (more.secondDescription) {
      const descriptions = cardsItem.querySelector(".cards__item-descriptions");
      descriptions.children[0].querySelector("span").textContent =
        more.firstDescription;
      descriptions.children[1].querySelector("span").textContent =
        more.secondDescription;
    } else {
      cardsItem.querySelector(".cards__item-description").textContent =
        more.firstDescription;
    }

    cardsList.appendChild(cardsItem);
  });
};
