$.fn.ComboMe = function() {
    
    this.button({    // give the button the down arrow.
        text: true,
        icons: {secondary: "ui-icon-triangle-1-s"}
    })
    .click(function() {   
        var bt = $(this);                        // get the button
        var menu = $( this ).parent().next();    // get the menu (the UL)
        menu.width( bt.width()-3 );              // set the menu width to match the button width
        
        // styling        
        menu.css("position", "absolute");

        // for every anchor in the menu bind click to update the button text with the anchor text.
        menu.find("li").each(function( index ) {
            var link = $( this ).find("a");
            link.bind( "click", function() {
                bt.find("span").text( $(this).text() );
            });
        });        
        
        // position the menu
        menu.show().position({
            my: "left top",
            at: "left bottom",
            of: this
        });
        // handle hiding the menu
        $( document ).one( "click", function() {
           menu.hide();
        });
        return false;
    })
    .parent()
    .buttonset()
    .next()
    .hide()
    .menu();
};
