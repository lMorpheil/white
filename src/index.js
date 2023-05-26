window.jQuery = window.$ = require('jquery');

//Плагины
import 'magnific-popup';
import Modal from './js/Modal';
import './css/style.scss';

class App {
    constructor() {
        let modal = new Modal();
        modal._init();
        modal._bind();
    }
}

window.App = new App();
