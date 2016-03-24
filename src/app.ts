import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
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

    constructor(){
      this.clock = this.click$.map(()=> new Date());
    }
}