declare module "dispatcher" {
    import { Subject } from 'rxjs/Subject';
    export class Dispatcher<T> extends Subject<T> {
        dispatch(action: T): void;
    }
}
declare module "store-backend" {
    import 'rxjs/add/operator/let';
    import 'rxjs/add/operator/scan';
    import { Dispatcher } from "dispatcher";
    import { Middleware, Reducer } from "interfaces";
    export const ActionTypes: {
        INIT: string;
    };
    export class StoreBackend {
        protected _dispatcher: Dispatcher<any>;
        protected _reducer: Reducer<any>;
        protected _initialState: any;
        protected _preMiddleware: Middleware;
        protected _postMiddleware: Middleware;
        constructor(_dispatcher: Dispatcher<any>, _reducer: Reducer<any>, _initialState: any, _preMiddleware?: Middleware, _postMiddleware?: Middleware);
        protected _init(): void;
        connect(nextCallbackFn: (state: any) => void): void;
        replaceReducer(reducer: Reducer<any>): void;
    }
}
declare module "store" {
    import { Observable } from 'rxjs/Observable';
    import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/distinctUntilChanged';
    import { Action, Reducer } from "interfaces";
    import { StoreBackend } from "store-backend";
    import { Dispatcher } from "dispatcher";
    export class Store<T> extends BehaviorSubject<T> {
        private _dispatcher;
        private _backend;
        constructor(_dispatcher: Dispatcher<Action>, _backend: StoreBackend, initialState?: T);
        select<R>(keyOrSelector: ((state: T) => R) | string | number | symbol): Observable<R>;
        getState(): any;
        dispatch(action: Action): void;
        next(action: any): void;
        error(error?: any): void;
        replaceReducer<V>(reducer: Reducer<V>): void;
    }
}
declare module "interfaces" {
    import { Observable } from 'rxjs/Observable';
    export interface Action {
        type: string;
        payload?: any;
    }
    export interface Reducer<T> {
        (state: T, action: Action): T;
    }
    export interface Middleware {
        (observable: Observable<any>): Observable<any>;
    }
}
declare module "utils" {
    import { Reducer } from "interfaces";
    export function combineReducers(reducers: any): Reducer<any>;
    export const compose: (...funcs: any[]) => (...args: any[]) => any;
}
declare module "ng2" {
    import { Provider } from 'angular2/core';
    import { Middleware } from "interfaces";
    export const PRE_MIDDLEWARE: any;
    export const POST_MIDDLEWARE: any;
    export const RESOLVED_PRE_MIDDLEWARE: any;
    export const RESOLVED_POST_MIDDLEWARE: any;
    export const REDUCER: any;
    export const INITIAL_STATE: any;
    export function provideStore(reducer: any, initialState?: any): any[];
    export function usePreMiddleware(...middleware: Array<Middleware | Provider>): any[];
    export function usePostMiddleware(...middleware: Array<Middleware | Provider>): any[];
    export function createMiddleware(useFactory: (...deps: any[]) => Middleware, deps?: any[]): Provider;
    export function provideMiddlewareForToken(token: any, _middleware: any[]): Provider[];
}
declare module "@ngrx/store" {
    export * from "interfaces";
    export * from "store";
    export * from "utils";
    export * from "dispatcher";
    export * from "store-backend";
    export * from "ng2";
}
