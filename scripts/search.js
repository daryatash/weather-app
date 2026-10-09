export const renderSearch = (onSearch, onSelect) => {
    
    const searchInput = document.getElementById("search");
    const clearButton = document.getElementById("search-clear-button");
    const searchForm = document.querySelector(".search");
    const searchDropdown = document.querySelector(".search__dropdown")

    let timer = null
    let controller = null
    const cache = new Map()

    const onClearInput = () => {
        searchInput.value = "";
        searchInput.focus();
        hideDropdown()
    };

    const hideDropdown = () => {
        searchDropdown.hidden = true
        searchDropdown.innerHTML = ''
    }

    const selectItem = (li) => {
        const item = {
            lat: Number(li.dataset.lat),
            lon: Number(li.dataset.lon),
            name: li.dataset.name,
        }

        if (!Number.isFinite(item.lat) || !Number.isFinite(item.lon)) return

        onSelect(item)
        searchInput.value = ''
        hideDropdown()
    }

    const moveInList = (direction) => {
        const items = [...searchDropdown.querySelectorAll('.search__dropdown-item:not(.search__dropdown-item--not-found)')]
        if (!items.length) return

        const currentIndex = items.findIndex(li => li.classList.contains('is-active'))
        let nextIndex

        if (currentIndex === -1) {
            nextIndex = direction > 0 ? 0 : items.length - 1
        } else {
            nextIndex = currentIndex + direction

            if (nextIndex < 0) nextIndex = items.length - 1
            if (nextIndex > items.length - 1) nextIndex = 0
        }

        items.forEach(li => li.classList.remove('is-active'))
        items[nextIndex].classList.add('is-active')
        items[nextIndex].scrollIntoView({ block: "nearest" })
    }

    const renderDropdown = (items) => {
        if (!items.length) {
            // hideDropdown()
            searchDropdown.innerHTML = ''
            const li = document.createElement('li')
            li.className = 'search__dropdown-item search__dropdown-item--not-found'
            li.textContent = 'Город не найден'
            searchDropdown.appendChild(li)
            searchDropdown.hidden = false
            return
        }

        searchDropdown.innerHTML = ''

        items.forEach(item => {
            const li = document.createElement('li')
            li.className = 'search__dropdown-item'
            li.textContent = item.label
            li.dataset.lat = item.lat
            li.dataset.lon = item.lon   
            li.dataset.name = item.name
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

            if (controller) {
                controller.abort()
            }
            controller = new AbortController()

            try {
                let results
                if (cache.has(query)) {
                    results = cache.get(query)
                } else {
                    results = await onSearch(query, controller.signal)
                    cache.set(query, results)
                    console.log('cache:', cache)
                }
                renderDropdown(results)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Ошибка поиска:', error)
                }
            }
        }, 300)
     });

    clearButton.addEventListener("click", onClearInput);

    searchDropdown.addEventListener("click", (event) => {
        const li = event.target.closest('.search__dropdown-item')
        if (!li) return

        selectItem(li)
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

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            moveInList(event.key === 'ArrowDown' ? 1 : -1)
        }
    })

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()

        const items = searchDropdown.querySelectorAll('.search__dropdown-item:not(.search__dropdown-item--not-found)')
        if (!items.length) return

        const activeElement = searchDropdown.querySelector('.search__dropdown-item.is-active')
        const target = activeElement ?? items[0]

        selectItem(target)
    });
}