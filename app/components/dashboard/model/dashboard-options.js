"use strict";
var sidebar_options_1 = require('./sidebar-options');
var screen_size_1 = require('./screen-size');
var colors_1 = require('./colors');
var box_widget_1 = require('./box-widget');
var chat_options_1 = require('./chat-options');
var DashboardOptions = (function () {
    function DashboardOptions() {
        //Add slimscroll to navbar menus
        //This requires you to load the slimscroll plugin
        //in every page before app.js
        this.navbarMenuSlimscroll = true;
        this.navbarMenuSlimscrollWidth = "3px"; //The width of the scroll bar
        //General animation speed for JS animated elements such as box collapse/expand and
        //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
        //'fast', 'normal', or 'slow'
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
        //choose to enable the plugin, make sure you load the script
        //before AdminLTE's app.js
        this.enableFastclick = false;
        //Control Sidebar Options
        this.enableControlSidebar = true;
        this.controlSidebarOptions = new sidebar_options_1.SidebarOptions();
        //Box Widget Plugin. Enable this plugin
        //to allow boxes to be collapsed and/or removed
        this.enableBoxWidget = true;
        //Box Widget plugin options
        this.boxWidgetOptions = new box_widget_1.BoxWidget();
        //Direct Chat plugin options
        this.directChat = new chat_options_1.ChatOptions();
        //Define the set of colors to use globally around the website
        this.colors = new colors_1.Colors();
        //The standard screen sizes that bootstrap uses.
        //If you change these in the variables.less file, change
        //them here too.
        this.screenSizes = new screen_size_1.ScreenSize();
    }
    return DashboardOptions;
}());
exports.DashboardOptions = DashboardOptions;
//# sourceMappingURL=dashboard-options.js.map