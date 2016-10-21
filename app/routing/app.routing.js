/*! Angular2-Dashboard app.routing.ts
 * ==================================================
 * All Routing of the application handled here
 *
 * @Author  Ranjithprabhu K
 * @Support <http://www.ranjithprabhu.in>
 * @license MIT <http://opensource.org/licenses/MIT>
 */
"use strict";
//import routing page components
var home_component_1 = require('../components/home/home-component');
var widget_component_1 = require('../components/widgets/widget-component');
var calendar_component_1 = require('../components/calendar/calendar-component');
var form_component_1 = require('../components/form-component/form-component');
exports.DashboardRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'widgets', component: widget_component_1.WidgetComponent },
    { path: 'calendar', component: calendar_component_1.CalendarComponent },
    { path: 'app', component: form_component_1.FormComponent }
];
//# sourceMappingURL=app.routing.js.map