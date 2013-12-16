/* 
 * First we start off with the closure 
 * Notice that we pass in $ to the closure? 
 * This is so that we can use $ as an alias to jQuery 
 */ (function ($) {

    /* First line defines the name of your widget */
    $.widget("ui.ComboMe", {
        options: {
            value: '',
            startValue: '',
            text: '',
            cssSelected: {
                "font-weight": "bold"
            },
            cssNormal: {
                "font-weight": "normal"
            }
        },
        _setOption: function (key, value) {
            //    console.log(this.options.cssSelected);
            this._super(key, value);
            //console.log(this.options.cssSelected);
        },
        _create: function () {
            var self = this;

            self.options.startValue = self.options.value;
            
            // create the jQuery button with dropdown menu.
            self._createCombo();

            // capture the original starting values.
            //self.options.value = self.element.data("value");            
            self.options.text = $.trim(self.element.find("span:first").html());
            //console.log(self.element.parent().next().find("li:first"));
            //self.options.cssNormal = self.element.parent().next().find("li:first").css();
            return self;
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
                    var currentVal = bt.data("value")

                    // only change the text if the value is different.
                    if (currentVal != clickValue) {
                        self._select($(this).parent(), clickValue, clickText);
                        //bt.data("value", clickValue);
                        //bt.find("span").text(clickText);
                        bt.trigger("changed", [clickValue, clickText]);
                    }
                });
            });
        },
        _select: function (li, value, text) {
            var bt = this.element;
            var menu = $(bt).parent().next();
            
            bt.find("span").text(text);

            if (this.options.value !== "") {

                var anchorCurrent = menu.find('li:has(a[data-value="' + this.options.value + '"])').find('a:first');
                anchorCurrent.css(this.options.cssNormal);
            }

            var anchor = li.find('a:first');
            anchor.css(this.options.cssSelected);

            //var d=this.options["cssSelected"];
            //console.log(d);
            //var d={color:"red"};
            //$(anchor).css( d );
            //$(anchor).css( this.options.cssSelected );
            this.options.value = value;
        },
        setSelected: function (value) {
            var bt = this.element;
            var menu = $(bt).parent().next();

            if( value === null || value === '' ) {
                this.reset();
                return;   
            }

            var liMatch = menu.find('li:has(a[data-value="' + value + '"])');

            var text = $.trim(liMatch.text());

            if (liMatch.length) {
                //console.log( text );
                this._select(liMatch, value, text);
            }
        },
        reset: function () {
            /* 
             * This function is designed to be called using "$('#elementId').widgetName('myPublicFunction')" 
             */
            // reset the text & value to the original starting values.
            var bt = this.element;
            //$(bt).data("value", this.options.value);
            bt.find("span").html(this.options.text);
            this.options.value = this.options.startValue;
            console.log(this.options.value);
        },

        /* 
         * It is a good idea to write your own destroy function. The idea behind this is to remove any dom 
         * changes you have made, or any variables you have left lying around. 
         * jQuery will deal with removing the instance of the plugin. 
         */
        destroy: function () {}
    });
})(jQuery);
