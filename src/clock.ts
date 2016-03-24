import {Component, Input} from 'angular2/core';

@Component({
    selector: 'clock',
    template: `<h3>{{time | date:'yMMMMEEEEdjms'}}</h3>`
})
export class Clock {
    @Input()
    time;
}