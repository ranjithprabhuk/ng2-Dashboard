//import 
import {Component} from '@angular/core';
import {DashboardOptions} from './model/dashboard-options';
import {HeaderComponent} from './header-component';
import {SidebarComponent} from './sidebar-component';
import {RightSidebarComponent} from './right-sidebar-component';
import {FooterComponent} from './footer-component';

import * as $ from 'jquery';
import 'bootstrap';

@Component({
    selector:'dashboard',
    templateUrl:'app/components/dashboard/view/dashboard.html',
    directives :[HeaderComponent,SidebarComponent,RightSidebarComponent,FooterComponent,]
})




export class DashBoardComponent {

    public options:any =new DashboardOptions();


  /* Layout
   * ======
   * Fixes the layout height in case min-height fails.
   *
   * @type Object
   * @usagethis.layout.activate()
   *       this.layout.fix()
   *       this.layout.fixSidebar()
   */
       public layout = {
            activate: function (options) {
            var _this = this;
            var _options = options;
            _this.fix(_options);
            _this.fixSidebar();
            $(".wrapper",window).resize(function () {
                _this.fix(_options);
                _this.fixSidebar();
            });
            },
            fix: function (options) {
            //Get window height and the wrapper height
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            var _options = options;
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
                $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
            } else {
                var postSetWidth;
                if (window_height >= sidebar_height) {
                $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                postSetWidth = window_height - neg;
                } else {
                $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                postSetWidth = sidebar_height;
                }

                //Fix for the control sidebar height
                var controlSidebar = $(_options.controlSidebarOptions.selector);
                if (typeof controlSidebar !== "undefined") {
                if (controlSidebar.height() > postSetWidth)
                    $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }

            }
            },
            fixSidebar: function () {
            //Make sure the body tag has the .fixed class
            if (!$("body").hasClass("fixed")) {
                return;
            } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
                window.console.error("Error: the fixed layout requires the slimscroll plugin!");
            }
            //Enable slimscroll for fixed layout

            }
        };


         /* PushMenu()
        * ==========
        * Adds the push menu functionality to the sidebar.
        *
        * @type Function
        * @usage:this.pushMenu("[data-toggle='offcanvas']")
        */
       public pushMenu :any = {
            activate: function (toggleBtn,options) {

            //Get the Options
            var _options = options;
            //Get the screen sizes
            var screenSizes =_options.screenSizes;

            //Enable sidebar toggle
            $(document).on('click', toggleBtn, function (e) {
                e.preventDefault();

                //Enable sidebar push menu
                if ($(window).width() > (screenSizes.sm - 1)) {
                if ($("body").hasClass('sidebar-collapse')) {
                    $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                } else {
                    $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                }
                }
                //Handle sidebar push menu for small screens
                else {
                if ($("body").hasClass('sidebar-open')) {
                    $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                } else {
                    $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                }
                }
            });

            $(".content-wrapper").click(function () {
                //Enable hide menu when clicking on the content-wrapper on small screens
                if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                $("body").removeClass('sidebar-open');
                }
            });

            //Enable expand on hover for sidebar mini
            if (_options.sidebarExpandOnHover
                || ($('body').hasClass('fixed')
                && $('body').hasClass('sidebar-mini'))) {
                this.expandOnHover(_options);
            }
            },
            expandOnHover: function (options) {
            var _this = this;
            var _options = options;
            var screenWidth =_options.screenSizes.sm - 1;
            //Expand sidebar on hover
            $('.main-sidebar').hover(function () {
                if ($('body').hasClass('sidebar-mini')
                && $("body").hasClass('sidebar-collapse')
                && $(window).width() > screenWidth) {
                _this.expand();
                }
            }, function () {
                if ($('body').hasClass('sidebar-mini')
                && $('body').hasClass('sidebar-expanded-on-hover')
                && $(window).width() > screenWidth) {
                _this.collapse();
                }
            });
            },
            expand: function () {
            $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
            },
            collapse: function () {
            if ($('body').hasClass('sidebar-expanded-on-hover')) {
                $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
            }
            }
        };

        /* Tree()
        * ======
        * Converts the sidebar into a multilevel
        * tree view menu.
        *
        * @type Function
        * @Usage:this.tree('.sidebar')
        */
       public tree = function (menu) {
            var _this = this;
            var animationSpeed =_this.options.animationSpeed;
            $(document).off('click', menu + ' li a')
            .on('click', menu + ' li a', function (e) {
                //Get the clicked link and the next element
                var $this = $(this);
                var checkElement = $this.next();

                //Check if the next element is a menu and is visible
                if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {
                //Close the menu
                checkElement.slideUp(animationSpeed, function () {
                    checkElement.removeClass('menu-open');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    //_this.layout.fix();
                });
                checkElement.parent("li").removeClass("active");
                }
                //If the menu is not visible
                else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
                //Get the parent menu
                var parent = $this.parents('ul').first();
                //Close all open menus within the parent
                var ul = parent.find('ul:visible').slideUp(animationSpeed);
                //Remove the menu-open class from the parent
                ul.removeClass('menu-open');
                //Get the parent li
                var parent_li = $this.parent("li");

                //Open the target menu and add the menu-open class
                checkElement.slideDown(animationSpeed, function () {
                    //Add the class active to the parent li
                    checkElement.addClass('menu-open');
                    parent.find('li.active').removeClass('active');
                    parent_li.addClass('active');
                    //Fix the layout in case the sidebar stretches over the height of the window
                    _this.layout.fix(_this.options);
                });
                }
                //if this isn't a link, prevent the page from being redirected
                if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
                }
            });
        };

        /* ControlSidebar
        * ==============
        * Adds functionality to the right sidebar
        *
        * @type Object
        * @usagethis.controlSidebar.activate(options)
        */
       public controlSidebar:any = {
            //instantiate the object
            activate: function (options) {
                console.log("this>>",this);
            //Get the object
            var _this = this;
            //Get the Options
            var _options = options;
            //Update options
            var o =_options.controlSidebarOptions;
            //Get the sidebar
            var sidebar = $(o.selector);
            //The toggle button
            var btn = $(o.toggleBtnSelector);

            //Listen to the click event
            btn.on('click', function (e) {
                e.preventDefault();
                //If the sidebar is not open
                if (!sidebar.hasClass('control-sidebar-open')
                && !$('body').hasClass('control-sidebar-open')) {
                //Open the sidebar
                _this.open(sidebar, o.slide);
                } else {
                _this.close(sidebar, o.slide);
                }
            });

            //If the body has a boxed layout, fix the sidebar bg position
            var bg = $(".control-sidebar-bg");
            _this._fix(bg);

            //If the body has a fixed layout, make the control sidebar fixed
            if ($('body').hasClass('fixed')) {
                _this._fixForFixed(sidebar);
            } else {
                //If the content height is less than the sidebar's height, force max height
                if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
                _this._fixForContent(sidebar);
                }
            }
            },
            //Open the control sidebar
            open: function (sidebar, slide) {
            //Slide over content
            if (slide) {
                sidebar.addClass('control-sidebar-open');
            } else {
                //Push the content by adding the open class to the body instead
                //of the sidebar itself
                $('body').addClass('control-sidebar-open');
            }
            },
            //Close the control sidebar
            close: function (sidebar, slide) {
            if (slide) {
                sidebar.removeClass('control-sidebar-open');
            } else {
                $('body').removeClass('control-sidebar-open');
            }
            },
            _fix: function (sidebar) {
            var _this = this;
            if ($("body").hasClass('layout-boxed')) {
                sidebar.css('position', 'absolute');
                sidebar.height($(".wrapper").height());
                if (_this.hasBindedResize) {
                return;
                }
                $(window).resize(function () {
                _this._fix(sidebar);
                });
                _this.hasBindedResize = true;
            } else {
                sidebar.css({
                'position': 'fixed',
                'height': 'auto'
                });
            }
            },
            _fixForFixed: function (sidebar) {
            sidebar.css({
                'position': 'fixed',
                'max-height': '100%',
                'overflow': 'auto',
                'padding-bottom': '50px'
            });
            },
            _fixForContent: function (sidebar) {
            $(".content-wrapper, .right-side").css('min-height', sidebar.height());
            }
        };

        /* BoxWidget
        * =========
        * BoxWidget is a plugin to handle collapsing and
        * removing boxes from the screen.
        *
        * @type Object
        * @usagethis.boxWidget.activate()
        *        Set all your options in the mainthis.options object
        */
       public boxWidget:any = {
            selectors:this.options.boxWidgetOptions.boxWidgetSelectors,
            icons:this.options.boxWidgetOptions.boxWidgetIcons,
            animationSpeed:this.options.animationSpeed,
            activate: function (_box) {
            var _this = this;
            if (!_box) {
                _box = document; // activate all boxes per default
            }
            //Listen for collapse event triggers
            $(_box).on('click', _this.selectors.collapse, function (e) {
                e.preventDefault();
                _this.collapse($(this));
            });

            //Listen for remove event triggers
            $(_box).on('click', _this.selectors.remove, function (e) {
                e.preventDefault();
                _this.remove($(this));
            });
            },
            collapse: function (element) {
            var _this = this;
            //Find the box parent
            var box = element.parents(".box").first();
            //Find the body and the footer
            var box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            if (!box.hasClass("collapsed-box")) {
                //Convert minus into plus
                element.children(":first")
                .removeClass(_this.icons.collapse)
                .addClass(_this.icons.open);
                //Hide the content
                box_content.slideUp(_this.animationSpeed, function () {
                box.addClass("collapsed-box");
                });
            } else {
                //Convert plus into minus
                element.children(":first")
                .removeClass(_this.icons.open)
                .addClass(_this.icons.collapse);
                //Show the content
                box_content.slideDown(_this.animationSpeed, function () {
                box.removeClass("collapsed-box");
                });
            }
            },
            remove: function (element) {
            //Find the box parent
            var box = element.parents(".box").first();
            box.slideUp(this.animationSpeed);
            }
        };
        
     

    ngOnInit(){
          //Fix for IE page transitions
        $("body").removeClass("hold-transition");

        //Easy access to options
        var o = this.options;
        console.log("ooo>>",JSON.stringify(o),this);

        //Set up the object
       // _init();

        //Activate the layout maker
        this.layout.activate(o);

        //Enable sidebar tree view controls
        this.tree('.sidebar');

        //Enable control sidebar
        if (o.enableControlSidebar) {
            this.controlSidebar.activate(o);
        }


        //Activate sidebar push menu
        if (o.sidebarPushMenu) {
            this.pushMenu.activate(o.sidebarToggleSelector,o);
        }

        //Activate Bootstrap tooltip
        if (o.enableBSToppltip) {
          /*  $('body').tooltip({
            selector: o.BSTooltipSelector
            });*/
        }

        //Activate box widget
        if (o.enableBoxWidget) {
            this.boxWidget.activate();
        }

        //Activate direct chat widget
        if (o.directChat.enable) {
            $(document).on('click', o.directChat.contactToggleSelector, function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
            });
        }

        /*
        * INITIALIZE BUTTON TOGGLE
        * ------------------------
        */
        $('.btn-group[data-toggle="btn-toggle"]').each(function () {
            var group = $(this);
            $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
            });

        });
    }

    
}