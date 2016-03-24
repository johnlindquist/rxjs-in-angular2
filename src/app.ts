import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'app',
    template: `
        <button (click)="click$.next()">Update</button>
        <h1>{{clock | async | date:'yMMMMEEEEdjms'}}</h1>
        `
})
export class App {
    click$ = new Subject();

    clock;

    constructor() {
        this.clock = Observable.merge(
            this.click$,
            Observable.interval(1000)
        )
            .startWith(new Date())
            .scan((acc, curr)=> {
                const date = new Date(acc.getTime());

                date.setSeconds(date.getSeconds() + 1);

                return date;
            });
    }
}