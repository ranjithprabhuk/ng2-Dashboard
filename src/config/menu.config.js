"use strict";
var MenuConfig = (function () {
    function MenuConfig() {
        //Add slimscroll to navbar menus
        //This requires you to load the slimscroll plugin
        //in every page before app.js
        this.navbarMenuSlimscroll = true;
        this.navbarMenuSlimscrollWidth = "3px"; //The width of the scroll bar
        this.publicnavbarMenuHeight = "200px"; //The height of the inner menu
        //General animation speed for JS animated elements such as box collapse/expand and
        //sidebar treeview slide up/down. This options accepts an integer as milliseconds;
        //'fast'; 'normal'; or 'slow'
        this.animationSpeed = 500;
        //Sidebar push menu toggle button selector
        this.sidebarToggleSelector = "[data-toggle='offcanvas']";
        //Activate sidebar push menu
        this.sidebarPushMenu = true;
        //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
        this.sidebarSlimScroll = true;
        //Enable sidebar expand on hover effect for sidebar mini
        //This option is forced to true if both the fixed layout and sidebar mini
        //are used together
        this.sidebarExpandOnHover = false;
        //BoxRefresh Plugin
        this.enableBoxRefresh = true;
        //Bootstrap.js tooltip
        this.enableBSToppltip = true;
        this.BSTooltipSelector = "[data-toggle='tooltip']";
        //Enable Fast Click. Fastclick.js creates a more
        //native touch experience with touch devices. If you
        //choose to enable the plugin; make sure you load the script
        //before AdminLTE's app.js
        this.enableFastclick = false;
        //Control Sidebar Options
        this.enableControlSidebar = true;
        this.controlSidebarOptions = {
            //Which button should trigger the open/close event
            toggleBtnSelector: "[data-toggle='control-sidebar']",
            //The sidebar selector
            selector: ".control-sidebar",
            //Enable slide over content
            slide: true
        };
        //Box Widget Plugin. Enable this plugin
        //to allow boxes to be collapsed and/or removed
        this.enableBoxWidget = true;
        //Box Widget plugin options
        this.boxWidgetOptions = {
            boxWidgetIcons: {
                //Collapse icon
                collapse: 'fa-minus',
                //Open icon
                open: 'fa-plus',
                //Remove icon
                remove: 'fa-times'
            },
            boxWidgetSelectors: {
                //Remove button selector
                remove: '[data-widget="remove"]',
                //Collapse button selector
                collapse: '[data-widget="collapse"]'
            }
        };
        //Direct Chat plugin options
        this.directChat = {
            //Enable direct chat by default
            enable: true,
            //The button to open and close the chat contacts pane
            contactToggleSelector: '[data-widget="chat-pane-toggle"]'
        };
        //Define the set of colors to use globally around the website
        this.colors = {
            lightBlue: "#3c8dbc",
            red: "#f56954",
            green: "#00a65a",
            aqua: "#00c0ef",
            yellow: "#f39c12",
            blue: "#0073b7",
            navy: "#001F3F",
            teal: "#39CCCC",
            olive: "#3D9970",
            lime: "#01FF70",
            orange: "#FF851B",
            fuchsia: "#F012BE",
            purple: "#8E24AA",
            maroon: "#D81B60",
            black: "#222222",
            gray: "#d2d6de"
        };
        //The standard screen sizes that bootstrap uses.
        //If you change these in the variables.less file; change
        //them here too.
        this.screenSizes = {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        };
    }
    return MenuConfig;
}());
exports.MenuConfig = MenuConfig;
//# sourceMappingURL=menu.config.js.map