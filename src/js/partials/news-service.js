import liNewsTemplate from '../../templates/li-news.hbs';

const API_KEY = '4330ebfabc654a6992c2aa792f3173a3';
const BASE_URL = 'http://newsapi.org/v2';
const options = {
  headers: {
    Authorization: API_KEY,
  }
};

const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('.input'),
    list: document.querySelector('.list'),
    loadBtn: document.querySelector('.btn-load'),
};

export default class NewsApiService {

    constructor() {
        this.searchQuery = '';
        this.page = 1; // значение текущей страницы хранит как свойство обьекта
    }

    fetchArticles = () => {
        console.log(this);
        const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

        return fetch(url, options)
        .then(response => response.json())
        .then(articles => {
            this.incrementPage(); 
            // если запрос выполнился успешно
            // увеличть страничку на 1
            // (успешный запросс выполняется если
            // отработал зен)

            return articles;
        });
    }

    incrementPage = () => {
        this.page += 1;
    }

    resetPage = () => {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}