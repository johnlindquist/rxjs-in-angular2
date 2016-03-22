import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {Store} from '@ngrx/store';

@Component({
    selector: 'app',
    template: `
    Hello world
        `
})
export class App{
    clock = Observable.interval(1000);
}

bootstrap(App);
