var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("dispatcher", ['rxjs/Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1;
    var Dispatcher;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            Dispatcher = (function (_super) {
                __extends(Dispatcher, _super);
                function Dispatcher() {
                    _super.apply(this, arguments);
                }
                Dispatcher.prototype.dispatch = function (action) {
                    this.next(action);
                };
                return Dispatcher;
            }(Subject_1.Subject));
            exports_1("Dispatcher", Dispatcher);
        }
    }
});
System.register("store-backend", ['rxjs/add/operator/let', 'rxjs/add/operator/scan'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var ActionTypes, StoreBackend;
    return {
        setters:[
            function (_1) {},
            function (_2) {}],
        execute: function() {
            exports_2("ActionTypes", ActionTypes = {
                INIT: '@@ngrx/INIT'
            });
            StoreBackend = (function () {
                function StoreBackend(_dispatcher, _reducer, _initialState, _preMiddleware, _postMiddleware) {
                    if (_preMiddleware === void 0) { _preMiddleware = function (t) { return t; }; }
                    if (_postMiddleware === void 0) { _postMiddleware = function (t) { return t; }; }
                    this._dispatcher = _dispatcher;
                    this._reducer = _reducer;
                    this._initialState = _initialState;
                    this._preMiddleware = _preMiddleware;
                    this._postMiddleware = _postMiddleware;
                }
                StoreBackend.prototype._init = function () {
                    this._dispatcher.dispatch({ type: ActionTypes.INIT });
                };
                StoreBackend.prototype.connect = function (nextCallbackFn) {
                    var _this = this;
                    this._dispatcher
                        .let(this._preMiddleware)
                        .scan(function (state, action) { return _this._reducer(state, action); }, this._initialState)
                        .let(this._postMiddleware)
                        .subscribe(nextCallbackFn);
                    this._init();
                };
                StoreBackend.prototype.replaceReducer = function (reducer) {
                    this._reducer = reducer;
                    this._init();
                };
                return StoreBackend;
            }());
            exports_2("StoreBackend", StoreBackend);
        }
    }
});
System.register("store", ['rxjs/subject/BehaviorSubject', 'rxjs/add/operator/map', 'rxjs/add/operator/distinctUntilChanged'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var BehaviorSubject_1;
    var Store;
    return {
        setters:[
            function (BehaviorSubject_1_1) {
                BehaviorSubject_1 = BehaviorSubject_1_1;
            },
            function (_3) {},
            function (_4) {}],
        execute: function() {
            Store = (function (_super) {
                __extends(Store, _super);
                function Store(_dispatcher, _backend, initialState) {
                    var _this = this;
                    _super.call(this, initialState);
                    this._dispatcher = _dispatcher;
                    this._backend = _backend;
                    _backend.connect(function (state) { return _super.prototype.next.call(_this, state); });
                }
                Store.prototype.select = function (keyOrSelector) {
                    if (typeof keyOrSelector === 'string' ||
                        typeof keyOrSelector === 'number' ||
                        typeof keyOrSelector === 'symbol') {
                        return this.map(function (state) { return state[keyOrSelector]; }).distinctUntilChanged();
                    }
                    else if (typeof keyOrSelector === 'function') {
                        return this.map(keyOrSelector).distinctUntilChanged();
                    }
                    else {
                        throw new TypeError("Store@select Unknown Parameter Type: "
                            + ("Expected type of function or valid key type, got " + typeof keyOrSelector));
                    }
                };
                Store.prototype.getState = function () {
                    return this.value;
                };
                Store.prototype.dispatch = function (action) {
                    this._dispatcher.dispatch(action);
                };
                Store.prototype.next = function (action) {
                    this._dispatcher.next(action);
                };
                Store.prototype.error = function (error) {
                    this._dispatcher.error(error);
                };
                Store.prototype.replaceReducer = function (reducer) {
                    this._backend.replaceReducer(reducer);
                };
                return Store;
            }(BehaviorSubject_1.BehaviorSubject));
            exports_3("Store", Store);
        }
    }
});
System.register("interfaces", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("utils", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var compose;
    function combineReducers(reducers) {
        var reducerKeys = Object.keys(reducers);
        var finalReducers = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            if (typeof reducers[key] === 'function') {
                finalReducers[key] = reducers[key];
            }
        }
        var finalReducerKeys = Object.keys(finalReducers);
        return function combination(state, action) {
            if (state === void 0) { state = {}; }
            var hasChanged = false;
            var nextState = {};
            for (var i = 0; i < finalReducerKeys.length; i++) {
                var key = finalReducerKeys[i];
                var reducer = finalReducers[key];
                var previousStateForKey = state[key];
                var nextStateForKey = reducer(previousStateForKey, action);
                nextState[key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }
            return hasChanged ? nextState : state;
        };
    }
    exports_5("combineReducers", combineReducers);
    return {
        setters:[],
        execute: function() {
            exports_5("compose", compose = function () {
                var funcs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    funcs[_i - 0] = arguments[_i];
                }
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (funcs.length === 0) {
                        return args[0];
                    }
                    var last = funcs[funcs.length - 1];
                    var rest = funcs.slice(0, -1);
                    return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
                };
            });
        }
    }
});
System.register("ng2", ['angular2/core', "dispatcher", "store", "store-backend", "utils"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_1, dispatcher_1, store_1, store_backend_1, utils_1;
    var PRE_MIDDLEWARE, POST_MIDDLEWARE, RESOLVED_PRE_MIDDLEWARE, RESOLVED_POST_MIDDLEWARE, REDUCER, INITIAL_STATE, dispatcherProvider, storeProvider, storeBackendProvider, resolvedPreMiddlewareProvider, resolvedPostMiddlewareProvider;
    function provideStore(reducer, initialState) {
        return [
            core_1.provide(REDUCER, {
                useFactory: function () {
                    if (typeof reducer === 'function') {
                        return reducer;
                    }
                    return utils_1.combineReducers(reducer);
                }
            }),
            core_1.provide(INITIAL_STATE, {
                deps: [REDUCER],
                useFactory: function (reducer) {
                    if (initialState === undefined) {
                        return reducer(undefined, { type: store_backend_1.ActionTypes.INIT });
                    }
                    return initialState;
                }
            }),
            core_1.provide(PRE_MIDDLEWARE, { multi: true, useValue: (function (T) { return T; }) }),
            core_1.provide(POST_MIDDLEWARE, { multi: true, useValue: (function (T) { return T; }) }),
            dispatcherProvider,
            storeProvider,
            storeBackendProvider,
            resolvedPreMiddlewareProvider,
            resolvedPostMiddlewareProvider
        ];
    }
    exports_6("provideStore", provideStore);
    function usePreMiddleware() {
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i - 0] = arguments[_i];
        }
        return provideMiddlewareForToken(PRE_MIDDLEWARE, middleware);
    }
    exports_6("usePreMiddleware", usePreMiddleware);
    function usePostMiddleware() {
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i - 0] = arguments[_i];
        }
        return provideMiddlewareForToken(POST_MIDDLEWARE, middleware);
    }
    exports_6("usePostMiddleware", usePostMiddleware);
    function createMiddleware(useFactory, deps) {
        return core_1.provide(new core_1.OpaqueToken('@ngrx/store middleware'), {
            deps: deps,
            useFactory: useFactory
        });
    }
    exports_6("createMiddleware", createMiddleware);
    function provideMiddlewareForToken(token, _middleware) {
        function isProvider(t) {
            return t instanceof core_1.Provider;
        }
        var provider = core_1.provide(token, {
            multi: true,
            deps: [core_1.Injector],
            useFactory: function (injector) {
                var middleware = _middleware.map(function (m) {
                    if (isProvider(m)) {
                        return injector.get(m.token);
                    }
                    return m;
                });
                return utils_1.compose.apply(void 0, middleware);
            }
        });
        return _middleware.filter(isProvider).concat([provider]);
    }
    exports_6("provideMiddlewareForToken", provideMiddlewareForToken);
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dispatcher_1_1) {
                dispatcher_1 = dispatcher_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (store_backend_1_1) {
                store_backend_1 = store_backend_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            exports_6("PRE_MIDDLEWARE", PRE_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/pre-middleware'));
            exports_6("POST_MIDDLEWARE", POST_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/post-middleware'));
            exports_6("RESOLVED_PRE_MIDDLEWARE", RESOLVED_PRE_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/resolved-pre-middleware'));
            exports_6("RESOLVED_POST_MIDDLEWARE", RESOLVED_POST_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/resolved-post-middleware'));
            exports_6("REDUCER", REDUCER = new core_1.OpaqueToken('ngrx/store/reducer'));
            exports_6("INITIAL_STATE", INITIAL_STATE = new core_1.OpaqueToken('ngrx/store/initial-state'));
            dispatcherProvider = core_1.provide(dispatcher_1.Dispatcher, {
                useFactory: function () {
                    return new dispatcher_1.Dispatcher();
                }
            });
            storeProvider = core_1.provide(store_1.Store, {
                deps: [dispatcher_1.Dispatcher, store_backend_1.StoreBackend, INITIAL_STATE],
                useFactory: function (dispatcher, backend, initialState) {
                    return new store_1.Store(dispatcher, backend, initialState);
                }
            });
            storeBackendProvider = core_1.provide(store_backend_1.StoreBackend, {
                deps: [dispatcher_1.Dispatcher, REDUCER, INITIAL_STATE, RESOLVED_PRE_MIDDLEWARE, RESOLVED_POST_MIDDLEWARE],
                useFactory: function (dispatcher, reducer, initialState, preMiddleware, postMiddleware) {
                    return new store_backend_1.StoreBackend(dispatcher, reducer, initialState, preMiddleware, postMiddleware);
                }
            });
            resolvedPreMiddlewareProvider = core_1.provide(RESOLVED_PRE_MIDDLEWARE, {
                deps: [PRE_MIDDLEWARE],
                useFactory: function (middleware) {
                    return utils_1.compose.apply(void 0, middleware);
                }
            });
            resolvedPostMiddlewareProvider = core_1.provide(RESOLVED_POST_MIDDLEWARE, {
                deps: [POST_MIDDLEWARE],
                useFactory: function (middleware) {
                    return utils_1.compose.apply(void 0, middleware);
                }
            });
        }
    }
});
System.register("@ngrx/store", ["store", "utils", "dispatcher", "store-backend", "ng2"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_7(exports);
    }
    return {
        setters:[
            function (store_2_1) {
                exportStar_1(store_2_1);
            },
            function (utils_2_1) {
                exportStar_1(utils_2_1);
            },
            function (dispatcher_2_1) {
                exportStar_1(dispatcher_2_1);
            },
            function (store_backend_2_1) {
                exportStar_1(store_backend_2_1);
            },
            function (ng2_1_1) {
                exportStar_1(ng2_1_1);
            }],
        execute: function() {
        }
    }
});
