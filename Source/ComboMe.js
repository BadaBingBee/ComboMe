/* 
 * First we start off with the closure 
 * Notice that we pass in $ to the closure? 
 * This is so that we can use $ as an alias to jQuery 
 */ (function ($) {

    /* First line defines the name of your widget */
    $.widget("ui.ComboMe", {
        options: {
            value: '',
            text: ''
        },
        _create: function () {
            var self = this;
            
            // create the jQuery button with dropdown menu.
            self._createCombo();
            
            // capture the original starting values.
            self.options.value = self.element.data("value");
            self.options.text = self.element.find("span:first").html();
        },
        _createCombo: function () {
            var self = this;
            var ele = this.element;
            var bt = $(ele); // get the button
            var menu = $(ele).parent().next(); // get the menu (ie the UL)

            ele.button({ // give the button the down arrow.
                text: true,
                icons: {
                    secondary: "ui-icon-triangle-1-s"
                }
            })
                .click(function () {
                //var bt = $(this); // get the button
                //var menu = $(this).parent().next(); // get the menu (the UL)
                menu.width(bt.width() - 3); // set the menu width to match the button width

                // styling        
                menu.css("position", "absolute");

                // position the menu
                menu.show().position({
                    my: "left top",
                    at: "left bottom",
                    of: this
                });
                // handle hiding the menu
                $(document).one("click", function () {
                    menu.hide();
                });
                return false;
            })
                .parent()
                .buttonset()
                .next()
                .hide()
                .menu();

            // for every anchor in the menu bind click to update the button text with the anchor text.
            menu.find("li").each(function (index) {
                var link = $(this).find("a");
                link.bind("click", function () {
                    var clickValue = $(this).data("value");
                    var clickText = $(this).text();
                    //var currentVal = bt.find("span:first").text();
                    var currentVal = bt.data("value");
                    
                    // only change the text if the value is different.
                    if (currentVal != clickValue) {
                        self._select( this, clickValue, clickText );                        
                        //bt.data("value", clickValue);
                        //bt.find("span").text(clickText);
                        bt.trigger("changed", [clickValue, clickText]);
                    }
                });
            });
        },
        _select: function (li, value, text) {
            var bt = this.element;  
            bt.data("value", value);
            bt.find("span").text(text);   
        },
        setSelected: function (value) {
            var bt = this.element;  
            var menu = $(bt).parent().next();
            //console.log(menu);
            //bt.data("value", value);

            //var liMatch = $('li:has(a[data-value="' +value+ '"])');
            var liMatch = menu.find('li:has(a[data-value="' +value+ '"])');
            var text = $.trim( liMatch.text() );
            
            if ( liMatch.length ) {
                //console.log( text );
                this._select( liMatch, value, text);
            }
                     
        },
        reset: function () {
            /* 
             * This function is designed to be called using "$('#elementId').widgetName('myPublicFunction')" 
             */
            // reset the text & value to the original starting values.
            var bt = this.element;                        
            $(bt).data("value", this.options.value);
            bt.find("span").html(this.options.text);
        },

        /* 
         * It is a good idea to write your own destroy function. The idea behind this is to remove any dom 
         * changes you have made, or any variables you have left lying around. 
         * jQuery will deal with removing the instance of the plugin. 
         */
        destroy: function () {}
    });
})(jQuery);
