import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import {Subject} from "rxjs/Subject";
import {Store} from '@ngrx/store';
import {SECOND, HOUR, ADVANCE} from './reducers';
import {Clock} from './clock';

@Component({
    selector: 'app',
    directives:[Clock],
    template: `
        <input #inputNum type="number" value="0">
        <button (click)="click$.next(inputNum.value)">Update</button>
        <clock [time]="time | async"></clock>
        
        <div (click)="person$.next(person)" *ngFor="#person of people | async">
            {{person.name}} is in {{person.time | date:'jms'}}        
        </div>
        `
})
export class App {
    click$ = new Subject()
        .map((value)=> ({type:HOUR, payload:parseInt(value)}));

    person$ = new Subject()
        .map((value)=>({payload: value, type:ADVANCE}));
    
    seconds$ = Observable
        .interval(1000)
        .mapTo({type: SECOND, payload:1});

    time;
    people;

    constructor(store:Store) {
        this.time = store.select('clock');
        this.people = store.select('people');

        Observable.merge(
            this.click$,
            this.seconds$,
            this.person$
        )
            .subscribe(store.dispatch.bind(store))
    }
}