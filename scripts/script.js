import { initSearch } from './search.js'
import { renderMeteoData} from './weather.js'
import { tabs } from './tabs.js'
import { renderTwentyFourHoursData } from './twentyFourHoursForecast.js'
import { renderFiveDaysData } from './fiveDaysForecast.js'

document.addEventListener("DOMContentLoaded", function () {
  initSearch();
  renderMeteoData();
  tabs();
  renderTwentyFourHoursData();
  renderFiveDaysData();
});
