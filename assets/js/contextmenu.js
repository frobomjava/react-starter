$(function($){
    $.contextMenu({
        selector: '.context-menu-one', 
        callback: function(key, options) {
            var m = "clicked: " + key;
            //window.console && console.log(m) || alert(m); 
        },
        items: {
            "Add Column Right": {name: "Add Column Right", icon: "add"},
            "Add Column Left": {name: "Add Column Left", icon: "add"},
            "Delete Column": {name: "Delete Column", icon: "delete"},
            "sep1": "---------",
            "Add Row Right": {name: "Add Row Right", icon: "add"},
            "Add Row Left": {name: "Add Row Left", icon: "add"},
            "Delete Row": {name: "Delete Row", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function(){
                return 'context-menu-icon context-menu-icon-quit';
            }}
        }
    });

    $('.context-menu-one').on('click', function(e){
        console.log('clicked', this);
    })
});