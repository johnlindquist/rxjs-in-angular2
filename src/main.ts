import {bootstrap} from 'angular2/platform/browser';
import {App} from './app';

bootstrap(App).then(
    ()=> console.log('App running...'),
    err=> console.log(err)
);
