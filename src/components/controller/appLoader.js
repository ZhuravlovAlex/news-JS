import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '20895cab7fcf421aac3836ee9d760a58', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
