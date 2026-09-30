export const renderSearch = (onSearch, onSelect) => {
    
    const searchInput = document.getElementById("search");
    const clearButton = document.getElementById("search-clear-button");
    const searchForm = document.querySelector(".search");
    const searchDropdown = document.querySelector(".search__dropdown")

    let timer = null

    const onClearInput = () => {
        searchInput.value = "";
        searchInput.focus();
        hideDropdown()
    };

    const hideDropdown = () => {
        searchDropdown.hidden = true
        searchDropdown.innerHTML = ''
    }

    const renderDropdown = (items) => {
        if (!items.length) {
            hideDropdown()
            return
        }

        searchDropdown.innerHTML = ''

        items.forEach(item => {
            const li = document.createElement('li')
            li.className = 'search__dropdown-item'
            li.textContent = item.label
            li.dataset.lat = item.lat
            li.dataset.lon = item.lon
            searchDropdown.appendChild(li)
        })

        searchDropdown.hidden = false
    }

    searchInput.addEventListener("input", (event) => {
        clearTimeout(timer)
        const query = event.target.value.trim()
        timer = setTimeout(async () => {
            if (query.length < 2) {
                hideDropdown()
                return
            }
            const results = await onSearch(query)
            renderDropdown(results)
        }, 300)
     });

    clearButton.addEventListener("click", onClearInput);

    searchDropdown.addEventListener("click", (event) => {
        const li = event.target.closest('.search__dropdown-item')
        if (!li) return

        const item = {
            lat: Number(li.dataset.lat),
            lon: Number(li.dataset.lon),
        }

        onSelect(item)
        searchInput.value = ''
        hideDropdown()
    })

    document.addEventListener("click", (event) => {
        if (!searchForm.contains(event.target)) {
            hideDropdown()
        }
    })

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {
            hideDropdown()
        }
    })

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = searchInput.value.trim()
        if (!query) return
        onSearch(query).then(results => {
            if (!results.length) return
            onSelect(results[0])
            searchInput.value = ''
            hideDropdown()
        })
    });
}