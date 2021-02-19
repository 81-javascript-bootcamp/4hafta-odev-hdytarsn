function sortItemsByKeyAndType(items, key, type = "number") {
    if (type == "string") {
        return items.map(items => items[key]).sort();
    } else {
        return items.sort((a, b) => a[key] - b[key]).map(items => items[key]);
    }
}

function getItemsWithCount(items, key, type) {
    let counts = {};
    sortItemsByKeyAndType(items, key, type).forEach(function(item) { counts[item] = (counts[item] || 0) + 1; });
    return counts;
}

export const fillYearFilter = (movies) => {
    const $yearFiltersEl = document.getElementById('filterYears');
    const sortedYearsWithCount = getItemsWithCount(movies, 'year', "number");
    Object.keys(sortedYearsWithCount).forEach(year => {
        $yearFiltersEl.innerHTML +=
            `<div class="form-section">
                <div class="filter-value">
                    <input class="form-check-input" type="radio" name="yearFilter" id="${'year_'+year}" value="${year}">
                    <label class="form-check-label" for="${'year_'+year}"> ${year}</label>
                </div>
                <div class="tag">
                ${sortedYearsWithCount[year]} ${sortedYearsWithCount[year]>1?'Movies':'Movie'}
                </div>
            </div>`;
    });
}

export const fillGenreFilter = (movies) => {
    const $genreFiltersEl = document.getElementById('filterGenres');
    const genresWithCount = getItemsWithCount(movies, 'genre', 'string');
    Object.keys(genresWithCount).forEach(genre => {
        $genreFiltersEl.innerHTML +=
            `<div class="form-section">
                <div class="filter-value">
                    <input class="form-check-input" type="checkbox" name="genreFilter" id="${'genre_'+genre}" value="${genre}">
                    <label class="form-check-label" for="${'genre_'+genre}"> ${genre}</label>
                </div>
                <div class="tag">
                ${genresWithCount[genre]} ${genresWithCount[genre]>1?'Movies':'Movie'}
                </div>
            </div>`;
    });
}