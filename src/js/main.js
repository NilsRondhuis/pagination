import liNewsTemplate from '../templates/li-news.hbs';
import NewsApiService from './partials/news-service';

const newsApiService = new NewsApiService();

const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('.input'),
    list: document.querySelector('.list'),
    loadBtn: document.querySelector('.btn-load'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoad);


function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.query.value;
    newsApiService.resetPage();
    // ресет делается при сабмите формы
    // на методе класса збрасывает на 1

    newsApiService.fetchArticles().then(appendArticlesMarkup);
    e.currentTarget.reset();
}

function onLoad() {
    newsApiService.fetchArticles();
}

function appendArticlesMarkup(articles) {
    refs.list.insertAdjacentHTML('beforeend', liNewsTemplate(articles));
}

function clearArticlesContainer() {
    refs.list.innerHTML = '';
}

