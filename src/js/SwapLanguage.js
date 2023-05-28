import Base from './_base-controller';
export default class SwapLanguage extends Base {
    
    _init() {
        this.$wrapper = $('[data-js="lang-switcher"]');
        
        return !!this.$wrapper;
    }
    
    _bind() {
        this._bindTo(this.$wrapper, 'click', (e) => {
            let lang = this.$wrapper.find('input:checked').val();
            if(lang === 'ru') {
                document.location.href = '/';
            } else {
                document.location.href = '/index.en.html';
            }
        });
        
        return true;
    }
}
