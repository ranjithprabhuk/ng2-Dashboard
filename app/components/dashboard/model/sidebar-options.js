"use strict";
var SidebarOptions = (function () {
    function SidebarOptions() {
        //Which button should trigger the open/close event
        this.toggleBtnSelector = "[data-toggle='control-sidebar']";
        //The sidebar selector
        this.selector = ".control-sidebar";
        //Enable slide over content
        this.slide = true;
    }
    return SidebarOptions;
}());
exports.SidebarOptions = SidebarOptions;
//# sourceMappingURL=sidebar-options.js.map