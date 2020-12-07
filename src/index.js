import './styles.css';
import ImageAPIservise from './js/apiService.js';
import imageTpl from './template/image-card.hbs';

const searchFormRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('[data-action="load-more"]');
const galleryContainerRef = document.querySelector('.gallery');

const imageApiService = new ImageAPIservise();

searchFormRef.addEventListener('submit', onSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();

    
    imageApiService.query = event.currentTarget.elements.query.value;

    if (imageApiService.query === ``) {
        return alert('Введите название изображения');
    };

    loadMoreBtnRef.classList.remove('visually-hidden');
    imageApiService.resetPage();
    clearGalleryContainer();
    imageApiService.fetchImages().then(appendImageMarkup);
    
} 

function onLoadMore() {
    imageApiService.fetchImages().then(appendImageMarkup).then(scrollPage);
}

function appendImageMarkup(imageCard) {
    galleryContainerRef.insertAdjacentHTML('beforeend', imageTpl(imageCard))
}

function clearGalleryContainer() {
    galleryContainerRef.innerHTML = '';
}

// function scrollPage() {
//     const { y } = galleryContainerRef.getBoundingClientRect();
//     const screenHeight = document.documentElement.clientHeight;
//     window.scrollTo({
//         left: 0,
//         top: screenHeight - y - 150,
//         behavior: 'smooth'
//     })
// }
function scrollPage() {
    let value = document.body.scrollHeight;
     setTimeout(() => {
      window.scrollTo({
        top: value,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
}