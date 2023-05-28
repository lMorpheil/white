window.jQuery = window.$ = require('jquery');

import '../css/style.scss';

//Плагины
import 'magnific-popup';
//Модули
import Modal        from '../js/Modal';
import Form         from '../js/Form';
import SwapLanguage from '../js/SwapLanguage';

class App {
    constructor() {
        new Modal();
        new Form();
        new SwapLanguage();
    }
}

window.App = new App();
