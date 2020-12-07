const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = `19407988-59f043c10a1418e0b30b11e8d`;

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
         return fetch(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                this.incrementPage();
                return response.hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;        
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}







