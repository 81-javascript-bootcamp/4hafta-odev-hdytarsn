import data from "./data.js";
import { searchMovieByTitle, makeBgActive, clearFilter } from "./helpers.js";
import { fillYearFilter, fillGenreFilter } from "./filters.js";

class MoviesApp {
    constructor(options) {
        const { root, searchInput, searchForm, yearHandler, yearSubmitter, genreHandler, genreSubmitter } = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");
        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
        this.genreHandler = genreHandler;
        this.$genreSubmitter = document.getElementById(genreSubmitter);
    }

    createMovieEl(movie) {
        const { image, title, genre, year, id } = movie;
        return `<tr data-id="${id}"> <div> <td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td> </div> </tr>`
    }

    fillFilters() {
        fillYearFilter(data);
        fillGenreFilter(data);
    }

    fillTable() {
        const moviesHTML = data.reduce((acc, cur) => {
            return acc + this.createMovieEl(cur);
        }, "");
        this.$tbodyEl.innerHTML = moviesHTML;
    }
    getElementByName(name, isMultiple = false) {
        if (isMultiple) {
            return document.querySelectorAll(`input[name='${name}']:checked`);
        } else {
            return document.querySelector(`input[name='${name}']:checked`);
        }
    }

    handleSearch() {
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data.filter((movie) => {
                return searchMovieByTitle(movie, searchValue);
            })
            makeBgActive(matchedMovies);
            clearFilter(this.$searchForm, 'form');
            clearFilter(this.genreHandler, 'checkbox');
            clearFilter(this.yearHandler, 'radio');
        });
    }

    handleYearFilter() {
        this.$yearSubmitter.addEventListener("click", () => {
            const selectedYear = this.getElementByName(this.yearHandler);
            if (!selectedYear) {
                alert('Please choose at least 1 year!')
                return 0;
            }
            const matchedMovies = data.filter((movie) => {
                return movie.year === selectedYear.value;
            });
            makeBgActive(matchedMovies);
            clearFilter(this.$searchForm, 'form');
            clearFilter(this.genreHandler, 'checkbox');
        });
    }

    handleGenreFilter() {
        this.$genreSubmitter.addEventListener("click", () => {
            let genreArr = [];
            this.getElementByName(this.genreHandler, 'multiple').forEach(el => {
                genreArr.push(el.value);
            })
            if (!genreArr[0]) {
                alert('Please choose at least 1 genre!')
            }
            const matchedMovies = data.filter((movie) => {
                return genreArr.includes(movie.genre)
            });
            makeBgActive(matchedMovies, "genre");
            clearFilter(this.$searchForm, 'form');
            clearFilter(this.yearHandler, 'radio');
        });
    }

    init() {
        this.fillTable();
        this.fillFilters();
        this.handleSearch();
        this.handleYearFilter();
        this.handleGenreFilter();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "yearFilter",
    yearSubmitter: "yearSubmitter",
    genreHandler: "genreFilter",
    genreSubmitter: "genreSubmitter"
});

myMoviesApp.init();