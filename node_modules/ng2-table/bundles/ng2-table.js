System.registerDynamic('ng2-table/components/ng-table-directives', ['./table/ng-table.component', './table/ng-table-filtering.directive', './table/ng-table-paging.directive', './table/ng-table-sorting.directive'], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var ng_table_component_1 = $__require('./table/ng-table.component');
  var ng_table_filtering_directive_1 = $__require('./table/ng-table-filtering.directive');
  var ng_table_paging_directive_1 = $__require('./table/ng-table-paging.directive');
  var ng_table_sorting_directive_1 = $__require('./table/ng-table-sorting.directive');
  exports.NG_TABLE_DIRECTIVES = [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective];
  return module.exports;
});
System.registerDynamic('ng2-table/components/table/ng-table.component', ['@angular/core', '@angular/platform-browser'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var platform_browser_1 = $__require('@angular/platform-browser');
    var NgTableComponent = function () {
        function NgTableComponent(sanitizer) {
            this.sanitizer = sanitizer;
            // Table values
            this.rows = [];
            // Outputs (Events)
            this.tableChanged = new core_1.EventEmitter();
            this.cellClicked = new core_1.EventEmitter();
            this.showFilterRow = false;
            this._columns = [];
            this._config = {};
        }
        Object.defineProperty(NgTableComponent.prototype, "config", {
            get: function () {
                return this._config;
            },
            set: function (conf) {
                if (!conf.className) {
                    conf.className = 'table-striped table-bordered';
                }
                if (conf.className instanceof Array) {
                    conf.className = conf.className.join(' ');
                }
                this._config = conf;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgTableComponent.prototype, "columns", {
            get: function () {
                return this._columns;
            },
            set: function (values) {
                var _this = this;
                values.forEach(function (value) {
                    if (value.filtering) {
                        _this.showFilterRow = true;
                    }
                    if (value.className && value.className instanceof Array) {
                        value.className = value.className.join(' ');
                    }
                    var column = _this._columns.find(function (col) {
                        return col.name === value.name;
                    });
                    if (column) {
                        Object.assign(column, value);
                    }
                    if (!column) {
                        _this._columns.push(value);
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        NgTableComponent.prototype.sanitize = function (html) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        };
        Object.defineProperty(NgTableComponent.prototype, "configColumns", {
            get: function () {
                var sortColumns = [];
                this.columns.forEach(function (column) {
                    if (column.sort) {
                        sortColumns.push(column);
                    }
                });
                return { columns: sortColumns };
            },
            enumerable: true,
            configurable: true
        });
        NgTableComponent.prototype.onChangeTable = function (column) {
            this._columns.forEach(function (col) {
                if (col.name !== column.name && col.sort !== false) {
                    col.sort = '';
                }
            });
            this.tableChanged.emit({ sorting: this.configColumns });
        };
        NgTableComponent.prototype.getData = function (row, propertyName) {
            return propertyName.split('.').reduce(function (prev, curr) {
                return prev[curr];
            }, row);
        };
        NgTableComponent.prototype.cellClick = function (row, column) {
            this.cellClicked.emit({ row: row, column: column });
        };
        NgTableComponent.decorators = [{ type: core_1.Component, args: [{
                selector: 'ng-table',
                template: "\n    <table class=\"table dataTable\" ngClass=\"{{config.className || ''}}\"\n           role=\"grid\" style=\"width: 100%;\">\n      <thead>\n        <tr role=\"row\">\n          <th *ngFor=\"let column of columns\" [ngTableSorting]=\"config\" [column]=\"column\" \n              (sortChanged)=\"onChangeTable($event)\" ngClass=\"{{column.className || ''}}\">\n            {{column.title}}\n            <i *ngIf=\"config && column.sort\" class=\"pull-right fa\"\n              [ngClass]=\"{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}\"></i>\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n      <tr *ngIf=\"showFilterRow\">\n        <td *ngFor=\"let column of columns\">\n          <input *ngIf=\"column.filtering\" placeholder=\"{{column.filtering.placeholder}}\"\n                 [ngTableFiltering]=\"column.filtering\"\n                 class=\"form-control\"\n                 style=\"width: auto;\"\n                 (tableChanged)=\"onChangeTable(config)\"/>\n        </td>\n      </tr>\n        <tr *ngFor=\"let row of rows\">\n          <td (click)=\"cellClick(row, column.name)\" *ngFor=\"let column of columns\" [innerHtml]=\"sanitize(getData(row, column.name))\"></td>\n        </tr>\n      </tbody>\n    </table>\n  "
            }] }];
        /** @nocollapse */
        NgTableComponent.ctorParameters = [{ type: platform_browser_1.DomSanitizer }];
        NgTableComponent.propDecorators = {
            'rows': [{ type: core_1.Input }],
            'config': [{ type: core_1.Input }],
            'tableChanged': [{ type: core_1.Output }],
            'cellClicked': [{ type: core_1.Output }],
            'columns': [{ type: core_1.Input }]
        };
        return NgTableComponent;
    }();
    exports.NgTableComponent = NgTableComponent;
    return module.exports;
});
System.registerDynamic('ng2-table/components/table/ng-table-filtering.directive', ['@angular/core'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    // import {setProperty} from 'angular2/ts/src/core/forms/directives/shared';
    function setProperty(renderer, elementRef, propName, propValue) {
        renderer.setElementProperty(elementRef, propName, propValue);
    }
    var NgTableFilteringDirective = function () {
        function NgTableFilteringDirective(element, renderer) {
            this.ngTableFiltering = {
                filterString: '',
                columnName: 'name'
            };
            this.tableChanged = new core_1.EventEmitter();
            this.element = element;
            this.renderer = renderer;
            // Set default value for filter
            setProperty(this.renderer, this.element, 'value', this.ngTableFiltering.filterString);
        }
        Object.defineProperty(NgTableFilteringDirective.prototype, "config", {
            get: function () {
                return this.ngTableFiltering;
            },
            set: function (value) {
                this.ngTableFiltering = value;
            },
            enumerable: true,
            configurable: true
        });
        NgTableFilteringDirective.prototype.onChangeFilter = function (event) {
            this.ngTableFiltering.filterString = event;
            this.tableChanged.emit({ filtering: this.ngTableFiltering });
        };
        NgTableFilteringDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[ngTableFiltering]' }] }];
        /** @nocollapse */
        NgTableFilteringDirective.ctorParameters = [{ type: core_1.ElementRef }, { type: core_1.Renderer }];
        NgTableFilteringDirective.propDecorators = {
            'ngTableFiltering': [{ type: core_1.Input }],
            'tableChanged': [{ type: core_1.Output }],
            'config': [{ type: core_1.Input }],
            'onChangeFilter': [{ type: core_1.HostListener, args: ['input', ['$event.target.value']] }]
        };
        return NgTableFilteringDirective;
    }();
    exports.NgTableFilteringDirective = NgTableFilteringDirective;
    return module.exports;
});
System.registerDynamic("ng2-table/components/table/ng-table-paging.directive", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var NgTablePagingDirective = function () {
        function NgTablePagingDirective() {
            this.ngTablePaging = true;
            this.tableChanged = new core_1.EventEmitter();
        }
        Object.defineProperty(NgTablePagingDirective.prototype, "config", {
            get: function () {
                return this.ngTablePaging;
            },
            set: function (value) {
                this.ngTablePaging = value;
            },
            enumerable: true,
            configurable: true
        });
        NgTablePagingDirective.prototype.onChangePage = function (event) {
            // Object.assign(this.config, event);
            if (this.ngTablePaging) {
                this.tableChanged.emit({ paging: event });
            }
        };
        NgTablePagingDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[ngTablePaging]' }] }];
        /** @nocollapse */
        NgTablePagingDirective.ctorParameters = [];
        NgTablePagingDirective.propDecorators = {
            'ngTablePaging': [{ type: core_1.Input }],
            'tableChanged': [{ type: core_1.Output }],
            'config': [{ type: core_1.Input }],
            'onChangePage': [{ type: core_1.HostListener, args: ['pagechanged', ['$event']] }]
        };
        return NgTablePagingDirective;
    }();
    exports.NgTablePagingDirective = NgTablePagingDirective;
    return module.exports;
});
System.registerDynamic("ng2-table/components/table/ng-table-sorting.directive", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var NgTableSortingDirective = function () {
        function NgTableSortingDirective() {
            this.sortChanged = new core_1.EventEmitter();
        }
        Object.defineProperty(NgTableSortingDirective.prototype, "config", {
            get: function () {
                return this.ngTableSorting;
            },
            set: function (value) {
                this.ngTableSorting = value;
            },
            enumerable: true,
            configurable: true
        });
        NgTableSortingDirective.prototype.onToggleSort = function (event) {
            if (event) {
                event.preventDefault();
            }
            if (this.ngTableSorting && this.column && this.column.sort !== false) {
                switch (this.column.sort) {
                    case 'asc':
                        this.column.sort = 'desc';
                        break;
                    case 'desc':
                        this.column.sort = '';
                        break;
                    default:
                        this.column.sort = 'asc';
                        break;
                }
                this.sortChanged.emit(this.column);
            }
        };
        NgTableSortingDirective.decorators = [{ type: core_1.Directive, args: [{ selector: '[ngTableSorting]' }] }];
        /** @nocollapse */
        NgTableSortingDirective.ctorParameters = [];
        NgTableSortingDirective.propDecorators = {
            'ngTableSorting': [{ type: core_1.Input }],
            'column': [{ type: core_1.Input }],
            'sortChanged': [{ type: core_1.Output }],
            'config': [{ type: core_1.Input }],
            'onToggleSort': [{ type: core_1.HostListener, args: ['click', ['$event']] }]
        };
        return NgTableSortingDirective;
    }();
    exports.NgTableSortingDirective = NgTableSortingDirective;
    return module.exports;
});
System.registerDynamic('ng2-table/components/ng-table-module', ['@angular/core', '@angular/common', './table/ng-table.component', './table/ng-table-filtering.directive', './table/ng-table-paging.directive', './table/ng-table-sorting.directive'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var common_1 = $__require('@angular/common');
    var ng_table_component_1 = $__require('./table/ng-table.component');
    var ng_table_filtering_directive_1 = $__require('./table/ng-table-filtering.directive');
    var ng_table_paging_directive_1 = $__require('./table/ng-table-paging.directive');
    var ng_table_sorting_directive_1 = $__require('./table/ng-table-sorting.directive');
    var Ng2TableModule = function () {
        function Ng2TableModule() {}
        Ng2TableModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective],
                exports: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective]
            }] }];
        /** @nocollapse */
        Ng2TableModule.ctorParameters = [];
        return Ng2TableModule;
    }();
    exports.Ng2TableModule = Ng2TableModule;
    return module.exports;
});
System.registerDynamic('ng2-table/ng2-table', ['./components/table/ng-table.component', './components/table/ng-table-filtering.directive', './components/table/ng-table-paging.directive', './components/table/ng-table-sorting.directive', './components/ng-table-directives', './components/ng-table-module'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var ng_table_component_1 = $__require('./components/table/ng-table.component');
    var ng_table_filtering_directive_1 = $__require('./components/table/ng-table-filtering.directive');
    var ng_table_paging_directive_1 = $__require('./components/table/ng-table-paging.directive');
    var ng_table_sorting_directive_1 = $__require('./components/table/ng-table-sorting.directive');
    __export($__require('./components/table/ng-table.component'));
    __export($__require('./components/table/ng-table-filtering.directive'));
    __export($__require('./components/table/ng-table-paging.directive'));
    __export($__require('./components/table/ng-table-sorting.directive'));
    __export($__require('./components/ng-table-directives'));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        directives: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_sorting_directive_1.NgTableSortingDirective, ng_table_paging_directive_1.NgTablePagingDirective]
    };
    var ng_table_module_1 = $__require('./components/ng-table-module');
    exports.Ng2TableModule = ng_table_module_1.Ng2TableModule;
    return module.exports;
});
//# sourceMappingURL=ng2-table.js.map