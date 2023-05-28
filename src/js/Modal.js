import Base from './_base-controller';

export default class Popups extends Base {
    
    _init() {
        
        this.$popup = $('[data-js="popup"]');
        
        return !! this.$popup.length;
    }
    
    _bind() {
        
        this.$popup.each((i, el) => {
            let popup_target = $(el).data('js-popup'),
                $target      = $(`#${popup_target}`);
            
            $(el).magnificPopup({
                items: [
                    {
                        src: '#' + popup_target,
                        type: 'inline',
                    },
                ],
                removalDelay: 300,
                mainClass: 'mfp-fade',
                overflowY: 'scroll',
                callbacks: {
                    beforeOpen: function () {
                        $('html').css('overflow', 'hidden');
                        this.st.mainClass = this.st.el.attr('data-effect');
                    },
                    open: () => {
                        $(window).trigger('modal:opened', $target);
                    },
                    afterClose: () => {
                        $('html').removeAttr('style');
                    },
                },
            });
        });
        
        return !! this.$popup.length;
    }
}
