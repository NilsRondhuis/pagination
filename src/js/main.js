import liNewsTemplate from '../templates/li-news.hbs';
import NewsApiService from './partials/news-service';

const newsApiService = new NewsApiService();

const refs = {
    form: document.querySelector('.form'),
    input: document.querySelector('.input'),
    list: document.querySelector('.list'),
    loadBtn: document.querySelector('.btn-load'),
    spinner: document.querySelector('.spinner'),
    textcontentBtnLoad: document.querySelector('.textcontent'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadButton);


function onSearch(e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.query.value;
    if (newsApiService.query === '') {
        return;
    }
    newsApiService.resetPage();
    // ресет делается при сабмите формы
    // на методе класса збрасывает на 1

    clearArticlesContainer()
    // при сабмите формы делается очистка
    // контейнера, когда вводишь запрос на
    // новую новость

    refs.loadBtn.classList.remove('is-hidden');
    refs.textcontentBtnLoad.textContent = 'Загружаю';
    refs.spinner.classList.remove('is-hidden');
    // при сабмите формы появляется кнопка
    // и появляется спиннер загрузки
    // так же при сабмите появляется текст
    // что загружает

    newsApiService.fetchArticles().then(article => {
        appendArticlesMarkup(article);
        refs.spinner.classList.add('is-hidden');
        // при успешном запроссе скрывается спиннер

        refs.textcontentBtnLoad.textContent = 'Загрузить еще';
        // при успешном пароссе текст меняется
    });
    e.currentTarget.reset();
}

refs.loadBtn.classList.add('is-hidden')
// кнопка скрыта изначально

function onLoadButton() {
    refs.spinner.classList.remove('is-hidden');
    // при клике загрузить еще появляется спиннер

    refs.textcontentBtnLoad.textContent = 'Загружаю';
    // при клике на кнопку появляется такой текст

    newsApiService.fetchArticles().then(article => {
        appendArticlesMarkup(article);
        refs.spinner.classList.add('is-hidden');
        // при успешном запроссе скрывается спиннер

        // при успешном запроссе меняется текст
        refs.textcontentBtnLoad.textContent = 'Загрузить еще';
    });
}

function appendArticlesMarkup(articles) {
    refs.list.insertAdjacentHTML('beforeend', liNewsTemplate(articles));
}

function clearArticlesContainer() {
    refs.list.innerHTML = '';
}

