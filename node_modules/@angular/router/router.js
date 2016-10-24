"use strict";
require('rxjs/add/operator/map');
require('rxjs/add/operator/scan');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/concat');
require('rxjs/add/operator/concatMap');
require('rxjs/add/operator/every');
require('rxjs/add/operator/mergeAll');
require('rxjs/add/observable/from');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var of_1 = require('rxjs/observable/of');
var apply_redirects_1 = require('./apply_redirects');
var create_router_state_1 = require('./create_router_state');
var create_url_tree_1 = require('./create_url_tree');
var recognize_1 = require('./recognize');
var resolve_1 = require('./resolve');
var router_outlet_map_1 = require('./router_outlet_map');
var router_state_1 = require('./router_state');
var shared_1 = require('./shared');
var url_tree_1 = require('./url_tree');
var collection_1 = require('./utils/collection');
var NavigationStart = (function () {
    function NavigationStart(id, url) {
        this.id = id;
        this.url = url;
    }
    NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationStart;
}());
exports.NavigationStart = NavigationStart;
var NavigationEnd = (function () {
    function NavigationEnd(id, url, urlAfterRedirects) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
    }
    NavigationEnd.prototype.toString = function () {
        return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
    };
    return NavigationEnd;
}());
exports.NavigationEnd = NavigationEnd;
var NavigationCancel = (function () {
    function NavigationCancel(id, url) {
        this.id = id;
        this.url = url;
    }
    NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationCancel;
}());
exports.NavigationCancel = NavigationCancel;
var NavigationError = (function () {
    function NavigationError(id, url, error) {
        this.id = id;
        this.url = url;
        this.error = error;
    }
    NavigationError.prototype.toString = function () {
        return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
    };
    return NavigationError;
}());
exports.NavigationError = NavigationError;
var RoutesRecognized = (function () {
    function RoutesRecognized(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    RoutesRecognized.prototype.toString = function () {
        return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return RoutesRecognized;
}());
exports.RoutesRecognized = RoutesRecognized;
var Router = (function () {
    function Router(rootComponentType, resolver, urlSerializer, outletMap, location, injector, config) {
        this.rootComponentType = rootComponentType;
        this.resolver = resolver;
        this.urlSerializer = urlSerializer;
        this.outletMap = outletMap;
        this.location = location;
        this.injector = injector;
        this.config = config;
        this.navigationId = 0;
        this.routerEvents = new Subject_1.Subject();
        this.currentUrlTree = url_tree_1.createEmptyUrlTree();
        this.currentRouterState = router_state_1.createEmptyState(this.currentUrlTree, this.rootComponentType);
    }
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        this.navigateByUrl(this.location.path());
    };
    Object.defineProperty(Router.prototype, "routerState", {
        get: function () { return this.currentRouterState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "url", {
        get: function () { return this.serializeUrl(this.currentUrlTree); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "events", {
        get: function () { return this.routerEvents; },
        enumerable: true,
        configurable: true
    });
    Router.prototype.resetConfig = function (config) { this.config = config; };
    Router.prototype.dispose = function () { this.locationSubscription.unsubscribe(); };
    Router.prototype.createUrlTree = function (commands, _a) {
        var _b = _a === void 0 ? {} : _a, relativeTo = _b.relativeTo, queryParams = _b.queryParams, fragment = _b.fragment;
        var a = relativeTo ? relativeTo : this.routerState.root;
        return create_url_tree_1.createUrlTree(a, this.currentUrlTree, commands, queryParams, fragment);
    };
    Router.prototype.navigateByUrl = function (url) {
        if (url instanceof url_tree_1.UrlTree) {
            return this.scheduleNavigation(url, false);
        }
        else {
            var urlTree = this.urlSerializer.parse(url);
            return this.scheduleNavigation(urlTree, false);
        }
    };
    Router.prototype.navigate = function (commands, extras) {
        if (extras === void 0) { extras = {}; }
        return this.scheduleNavigation(this.createUrlTree(commands, extras), false);
    };
    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
    Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
    Router.prototype.scheduleNavigation = function (url, preventPushState) {
        var _this = this;
        var id = ++this.navigationId;
        this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
        return Promise.resolve().then(function (_) { return _this.runNavigate(url, preventPushState, id); });
    };
    Router.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        this.locationSubscription = this.location.subscribe(function (change) {
            return _this.scheduleNavigation(_this.urlSerializer.parse(change['url']), change['pop']);
        });
    };
    Router.prototype.runNavigate = function (url, preventPushState, id) {
        var _this = this;
        if (id !== this.navigationId) {
            this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
            this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url)));
            return Promise.resolve(false);
        }
        return new Promise(function (resolvePromise, rejectPromise) {
            var updatedUrl;
            var state;
            apply_redirects_1.applyRedirects(url, _this.config)
                .mergeMap(function (u) {
                updatedUrl = u;
                return recognize_1.recognize(_this.rootComponentType, _this.config, updatedUrl, _this.serializeUrl(updatedUrl));
            })
                .mergeMap(function (newRouterStateSnapshot) {
                _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(updatedUrl), newRouterStateSnapshot));
                return resolve_1.resolve(_this.resolver, newRouterStateSnapshot);
            })
                .map(function (routerStateSnapshot) {
                return create_router_state_1.createRouterState(routerStateSnapshot, _this.currentRouterState);
            })
                .map(function (newState) {
                state = newState;
            })
                .mergeMap(function (_) {
                return new GuardChecks(state.snapshot, _this.currentRouterState.snapshot, _this.injector)
                    .check(_this.outletMap);
            })
                .forEach(function (shouldActivate) {
                if (!shouldActivate || id !== _this.navigationId) {
                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url)));
                    return Promise.resolve(false);
                }
                new ActivateRoutes(state, _this.currentRouterState).activate(_this.outletMap);
                _this.currentUrlTree = updatedUrl;
                _this.currentRouterState = state;
                if (!preventPushState) {
                    var path = _this.urlSerializer.serialize(updatedUrl);
                    if (_this.location.isCurrentPathEqualTo(path)) {
                        _this.location.replaceState(path);
                    }
                    else {
                        _this.location.go(path);
                    }
                }
                return Promise.resolve(true);
            })
                .then(function () {
                _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(updatedUrl)));
                resolvePromise(true);
            }, function (e) {
                _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
                rejectPromise(e);
            });
        });
    };
    return Router;
}());
exports.Router = Router;
var CanActivate = (function () {
    function CanActivate(route) {
        this.route = route;
    }
    return CanActivate;
}());
var CanDeactivate = (function () {
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
var GuardChecks = (function () {
    function GuardChecks(future, curr, injector) {
        this.future = future;
        this.curr = curr;
        this.injector = injector;
        this.checks = [];
    }
    GuardChecks.prototype.check = function (parentOutletMap) {
        var _this = this;
        var futureRoot = this.future._root;
        var currRoot = this.curr ? this.curr._root : null;
        this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap);
        if (this.checks.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(this.checks)
            .map(function (s) {
            if (s instanceof CanActivate) {
                return _this.runCanActivate(s.route);
            }
            else if (s instanceof CanDeactivate) {
                return _this.runCanDeactivate(s.component, s.route);
            }
            else {
                throw new Error('Cannot be reached');
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    GuardChecks.prototype.traverseChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(v, outletMap._outlets[k]); });
    };
    GuardChecks.prototype.traverseRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
        if (curr && future._routeConfig === curr._routeConfig) {
            if (!collection_1.shallowEqual(future.params, curr.params)) {
                this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(future));
            }
            this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null);
        }
        else {
            this.deactivateOutletAndItChildren(curr, outlet);
            this.checks.push(new CanActivate(future));
            this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null);
        }
    };
    GuardChecks.prototype.deactivateOutletAndItChildren = function (route, outlet) {
        var _this = this;
        if (outlet && outlet.isActivated) {
            collection_1.forEach(outlet.outletMap._outlets, function (v) {
                if (v.isActivated) {
                    _this.deactivateOutletAndItChildren(v.activatedRoute.snapshot, v);
                }
            });
            this.checks.push(new CanDeactivate(outlet.component, route));
        }
    };
    GuardChecks.prototype.runCanActivate = function (future) {
        var _this = this;
        var canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(canActivate)
            .map(function (c) {
            var guard = _this.injector.get(c);
            if (guard.canActivate) {
                return wrapIntoObservable(guard.canActivate(future, _this.future));
            }
            else {
                return wrapIntoObservable(guard(future, _this.future));
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    GuardChecks.prototype.runCanDeactivate = function (component, curr) {
        var _this = this;
        var canDeactivate = curr._routeConfig ? curr._routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
            return of_1.of(true);
        return Observable_1.Observable.from(canDeactivate)
            .map(function (c) {
            var guard = _this.injector.get(c);
            if (guard.canDeactivate) {
                return wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr));
            }
            else {
                return wrapIntoObservable(guard(component, curr, _this.curr));
            }
        })
            .mergeAll()
            .every(function (result) { return result === true; });
    };
    return GuardChecks;
}());
function wrapIntoObservable(value) {
    if (value instanceof Observable_1.Observable) {
        return value;
    }
    else {
        return of_1.of(value);
    }
}
var ActivateRoutes = (function () {
    function ActivateRoutes(futureState, currState) {
        this.futureState = futureState;
        this.currState = currState;
    }
    ActivateRoutes.prototype.activate = function (parentOutletMap) {
        var futureRoot = this.futureState._root;
        var currRoot = this.currState ? this.currState._root : null;
        pushQueryParamsAndFragment(this.futureState);
        this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
    };
    ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(outletMap._outlets[k]); });
    };
    ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = getOutlet(parentOutletMap, futureNode.value);
        if (future === curr) {
            router_state_1.advanceActivatedRoute(future);
            this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
        }
        else {
            this.deactivateOutletAndItChildren(outlet);
            var outletMap = new router_outlet_map_1.RouterOutletMap();
            this.activateNewRoutes(outletMap, future, outlet);
            this.activateChildRoutes(futureNode, null, outletMap);
        }
    };
    ActivateRoutes.prototype.activateNewRoutes = function (outletMap, future, outlet) {
        var resolved = core_1.ReflectiveInjector.resolve([
            { provide: router_state_1.ActivatedRoute, useValue: future },
            { provide: router_outlet_map_1.RouterOutletMap, useValue: outletMap }
        ]);
        router_state_1.advanceActivatedRoute(future);
        outlet.activate(future._futureSnapshot._resolvedComponentFactory, future, resolved, outletMap);
    };
    ActivateRoutes.prototype.deactivateOutletAndItChildren = function (outlet) {
        var _this = this;
        if (outlet && outlet.isActivated) {
            collection_1.forEach(outlet.outletMap._outlets, function (v) { return _this.deactivateOutletAndItChildren(v); });
            outlet.deactivate();
        }
    };
    return ActivateRoutes;
}());
function pushQueryParamsAndFragment(state) {
    if (!collection_1.shallowEqual(state.snapshot.queryParams, state.queryParams.value)) {
        state.queryParams.next(state.snapshot.queryParams);
    }
    if (state.snapshot.fragment !== state.fragment.value) {
        state.fragment.next(state.snapshot.fragment);
    }
}
function nodeChildrenAsMap(node) {
    return node ? node.children.reduce(function (m, c) {
        m[c.value.outlet] = c;
        return m;
    }, {}) : {};
}
function getOutlet(outletMap, route) {
    var outlet = outletMap._outlets[route.outlet];
    if (!outlet) {
        var componentName = route.component.name;
        if (route.outlet === shared_1.PRIMARY_OUTLET) {
            throw new Error("Cannot find primary outlet to load '" + componentName + "'");
        }
        else {
            throw new Error("Cannot find the outlet " + route.outlet + " to load '" + componentName + "'");
        }
    }
    return outlet;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9CLFFBQU8sd0JBQXdCLENBQUMsQ0FBQTtBQUNoQyxRQUFPLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsUUFBTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQUNyQyxRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsUUFBTyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3BDLFFBQU8sMEJBQTBCLENBQUMsQ0FBQTtBQUdsQyxxQkFBb0UsZUFBZSxDQUFDLENBQUE7QUFDcEYsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFDM0Msd0JBQXNCLGNBQWMsQ0FBQyxDQUFBO0FBRXJDLG1CQUFrQixvQkFBb0IsQ0FBQyxDQUFBO0FBRXZDLGdDQUE2QixtQkFBbUIsQ0FBQyxDQUFBO0FBRWpELG9DQUFnQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hELGdDQUE0QixtQkFBbUIsQ0FBQyxDQUFBO0FBRWhELDBCQUF3QixhQUFhLENBQUMsQ0FBQTtBQUN0Qyx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFDbEMsa0NBQThCLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsNkJBQWdJLGdCQUFnQixDQUFDLENBQUE7QUFDakosdUJBQXFDLFVBQVUsQ0FBQyxDQUFBO0FBRWhELHlCQUEwQyxZQUFZLENBQUMsQ0FBQTtBQUN2RCwyQkFBb0Msb0JBQW9CLENBQUMsQ0FBQTtBQVl6RDtJQUNFLHlCQUFtQixFQUFVLEVBQVMsR0FBVztRQUE5QixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtJQUFHLENBQUM7SUFFckQsa0NBQVEsR0FBUixjQUFxQixNQUFNLENBQUMseUJBQXVCLElBQUksQ0FBQyxFQUFFLGdCQUFXLElBQUksQ0FBQyxH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S0FBSyx1QkFBYyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF1QyxhQUFhLE1BQUcsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTBCLEtBQUssQ0FBQyxNQUFNLGtCQUFhLGFBQWEsTUFBRyxDQUFDLENBQUM7UUFDdkYsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3NjYW4nO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NvbmNhdCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NvbmNhdE1hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2V2ZXJ5JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2VBbGwnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb20nO1xuXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb21wb25lbnRSZXNvbHZlciwgSW5qZWN0b3IsIFJlZmxlY3RpdmVJbmplY3RvciwgVHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHtvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5cbmltcG9ydCB7YXBwbHlSZWRpcmVjdHN9IGZyb20gJy4vYXBwbHlfcmVkaXJlY3RzJztcbmltcG9ydCB7Um91dGVyQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2NyZWF0ZVJvdXRlclN0YXRlfSBmcm9tICcuL2NyZWF0ZV9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtjcmVhdGVVcmxUcmVlfSBmcm9tICcuL2NyZWF0ZV91cmxfdHJlZSc7XG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtyZWNvZ25pemV9IGZyb20gJy4vcmVjb2duaXplJztcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAnLi9yZXNvbHZlJztcbmltcG9ydCB7Um91dGVyT3V0bGV0TWFwfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfbWFwJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBhZHZhbmNlQWN0aXZhdGVkUm91dGUsIGNyZWF0ZUVtcHR5U3RhdGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVQsIFBhcmFtc30gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtVcmxTZXJpYWxpemVyfSBmcm9tICcuL3VybF9zZXJpYWxpemVyJztcbmltcG9ydCB7VXJsVHJlZSwgY3JlYXRlRW1wdHlVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7Zm9yRWFjaCwgc2hhbGxvd0VxdWFsfSBmcm9tICcuL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAnLi91dGlscy90cmVlJztcblxuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uRXh0cmFzIHtcbiAgcmVsYXRpdmVUbz86IEFjdGl2YXRlZFJvdXRlO1xuICBxdWVyeVBhcmFtcz86IFBhcmFtcztcbiAgZnJhZ21lbnQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gYSBuYXZpZ2F0aW9uIHN0YXJ0c1xuICovXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyB1cmw6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYE5hdmlnYXRpb25TdGFydChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nKWA7IH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gZW5kcyBzdWNjZXNzZnVsbHlcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25FbmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIHVybDogc3RyaW5nLCBwdWJsaWMgdXJsQWZ0ZXJSZWRpcmVjdHM6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgTmF2aWdhdGlvbkVuZChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nLCB1cmxBZnRlclJlZGlyZWN0czogJyR7dGhpcy51cmxBZnRlclJlZGlyZWN0c30nKWA7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gaXMgY2FuY2VsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25DYW5jZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIHVybDogc3RyaW5nKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgTmF2aWdhdGlvbkNhbmNlbChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nKWA7IH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gZmFpbHMgZHVlIHRvIHVuZXhwZWN0ZWQgZXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogbnVtYmVyLCBwdWJsaWMgdXJsOiBzdHJpbmcsIHB1YmxpYyBlcnJvcjogYW55KSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBOYXZpZ2F0aW9uRXJyb3IoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JywgZXJyb3I6ICR7dGhpcy5lcnJvcn0pYDtcbiAgfVxufVxuXG4vKipcbiAqIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIHJvdXRlcyBhcmUgcmVjb2duaXplZFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVzUmVjb2duaXplZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyB1cmw6IHN0cmluZywgcHVibGljIHVybEFmdGVyUmVkaXJlY3RzOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFJvdXRlc1JlY29nbml6ZWQoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JywgdXJsQWZ0ZXJSZWRpcmVjdHM6ICcke3RoaXMudXJsQWZ0ZXJSZWRpcmVjdHN9Jywgc3RhdGU6ICR7dGhpcy5zdGF0ZX0pYDtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBFdmVudCA9IE5hdmlnYXRpb25TdGFydCB8IE5hdmlnYXRpb25FbmQgfCBOYXZpZ2F0aW9uQ2FuY2VsIHwgTmF2aWdhdGlvbkVycm9yO1xuXG4vKipcbiAqIFRoZSBgUm91dGVyYCBpcyByZXNwb25zaWJsZSBmb3IgbWFwcGluZyBVUkxzIHRvIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICBwcml2YXRlIGN1cnJlbnRVcmxUcmVlOiBVcmxUcmVlO1xuICBwcml2YXRlIGN1cnJlbnRSb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGU7XG4gIHByaXZhdGUgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByb3V0ZXJFdmVudHM6IFN1YmplY3Q8RXZlbnQ+O1xuICBwcml2YXRlIG5hdmlnYXRpb25JZDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm9vdENvbXBvbmVudFR5cGU6IFR5cGUsIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBwcml2YXRlIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGNvbmZpZzogUm91dGVyQ29uZmlnKSB7XG4gICAgdGhpcy5yb3V0ZXJFdmVudHMgPSBuZXcgU3ViamVjdDxFdmVudD4oKTtcbiAgICB0aGlzLmN1cnJlbnRVcmxUcmVlID0gY3JlYXRlRW1wdHlVcmxUcmVlKCk7XG4gICAgdGhpcy5jdXJyZW50Um91dGVyU3RhdGUgPSBjcmVhdGVFbXB0eVN0YXRlKHRoaXMuY3VycmVudFVybFRyZWUsIHRoaXMucm9vdENvbXBvbmVudFR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaW5pdGlhbE5hdmlnYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zZXRVcExvY2F0aW9uQ2hhbmdlTGlzdGVuZXIoKTtcbiAgICB0aGlzLm5hdmlnYXRlQnlVcmwodGhpcy5sb2NhdGlvbi5wYXRoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgcm91dGUgc3RhdGUuXG4gICAqL1xuICBnZXQgcm91dGVyU3RhdGUoKTogUm91dGVyU3RhdGUgeyByZXR1cm4gdGhpcy5jdXJyZW50Um91dGVyU3RhdGU7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB1cmwuXG4gICAqL1xuICBnZXQgdXJsKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnNlcmlhbGl6ZVVybCh0aGlzLmN1cnJlbnRVcmxUcmVlKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9ic2VydmFibGUgb2Ygcm91dGUgZXZlbnRzXG4gICAqL1xuICBnZXQgZXZlbnRzKCk6IE9ic2VydmFibGU8RXZlbnQ+IHsgcmV0dXJuIHRoaXMucm91dGVyRXZlbnRzOyB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY29uZmlndXJhdGlvbiB1c2VkIGZvciBuYXZpZ2F0aW9uIGFuZCBnZW5lcmF0aW5nIGxpbmtzLlxuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5yZXNldENvbmZpZyhbXG4gICAqICB7IHBhdGg6ICd0ZWFtLzppZCcsIGNvbXBvbmVudDogVGVhbUNtcCwgY2hpbGRyZW46IFtcbiAgICogICAgeyBwYXRoOiAnc2ltcGxlJywgY29tcG9uZW50OiBTaW1wbGVDbXAgfSxcbiAgICogICAgeyBwYXRoOiAndXNlci86bmFtZScsIGNvbXBvbmVudDogVXNlckNtcCB9XG4gICAqICBdIH1cbiAgICogXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcmVzZXRDb25maWcoY29uZmlnOiBSb3V0ZXJDb25maWcpOiB2b2lkIHsgdGhpcy5jb25maWcgPSBjb25maWc7IH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQgeyB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbiBhcnJheSBvZiBjb21tYW5kcyB0byB0aGUgY3VycmVudCB1cmwgdHJlZSBhbmQgY3JlYXRlc1xuICAgKiBhIG5ldyB1cmwgdHJlZS5cbiAgICpcbiAgICogV2hlbiBnaXZlbiBhbiBhY3RpdmF0ZSByb3V0ZSwgYXBwbGllcyB0aGUgZ2l2ZW4gY29tbWFuZHMgc3RhcnRpbmcgZnJvbSB0aGUgcm91dGUuXG4gICAqIFdoZW4gbm90IGdpdmVuIGEgcm91dGUsIGFwcGxpZXMgdGhlIGdpdmVuIGNvbW1hbmQgc3RhcnRpbmcgZnJvbSB0aGUgcm9vdC5cbiAgICpcbiAgICogIyMjIFVzYWdlXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBjcmVhdGUgL3RlYW0vMzMvdXNlci8xMVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsICd1c2VyJywgMTFdKTtcbiAgICpcbiAgICogLy8gY3JlYXRlIC90ZWFtLzMzO2V4cGFuZD10cnVlL3VzZXIvMTFcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycvdGVhbScsIDMzLCB7ZXhwYW5kOiB0cnVlfSwgJ3VzZXInLCAxMV0pO1xuICAgKlxuICAgKiAvLyB5b3UgY2FuIGNvbGxhcHNlIHN0YXRpYyBmcmFnbWVudHMgbGlrZSB0aGlzXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0vMzMvdXNlcicsIHVzZXJJZF0pO1xuICAgKlxuICAgKiAvLyBhc3N1bWluZyB0aGUgY3VycmVudCB1cmwgaXMgYC90ZWFtLzMzL3VzZXIvMTFgIGFuZCB0aGUgcm91dGUgcG9pbnRzIHRvIGB1c2VyLzExYFxuICAgKlxuICAgKiAvLyBuYXZpZ2F0ZSB0byAvdGVhbS8zMy91c2VyLzExL2RldGFpbHNcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWydkZXRhaWxzJ10sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKlxuICAgKiAvLyBuYXZpZ2F0ZSB0byAvdGVhbS8zMy91c2VyLzIyXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnLi4vMjInXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzQ0L3VzZXIvMjJcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycuLi8uLi90ZWFtLzQ0L3VzZXIvMjInXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY3JlYXRlVXJsVHJlZShjb21tYW5kczogYW55W10sIHtyZWxhdGl2ZVRvLCBxdWVyeVBhcmFtcywgZnJhZ21lbnR9OiBOYXZpZ2F0aW9uRXh0cmFzID0ge30pOlxuICAgICAgVXJsVHJlZSB7XG4gICAgY29uc3QgYSA9IHJlbGF0aXZlVG8gPyByZWxhdGl2ZVRvIDogdGhpcy5yb3V0ZXJTdGF0ZS5yb290O1xuICAgIHJldHVybiBjcmVhdGVVcmxUcmVlKGEsIHRoaXMuY3VycmVudFVybFRyZWUsIGNvbW1hbmRzLCBxdWVyeVBhcmFtcywgZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB1cmwuIFRoaXMgbmF2aWdhdGlvbiBpcyBhbHdheXMgYWJzb2x1dGUuXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQ6XG4gICAqIC0gaXMgcmVzb2x2ZWQgd2l0aCAndHJ1ZScgd2hlbiBuYXZpZ2F0aW9uIHN1Y2NlZWRzXG4gICAqIC0gaXMgcmVzb2x2ZWQgd2l0aCAnZmFsc2UnIHdoZW4gbmF2aWdhdGlvbiBmYWlsc1xuICAgKiAtIGlzIHJlamVjdGVkIHdoZW4gYW4gZXJyb3IgaGFwcGVuc1xuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKFwiL3RlYW0vMzMvdXNlci8xMVwiKTtcbiAgICogYGBgXG4gICAqL1xuICBuYXZpZ2F0ZUJ5VXJsKHVybDogc3RyaW5nfFVybFRyZWUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodXJsIGluc3RhbmNlb2YgVXJsVHJlZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVOYXZpZ2F0aW9uKHVybCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmxUcmVlID0gdGhpcy51cmxTZXJpYWxpemVyLnBhcnNlKHVybCk7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odXJsVHJlZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgY29tbWFuZHMgYW5kIGEgc3RhcnRpbmcgcG9pbnQuXG4gICAqIElmIG5vIHN0YXJ0aW5nIHJvdXRlIGlzIHByb3ZpZGVkLCB0aGUgbmF2aWdhdGlvbiBpcyBhYnNvbHV0ZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdDpcbiAgICogLSBpcyByZXNvbHZlZCB3aXRoICd0cnVlJyB3aGVuIG5hdmlnYXRpb24gc3VjY2VlZHNcbiAgICogLSBpcyByZXNvbHZlZCB3aXRoICdmYWxzZScgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzXG4gICAqIC0gaXMgcmVqZWN0ZWQgd2hlbiBhbiBlcnJvciBoYXBwZW5zXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLm5hdmlnYXRlKFsndGVhbScsIDMzLCAndGVhbScsICcxMV0sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKiBgYGBcbiAgICovXG4gIG5hdmlnYXRlKGNvbW1hbmRzOiBhbnlbXSwgZXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge30pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odGhpcy5jcmVhdGVVcmxUcmVlKGNvbW1hbmRzLCBleHRyYXMpLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIHtAbGluayBVcmxUcmVlfSBpbnRvIGEgc3RyaW5nLlxuICAgKi9cbiAgc2VyaWFsaXplVXJsKHVybDogVXJsVHJlZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVybCk7IH1cblxuICAvKipcbiAgICogUGFyc2UgYSBzdHJpbmcgaW50byBhIHtAbGluayBVcmxUcmVlfS5cbiAgICovXG4gIHBhcnNlVXJsKHVybDogc3RyaW5nKTogVXJsVHJlZSB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTsgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVOYXZpZ2F0aW9uKHVybDogVXJsVHJlZSwgcHJldmVudFB1c2hTdGF0ZTogYm9vbGVhbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGlkID0gKyt0aGlzLm5hdmlnYXRpb25JZDtcbiAgICB0aGlzLnJvdXRlckV2ZW50cy5uZXh0KG5ldyBOYXZpZ2F0aW9uU3RhcnQoaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCkpKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoXykgPT4gdGhpcy5ydW5OYXZpZ2F0ZSh1cmwsIHByZXZlbnRQdXNoU3RhdGUsIGlkKSk7XG4gIH1cblxuICBwcml2YXRlIHNldFVwTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gPGFueT50aGlzLmxvY2F0aW9uLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odGhpcy51cmxTZXJpYWxpemVyLnBhcnNlKGNoYW5nZVsndXJsJ10pLCBjaGFuZ2VbJ3BvcCddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuTmF2aWdhdGUodXJsOiBVcmxUcmVlLCBwcmV2ZW50UHVzaFN0YXRlOiBib29sZWFuLCBpZDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKGlkICE9PSB0aGlzLm5hdmlnYXRpb25JZCkge1xuICAgICAgdGhpcy5sb2NhdGlvbi5nbyh0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMuY3VycmVudFVybFRyZWUpKTtcbiAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQobmV3IE5hdmlnYXRpb25DYW5jZWwoaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCkpKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpID0+IHtcbiAgICAgIGxldCB1cGRhdGVkVXJsOiBVcmxUcmVlO1xuICAgICAgbGV0IHN0YXRlOiBSb3V0ZXJTdGF0ZTtcbiAgICAgIGFwcGx5UmVkaXJlY3RzKHVybCwgdGhpcy5jb25maWcpXG4gICAgICAgICAgLm1lcmdlTWFwKHUgPT4ge1xuICAgICAgICAgICAgdXBkYXRlZFVybCA9IHU7XG4gICAgICAgICAgICByZXR1cm4gcmVjb2duaXplKFxuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbXBvbmVudFR5cGUsIHRoaXMuY29uZmlnLCB1cGRhdGVkVXJsLCB0aGlzLnNlcmlhbGl6ZVVybCh1cGRhdGVkVXJsKSk7XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC5tZXJnZU1hcCgobmV3Um91dGVyU3RhdGVTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgUm91dGVzUmVjb2duaXplZChcbiAgICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgdGhpcy5zZXJpYWxpemVVcmwodXBkYXRlZFVybCksIG5ld1JvdXRlclN0YXRlU25hcHNob3QpKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMucmVzb2x2ZXIsIG5ld1JvdXRlclN0YXRlU25hcHNob3QpO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChyb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlUm91dGVyU3RhdGUocm91dGVyU3RhdGVTbmFwc2hvdCwgdGhpcy5jdXJyZW50Um91dGVyU3RhdGUpO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChuZXdTdGF0ZTogUm91dGVyU3RhdGUpID0+IHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3U3RhdGU7XG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5tZXJnZU1hcChfID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgR3VhcmRDaGVja3Moc3RhdGUuc25hcHNob3QsIHRoaXMuY3VycmVudFJvdXRlclN0YXRlLnNuYXBzaG90LCB0aGlzLmluamVjdG9yKVxuICAgICAgICAgICAgICAgIC5jaGVjayh0aGlzLm91dGxldE1hcCk7XG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mb3JFYWNoKChzaG91bGRBY3RpdmF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRBY3RpdmF0ZSB8fCBpZCAhPT0gdGhpcy5uYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgTmF2aWdhdGlvbkNhbmNlbChpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3IEFjdGl2YXRlUm91dGVzKHN0YXRlLCB0aGlzLmN1cnJlbnRSb3V0ZXJTdGF0ZSkuYWN0aXZhdGUodGhpcy5vdXRsZXRNYXApO1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVcmxUcmVlID0gdXBkYXRlZFVybDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJvdXRlclN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRQdXNoU3RhdGUpIHtcbiAgICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVwZGF0ZWRVcmwpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5sb2NhdGlvbi5pc0N1cnJlbnRQYXRoRXF1YWxUbyhwYXRoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZVN0YXRlKHBhdGgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uZ28ocGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBOYXZpZ2F0aW9uRW5kKGlkLCB0aGlzLnNlcmlhbGl6ZVVybCh1cmwpLCB0aGlzLnNlcmlhbGl6ZVVybCh1cGRhdGVkVXJsKSkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHRydWUpO1xuXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQobmV3IE5hdmlnYXRpb25FcnJvcihpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgZSkpO1xuICAgICAgICAgICAgICAgIHJlamVjdFByb21pc2UoZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7fVxufVxuY2xhc3MgQ2FuRGVhY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnQ6IE9iamVjdCwgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7fVxufVxuXG5jbGFzcyBHdWFyZENoZWNrcyB7XG4gIHByaXZhdGUgY2hlY2tzOiBBcnJheTxDYW5BY3RpdmF0ZXxDYW5EZWFjdGl2YXRlPiA9IFtdO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZnV0dXJlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBwcml2YXRlIGN1cnI6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBjaGVjayhwYXJlbnRPdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGZ1dHVyZVJvb3QgPSB0aGlzLmZ1dHVyZS5fcm9vdDtcbiAgICBjb25zdCBjdXJyUm9vdCA9IHRoaXMuY3VyciA/IHRoaXMuY3Vyci5fcm9vdCA6IG51bGw7XG4gICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRPdXRsZXRNYXApO1xuICAgIGlmICh0aGlzLmNoZWNrcy5sZW5ndGggPT09IDApIHJldHVybiBvZiAodHJ1ZSk7XG5cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tKHRoaXMuY2hlY2tzKVxuICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgIGlmIChzIGluc3RhbmNlb2YgQ2FuQWN0aXZhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNhbkFjdGl2YXRlKHMucm91dGUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocyBpbnN0YW5jZW9mIENhbkRlYWN0aXZhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNhbkRlYWN0aXZhdGUocy5jb21wb25lbnQsIHMucm91dGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBiZSByZWFjaGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAubWVyZ2VBbGwoKVxuICAgICAgICAuZXZlcnkocmVzdWx0ID0+IHJlc3VsdCA9PT0gdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHRyYXZlcnNlQ2hpbGRSb3V0ZXMoXG4gICAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LFxuICAgICAgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2Q2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbm9kZUNoaWxkcmVuQXNNYXAoY3Vyck5vZGUpO1xuICAgIGZ1dHVyZU5vZGUuY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcbiAgICAgIHRoaXMudHJhdmVyc2VSb3V0ZXMoYywgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XSwgb3V0bGV0TWFwKTtcbiAgICAgIGRlbGV0ZSBwcmV2Q2hpbGRyZW5bYy52YWx1ZS5vdXRsZXRdO1xuICAgIH0pO1xuICAgIGZvckVhY2goXG4gICAgICAgIHByZXZDaGlsZHJlbixcbiAgICAgICAgKHY6IGFueSwgazogc3RyaW5nKSA9PiB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHYsIG91dGxldE1hcC5fb3V0bGV0c1trXSkpO1xuICB9XG5cbiAgdHJhdmVyc2VSb3V0ZXMoXG4gICAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LFxuICAgICAgcGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmUgPSBmdXR1cmVOb2RlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcbiAgICBjb25zdCBvdXRsZXQgPSBwYXJlbnRPdXRsZXRNYXAgPyBwYXJlbnRPdXRsZXRNYXAuX291dGxldHNbZnV0dXJlTm9kZS52YWx1ZS5vdXRsZXRdIDogbnVsbDtcblxuICAgIGlmIChjdXJyICYmIGZ1dHVyZS5fcm91dGVDb25maWcgPT09IGN1cnIuX3JvdXRlQ29uZmlnKSB7XG4gICAgICBpZiAoIXNoYWxsb3dFcXVhbChmdXR1cmUucGFyYW1zLCBjdXJyLnBhcmFtcykpIHtcbiAgICAgICAgdGhpcy5jaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShvdXRsZXQuY29tcG9uZW50LCBjdXJyKSwgbmV3IENhbkFjdGl2YXRlKGZ1dHVyZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBvdXRsZXQgPyBvdXRsZXQub3V0bGV0TWFwIDogbnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4oY3Vyciwgb3V0bGV0KTtcbiAgICAgIHRoaXMuY2hlY2tzLnB1c2gobmV3IENhbkFjdGl2YXRlKGZ1dHVyZSkpO1xuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIG51bGwsIG91dGxldCA/IG91dGxldC5vdXRsZXRNYXAgOiBudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRsZXQgJiYgb3V0bGV0LmlzQWN0aXZhdGVkKSB7XG4gICAgICBmb3JFYWNoKG91dGxldC5vdXRsZXRNYXAuX291dGxldHMsICh2OiBSb3V0ZXJPdXRsZXQpID0+IHtcbiAgICAgICAgaWYgKHYuaXNBY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHYuYWN0aXZhdGVkUm91dGUuc25hcHNob3QsIHYpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2hlY2tzLnB1c2gobmV3IENhbkRlYWN0aXZhdGUob3V0bGV0LmNvbXBvbmVudCwgcm91dGUpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bkNhbkFjdGl2YXRlKGZ1dHVyZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGNhbkFjdGl2YXRlID0gZnV0dXJlLl9yb3V0ZUNvbmZpZyA/IGZ1dHVyZS5fcm91dGVDb25maWcuY2FuQWN0aXZhdGUgOiBudWxsO1xuICAgIGlmICghY2FuQWN0aXZhdGUgfHwgY2FuQWN0aXZhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gb2YgKHRydWUpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb20oY2FuQWN0aXZhdGUpXG4gICAgICAgIC5tYXAoYyA9PiB7XG4gICAgICAgICAgY29uc3QgZ3VhcmQgPSB0aGlzLmluamVjdG9yLmdldChjKTtcbiAgICAgICAgICBpZiAoZ3VhcmQuY2FuQWN0aXZhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwSW50b09ic2VydmFibGUoZ3VhcmQuY2FuQWN0aXZhdGUoZnV0dXJlLCB0aGlzLmZ1dHVyZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcEludG9PYnNlcnZhYmxlKGd1YXJkKGZ1dHVyZSwgdGhpcy5mdXR1cmUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5tZXJnZUFsbCgpXG4gICAgICAgIC5ldmVyeShyZXN1bHQgPT4gcmVzdWx0ID09PSB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuQ2FuRGVhY3RpdmF0ZShjb21wb25lbnQ6IE9iamVjdCwgY3VycjogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGNhbkRlYWN0aXZhdGUgPSBjdXJyLl9yb3V0ZUNvbmZpZyA/IGN1cnIuX3JvdXRlQ29uZmlnLmNhbkRlYWN0aXZhdGUgOiBudWxsO1xuICAgIGlmICghY2FuRGVhY3RpdmF0ZSB8fCBjYW5EZWFjdGl2YXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mICh0cnVlKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tKGNhbkRlYWN0aXZhdGUpXG4gICAgICAgIC5tYXAoYyA9PiB7XG4gICAgICAgICAgY29uc3QgZ3VhcmQgPSB0aGlzLmluamVjdG9yLmdldChjKTtcbiAgICAgICAgICBpZiAoZ3VhcmQuY2FuRGVhY3RpdmF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBJbnRvT2JzZXJ2YWJsZShndWFyZC5jYW5EZWFjdGl2YXRlKGNvbXBvbmVudCwgY3VyciwgdGhpcy5jdXJyKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwSW50b09ic2VydmFibGUoZ3VhcmQoY29tcG9uZW50LCBjdXJyLCB0aGlzLmN1cnIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5tZXJnZUFsbCgpXG4gICAgICAgIC5ldmVyeShyZXN1bHQgPT4gcmVzdWx0ID09PSB0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwSW50b09ic2VydmFibGU8VD4odmFsdWU6IFQgfCBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9mICh2YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgQWN0aXZhdGVSb3V0ZXMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZ1dHVyZVN0YXRlOiBSb3V0ZXJTdGF0ZSwgcHJpdmF0ZSBjdXJyU3RhdGU6IFJvdXRlclN0YXRlKSB7fVxuXG4gIGFjdGl2YXRlKHBhcmVudE91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gICAgY29uc3QgZnV0dXJlUm9vdCA9IHRoaXMuZnV0dXJlU3RhdGUuX3Jvb3Q7XG4gICAgY29uc3QgY3VyclJvb3QgPSB0aGlzLmN1cnJTdGF0ZSA/IHRoaXMuY3VyclN0YXRlLl9yb290IDogbnVsbDtcblxuICAgIHB1c2hRdWVyeVBhcmFtc0FuZEZyYWdtZW50KHRoaXMuZnV0dXJlU3RhdGUpO1xuICAgIHRoaXMuYWN0aXZhdGVDaGlsZFJvdXRlcyhmdXR1cmVSb290LCBjdXJyUm9vdCwgcGFyZW50T3V0bGV0TWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVDaGlsZFJvdXRlcyhcbiAgICAgIGZ1dHVyZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPixcbiAgICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gICAgY29uc3QgcHJldkNoaWxkcmVuOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcbiAgICBmdXR1cmVOb2RlLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlUm91dGVzKGMsIHByZXZDaGlsZHJlbltjLnZhbHVlLm91dGxldF0sIG91dGxldE1hcCk7XG4gICAgICBkZWxldGUgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XTtcbiAgICB9KTtcbiAgICBmb3JFYWNoKFxuICAgICAgICBwcmV2Q2hpbGRyZW4sXG4gICAgICAgICh2OiBhbnksIGs6IHN0cmluZykgPT4gdGhpcy5kZWFjdGl2YXRlT3V0bGV0QW5kSXRDaGlsZHJlbihvdXRsZXRNYXAuX291dGxldHNba10pKTtcbiAgfVxuXG4gIGFjdGl2YXRlUm91dGVzKFxuICAgICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LCBjdXJyTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LFxuICAgICAgcGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmUgPSBmdXR1cmVOb2RlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcblxuICAgIGNvbnN0IG91dGxldCA9IGdldE91dGxldChwYXJlbnRPdXRsZXRNYXAsIGZ1dHVyZU5vZGUudmFsdWUpO1xuXG4gICAgaWYgKGZ1dHVyZSA9PT0gY3Vycikge1xuICAgICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKGZ1dHVyZSk7XG4gICAgICB0aGlzLmFjdGl2YXRlQ2hpbGRSb3V0ZXMoZnV0dXJlTm9kZSwgY3Vyck5vZGUsIG91dGxldC5vdXRsZXRNYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKG91dGxldCk7XG4gICAgICBjb25zdCBvdXRsZXRNYXAgPSBuZXcgUm91dGVyT3V0bGV0TWFwKCk7XG4gICAgICB0aGlzLmFjdGl2YXRlTmV3Um91dGVzKG91dGxldE1hcCwgZnV0dXJlLCBvdXRsZXQpO1xuICAgICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIG51bGwsIG91dGxldE1hcCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZU5ld1JvdXRlcyhcbiAgICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCBmdXR1cmU6IEFjdGl2YXRlZFJvdXRlLCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIGNvbnN0IHJlc29sdmVkID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmUoW1xuICAgICAge3Byb3ZpZGU6IEFjdGl2YXRlZFJvdXRlLCB1c2VWYWx1ZTogZnV0dXJlfSxcbiAgICAgIHtwcm92aWRlOiBSb3V0ZXJPdXRsZXRNYXAsIHVzZVZhbHVlOiBvdXRsZXRNYXB9XG4gICAgXSk7XG4gICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKGZ1dHVyZSk7XG4gICAgb3V0bGV0LmFjdGl2YXRlKGZ1dHVyZS5fZnV0dXJlU25hcHNob3QuX3Jlc29sdmVkQ29tcG9uZW50RmFjdG9yeSwgZnV0dXJlLCByZXNvbHZlZCwgb3V0bGV0TWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4ob3V0bGV0OiBSb3V0ZXJPdXRsZXQpOiB2b2lkIHtcbiAgICBpZiAob3V0bGV0ICYmIG91dGxldC5pc0FjdGl2YXRlZCkge1xuICAgICAgZm9yRWFjaChcbiAgICAgICAgICBvdXRsZXQub3V0bGV0TWFwLl9vdXRsZXRzLCAodjogUm91dGVyT3V0bGV0KSA9PiB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHYpKTtcbiAgICAgIG91dGxldC5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHB1c2hRdWVyeVBhcmFtc0FuZEZyYWdtZW50KHN0YXRlOiBSb3V0ZXJTdGF0ZSk6IHZvaWQge1xuICBpZiAoIXNoYWxsb3dFcXVhbChzdGF0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcywgKDxhbnk+c3RhdGUucXVlcnlQYXJhbXMpLnZhbHVlKSkge1xuICAgICg8YW55PnN0YXRlLnF1ZXJ5UGFyYW1zKS5uZXh0KHN0YXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5zbmFwc2hvdC5mcmFnbWVudCAhPT0gKDxhbnk+c3RhdGUuZnJhZ21lbnQpLnZhbHVlKSB7XG4gICAgKDxhbnk+c3RhdGUuZnJhZ21lbnQpLm5leHQoc3RhdGUuc25hcHNob3QuZnJhZ21lbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vZGVDaGlsZHJlbkFzTWFwKG5vZGU6IFRyZWVOb2RlPGFueT4pIHtcbiAgcmV0dXJuIG5vZGUgPyBub2RlLmNoaWxkcmVuLnJlZHVjZSgobTogYW55LCBjOiBUcmVlTm9kZTxhbnk+KSA9PiB7XG4gICAgbVtjLnZhbHVlLm91dGxldF0gPSBjO1xuICAgIHJldHVybiBtO1xuICB9LCB7fSkgOiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0bGV0KG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCByb3V0ZTogQWN0aXZhdGVkUm91dGUpOiBSb3V0ZXJPdXRsZXQge1xuICBsZXQgb3V0bGV0ID0gb3V0bGV0TWFwLl9vdXRsZXRzW3JvdXRlLm91dGxldF07XG4gIGlmICghb3V0bGV0KSB7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZSA9ICg8YW55PnJvdXRlLmNvbXBvbmVudCkubmFtZTtcbiAgICBpZiAocm91dGUub3V0bGV0ID09PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBwcmltYXJ5IG91dGxldCB0byBsb2FkICcke2NvbXBvbmVudE5hbWV9J2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIHRoZSBvdXRsZXQgJHtyb3V0ZS5vdXRsZXR9IHRvIGxvYWQgJyR7Y29tcG9uZW50TmFtZX0nYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRsZXQ7XG59XG4iXX0=