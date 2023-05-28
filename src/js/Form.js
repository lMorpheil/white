import Base      from './_base-controller';
import Inputmask from 'inputmask';

export default class Forms extends Base {
    
    /**
     * Инициализация
     *
     * @returns {boolean}
     */
    _init() {
        this.$forms = $('[data-js="ajax-form"]');
        
        return true;
    }
    
    /**
     * Бинд событий
     *
     * @returns {boolean}
     */
    _bind() {
        
        this.$forms.each((i, el) => {
            this.initForm($(el));
        });
        
        this._bindTo($(window), 'modal:opened', (ev, data) => {
            this.initForm($(data).find('[data-js="ajax-form"]'));
        });
        
        return true;
    }
    
    /**
     * Инициализация формы
     *
     * @param $form
     */
    initForm($form) {
        
        if ( ! $form.length) {
            return;
        }
        
        let $input = $form.find('.input');
        
        this._bindTo($input, 'focus', (e) => {
            let $input = $(e.currentTarget);
            $input.parent().addClass('focused');
            $input.parent().removeClass('error');
        });
        
        this._bindTo($input, 'blur', (e) => {
            let $input = $(e.currentTarget);
            if ($.trim($input.val()) === '') {
                $input.parent().removeClass('focused');
            }
        });
        
        let options = {
            showMaskOnHover: false,
        };
        
        let im = new Inputmask(options);
        im.mask('.input_phone');
        
        this._bindTo($form, 'submit', (ev) => {
            ev.preventDefault();
            this.ajax($(ev.target));
            return false;
        });
    }
    
    /**
     * Отправка формы
     *
     * @param $form
     */
    ajax($form) {
        let phone          = $.trim($form.find('.input_phone').val()),
            isVisiblePhone = $('.form__input').css('display'),
            $submit        = $form.find('[type="submit"]'),
            $input         = $form.find('.input'),
            $submit_text   = $submit.html();
        
        if (isVisiblePhone === 'none') {
            const link     = document.createElement('a'),
                  filename = './assets/catalog.pdf';
            
            link.href     = window.location.href;
            link.download = filename;
            link.click();
            
            return false;
        }
        
        $form.find('.required').removeClass('error');
        $submit.prop('disabled', true);
        $submit.text('Отправка…');
        
        let phoneValidation = phone.toString().replace(/[^0-9]/g, '');
        
        if (((phone !== '') && (phoneValidation.length === 11))) {
            
            $.ajax({
                url: $form.attr('action'),
                type: $form.attr('method'),
                dataType: 'json',
                data: $form.serialize(),
                success: (response) => {
                    
                    const link     = document.createElement('a'),
                          filename = './assets/catalog.pdf';
                    
                    link.href     = window.location.href;
                    link.download = filename;
                    link.click();
                    
                    let result = response.result;
                    
                    if (result) {
                        
                        $input.val('');
                        $input.closest('.form__group').removeClass('focused');
                        
                        $form.trigger('form:done', response);
                    } else {
                        let $placeholder = $form.find('.form__group').get(0);
                        $placeholder.insertAdjacentHTML('afterbegin', `<div class="error">Ошибка</div>`);
                    }
                    
                },
                error: function () {
                    alert('Ой, что-то пошло не так! \r\n Заявку НЕ удалось отправить \r\n Нет сервера');
                    $submit.prop('disabled', false);
                    $submit.html($submit_text);
                },
                complete: function (jqXHR, text_status) {
                    $form.trigger('form:complete', jqXHR, text_status);
                    $submit.prop('disabled', false);
                    $submit.html($submit_text);
                },
            });
        } else {
            setTimeout(function () {
                $form.find('.required').addClass('error');
                $submit.prop('disabled', false);
                $submit.html($submit_text);
            }, 100);
        }
    }
}
