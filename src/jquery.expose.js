(function($){
    
    $.fn.extrapose = function(options) {
        
        var exposed = [];
        
        var defaults = {
            context: $('body'),
            overlay: {}
        };
        
        var overlay = {
            elt: null,
            opened: false,
            context: null,
            options: {},
            defaults: {
                closeOnClick: true,
                color: "#000",
                opacity: 0.8,
                zindex: 1050,
                class: 'overlay'
            },
            create: function(context, options) {
                var that = this;
                this.options = $.extend({}, this.defaults, options);
                this.context = context;
                this.elt = $('<div></div>')
                    .addClass(options.class)
                    .css({
                        background: this.options.color,
                        opacity: this.options.opacity,
                        height: '100%',
                        width: '100%',
                        position: 'fixed',
                        display: 'none',
                        'z-index': this.options.zindex,
                        top: 0,
                        left: 0
                    });
                context.append(this.elt);
                if(this.options.closeOnClick){
                    this.elt.on('click', function(){
                       that.close();
                    });
                }
                return this;
            },
            open: function(){
                this.elt.fadeIn();
                this.opened = true;
                return this;
            },
            close: function(){
                this.elt.fadeOut();
                helpers.reset();
                this.opened = false;
                return this;
            }
        };
        
        var helpers = {
            extrapose: function(elt){
                exposed.push({
                    original: elt.clone(),
                    modified: elt.css({
                        position: 'relative', 
                        'z-index': (parseInt(overlay.options.zindex) + 1)
                    })
                });
            },
            reset: function(){
                $.each(exposed, function(index, data){
                    data.modified.replaceWith(data.original);
                });
            }
        };
        
        var options = $.extend(true, {}, defaults, options);
        overlay.create(options.context, options.overlay).open();
        
        return this.each(function() {
            helpers.extrapose($(this));
        });
    };
})(jQuery);