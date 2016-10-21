"use strict";
var FormData = (function () {
    //construct the data for FormData
    function FormData(name, email, designation, sports) {
        this.name = name;
        this.email = email;
        this.designation = designation;
        this.sports = sports;
    }
    return FormData;
}());
exports.FormData = FormData;
//# sourceMappingURL=form-model.js.map