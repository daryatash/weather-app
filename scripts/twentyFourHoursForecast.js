import { twentyFourHoursData } from './data.js'

export const renderTwentyFourHoursData = () => {
  const sliderList = document.querySelector('[data-js-24h]');
  sliderList.innerHTML = "";

  twentyFourHoursData.forEach((item) => {
    const sliderItem = document.createElement("li");

    sliderItem.className = "slider__item";

    sliderItem.innerHTML = `
                <p class="slider__item-time"><time datetime="${item.time}">${item.time}</time></p>
                <img
                    src="${item.iconSrc}" 
                    alt="${item.iconAlt}" 
                    class="slider__item-icon"
                    width="32" height="32"
                >
                <p class="slider__item-degrees">${item.degrees}</p>
        `;
    sliderList.appendChild(sliderItem);
  });
};