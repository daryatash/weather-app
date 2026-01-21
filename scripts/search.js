export const initSearch = () => {
    
    const searchInput = document.getElementById("search");
    const clearButton = document.getElementById("search-clear-button");
    const searchForm = document.querySelector(".search");

    const onClearInput = () => {
        searchInput.value = "";
        searchInput.focus();
    };

    searchInput.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

    clearButton.addEventListener("click", onClearInput);

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });
}