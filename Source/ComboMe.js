/* 
 * First we start off with the closure 
 * Notice that we pass in $ to the closure? 
 * This is so that we can use $ as an alias to jQuery 
 */  
(function($) {  
  
  /* First line defines the name of your widget */  
  $.widget("ui.ComboMe", {  
    options: {val: ''},  
    _create: function() {  
      var self = this;  
      self._createCombo();
      self.options.val = self.element.find("span:first").html();
    },  
    _createCombo: function() {  

            var ele = this.element;
            var bt = $(ele); // get the button
            var menu = $(ele).parent().next(); // get the menu (the UL)

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
                    var clickVal = $(this).text();
                    var currentVal = bt.find("span:first").text();

                    // only change the text if the value is different.
                    if (currentVal != clickVal) {
                        bt.find("span").text(clickVal);
                        bt.trigger("changed", clickVal);
                    }
                });
            });
    },  
    reset: function() {  
      /* 
       * This function is designed to be called using "$('#elementId').widgetName('myPublicFunction')" 
       */  
        // reset the value to the original starting value.
        this.element.find("span").html(this.options.val);        
    },  
  
    /* 
     * It is a good idea to write your own destroy function. The idea behind this is to remove any dom 
     * changes you have made, or any variables you have left lying around. 
     * jQuery will deal with removing the instance of the plugin. 
     */  
    destroy: function() {}  
  });  
})(jQuery);
