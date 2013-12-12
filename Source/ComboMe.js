(function ( $ ) {
var startingValue = '';

$.widget("nmk.cbMe", {    
    _create: function () {
        this._createButton();
        
        // capture the starting value (eg the placeholder).
        startingValue = this.element.find("span").html();
    },
    // Create a public method.
    reset: function () {
        // reset the value to the original starting value.
        this.element.find("span").html(startingValue);
    },
    // Create a private method.
    _createButton: function () {
        this.element.button({ // give the button the down arrow.
            text: true,
            icons: {
                secondary: "ui-icon-triangle-1-s"
            }
        })
        .click(function () {
            var bt = $(this); // get the button
            var menu = $(this).parent().next(); // get the menu (the UL)
            menu.width(bt.width() - 3); // set the menu width to match the button width

            // styling        
            menu.css("position", "absolute");

            // for every anchor in the menu bind click to update the button text with the anchor text.
            menu.find("li").each(function (index) {
                var link = $(this).find("a");
                link.bind("click", function () {
                    var val = $(this).text();
                    bt.find("span").text(val);
                    bt.trigger("changed", val);
                });
            });

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
    }
});
}( jQuery ));
