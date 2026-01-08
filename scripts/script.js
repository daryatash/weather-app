import { initSearch } from './search.js'
import { renderMeteoData} from './weather.js'

document.addEventListener("DOMContentLoaded", function () {
  initSearch();
  renderMeteoData();
});
