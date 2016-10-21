/*! Angular2-Dashboard app.routing.ts
 * ==================================================
 * All Routing of the application handled here
 * 
 * @Author  Ranjithprabhu K
 * @Support <http://www.ranjithprabhu.in>
 * @license MIT <http://opensource.org/licenses/MIT>
 */

//import required modules
import {RouterConfig} from '@angular/router';

//import routing page components
import {HomeComponent} from '../components/home/home-component';
import {WidgetComponent} from '../components/widgets/widget-component';
import {CalendarComponent} from '../components/calendar/calendar-component';
import {FormEditorsComponent} from '../components/forms/form-editors-component';
import {FormAdvancedComponent} from '../components/forms/form-advanced-component';
import {FormGeneralComponent} from '../components/forms/form-general-component';

import {FormComponent} from '../components/form-component/form-component';

export const DashboardRoutes:RouterConfig = [
    {path:'',component: HomeComponent},
    {path:'widgets',component: WidgetComponent},
    {path:'calendar',component: CalendarComponent},
    {path:'form-editors',component: FormEditorsComponent},
    {path:'form-advanced',component: FormAdvancedComponent},
    {path:'form-general',component: FormGeneralComponent}
];
