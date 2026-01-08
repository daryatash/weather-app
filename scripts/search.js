export const initSearch = () => {
    
    const searchInput = document.querySelector(".search__input");
    const searchIcon = document.querySelector(".search__icon");
    const clearButton = document.querySelector(".search__clear-button");
    const searchForm = document.querySelector(".search");

    const onFocus = () => {
        clearButton.classList.remove("hidden");
        searchIcon.classList.add("hidden");
    };

    const onBlur = () => {
        if (!searchInput.matches(':focus') && searchInput.value === '') {
            clearButton.classList.add("hidden");
            searchIcon.classList.remove("hidden");
        }
    };

    const onClearInput = () => {
        searchInput.value = "";
        searchInput.focus();
    };

    searchInput.addEventListener("focus", onFocus);    
    searchInput.addEventListener("blur", onBlur);
    searchInput.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

    clearButton.addEventListener("click", onClearInput);

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });
}