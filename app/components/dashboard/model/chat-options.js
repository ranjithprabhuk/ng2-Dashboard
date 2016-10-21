"use strict";
var ChatOptions = (function () {
    function ChatOptions() {
        //Enable direct chat by default
        this.enable = true;
        //The button to open and close the chat contacts pane
        this.contactToggleSelector = '[data-widget="chat-pane-toggle"]';
    }
    return ChatOptions;
}());
exports.ChatOptions = ChatOptions;
//# sourceMappingURL=chat-options.js.map