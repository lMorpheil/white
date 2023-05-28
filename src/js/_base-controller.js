/**
 * Дефолтный контроллер
 */
export default class Base {
    
    /**
     * @param options
     */
    constructor(options = {}) {
        
        try {
            this._construct(options);
        } catch (error) {
            console.error(error);
        }
    }
    
    /**
     * Постройка класса
     *
     * @private
     */
    _construct(options = {}) {
        this.options = options;
        this.modules = {};
        
        this.initialized = this._init();
        
        if (this.initialized) {
            this.binded = this._bind();
        }
        
        return this;
    }
    
    /**
     * @returns {boolean}
     */
    _init() {
        return true;
    }
    
    /**
     * @returns {boolean}
     */
    _bind() {
        return true;
    }
    
    /**
     * @param $element
     * @param event_name
     * @param callback
     */
    _bindTo($element, event_name, callback) {
        $element.each((i, e) => {
            let $elem = $(e);
            
            if (! $elem.length || ! event_name) {
                return;
            }
            
            let event = this._parseEventName(event_name);
            
            $elem.off(event).on(event, (e, p) => {
                if ($.isFunction(callback)) {
                    callback(e, p);
                }
            });
        });
    }
    
    /**
     * @param selector
     * @param event_name
     * @param callback
     */
    _liveBindTo(selector, event_name, callback) {
        if (! $.trim(selector) || ! event_name) {
            return;
        }
        
        let event = this._parseEventName(event_name);
        
        $(document, window).off(event, selector).on(event, selector, (e, p) => {
            if ($.isFunction(callback)) {
                callback(e, p);
            }
        });
    }
    
    /**
     * Нормализцует event
     *
     * @param event_name
     * @returns {*}
     */
    _parseEventName(event_name) {
        let split = event_name.split(' '),
            event = `${event_name}.${this.constructor.name}`;
        
        if (split.length > 1) {
            event = [];
            
            $.each(split, (i, e) => {
                event.push(`${e}.${this.constructor.name}`);
            });
            
            event = event.join(' ');
        }
        
        return event;
    }
}
