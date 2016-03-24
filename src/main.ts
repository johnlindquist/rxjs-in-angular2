import {bootstrap} from 'angular2/platform/browser';
import {App} from './app';
import {provideStore} from '@ngrx/store';
import {clock} from './reducers';

bootstrap(App, [
    provideStore({clock})
]).then(
    ()=> console.log('App running...'),
    err=> console.log(err)
);
