function getColorCodeByGender(index) {
    const colors = {
        action: "#dc3545",
        adventure: "#198754",
        biography: "#0d6efd",
        crime: "#664d03",
        drama: "#8d03a7",
        western: "#d43e0f",
        default: "#3f51b5"
    }
    let selectedColor = colors[index] ? colors[index] : colors['default'];
    return selectedColor;
}

export const searchMovieByTitle = (movie, searchValue) => {
    return movie.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
}

export const makeBgActive = (movies, filter) => {
    resetBg();
    movies.forEach((movie) => {
        const movieEl = document.querySelector(`tr[data-id='${movie.id}']`);
        movieEl.style.background = getColorCodeByGender(filter == "genre" ? movie.genre.toLowerCase() : "");
        movieEl.classList.add('selected-movie');
    });

}

function resetBg() {
    document.querySelectorAll("tr").forEach((item) => {
        item.style.background = "transparent";
        item.classList.remove('selected-movie');

    })
}

export const clearFilter = (clearEl, type) => {
    if (type == "form") {
        clearEl.reset();
    } else if ((type == "checkbox" || (type == "radio"))) {
        document.querySelectorAll(`input[name=${clearEl}]`).forEach((el) => {
            el.checked = false;
        })
    }
}