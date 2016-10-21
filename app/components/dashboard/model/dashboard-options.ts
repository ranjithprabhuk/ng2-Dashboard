
import {SidebarOptions} from './sidebar-options';
import {ScreenSize} from './screen-size';
import {Colors} from './colors';
import {BoxWidget} from './box-widget';
import {ChatOptions} from './chat-options';

export class DashboardOptions {

  //Add slimscroll to navbar menus
  //This requires you to load the slimscroll plugin
  //in every page before app.js
  navbarMenuSlimscroll:boolean= true;
  navbarMenuSlimscrollWidth: string = "3px"; //The width of the scroll bar
  navbarMenuHeight: "200px"; //The height of the inner menu


  //General animation speed for JS animated elements such as box collapse/expand and
  //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
  //'fast', 'normal', or 'slow'
  animationSpeed:number = 500;
  //Sidebar push menu toggle button selector
  sidebarToggleSelector:any =  "[data-toggle='offcanvas']";
  //Activate sidebar push menu
  sidebarPushMenu: boolean = true;
  //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
  sidebarSlimScroll: boolean =  true;


  //Enable sidebar expand on hover effect for sidebar mini
  //This option is forced to true if both the fixed layout and sidebar mini
  //are used together
  sidebarExpandOnHover: boolean= false;
  //BoxRefresh Plugin
  enableBoxRefresh: boolean =  true;
  //Bootstrap.js tooltip
  enableBSToppltip:boolean= true;
  BSTooltipSelector:any= "[data-toggle='tooltip']";


  //Enable Fast Click. Fastclick.js creates a more
  //native touch experience with touch devices. If you
  //choose to enable the plugin, make sure you load the script
  //before AdminLTE's app.js
  enableFastclick:boolean= false;
  //Control Sidebar Options
  enableControlSidebar:boolean= true;
  controlSidebarOptions: any = new SidebarOptions();


  //Box Widget Plugin. Enable this plugin
  //to allow boxes to be collapsed and/or removed
  enableBoxWidget:boolean =true;
  //Box Widget plugin options
  boxWidgetOptions: any = new BoxWidget();
  //Direct Chat plugin options
  directChat: any = new ChatOptions();
  //Define the set of colors to use globally around the website
  colors:any = new Colors();


  //The standard screen sizes that bootstrap uses.
  //If you change these in the variables.less file, change
  //them here too.
  screenSizes: any = new ScreenSize();
}