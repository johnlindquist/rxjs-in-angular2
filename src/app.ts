import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app',
    template: `
        <h1>{{clock | async | date:'yMMMMEEEEdjms'}}</h1>
        `
})
export class App {
    clock = Observable
        .interval(1000)
        .map(()=> new Date());
}