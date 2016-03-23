import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    selector: 'app',
    template: `
        <h1>{{clock | async}}</h1>
        `
})
export class App {
    clock = Observable.interval(1000);

    constructor(){
        this.clock.subscribe(console.log.bind(console));
    }
}