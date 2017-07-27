import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent } from './components/app-component/app.component';

import { COMPONENTS } from './components/index';
import {routes} from './app.routes';

import * as pipes from './pipes';
import * as directives from './directives';
import * as services from './services';

const mapValuesToArray = obj => Object.keys(obj).map(key => obj[key]);

window.appConfig = {dev: true};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, {
            useHash: true
        }),
        Ng2PaginationModule
    ],
    declarations: [
        AppComponent,
        COMPONENTS,
        mapValuesToArray(pipes),
        mapValuesToArray(directives),
    ],
    providers: [
        FormBuilder,
        mapValuesToArray(services),
        // COMPONENTS_PROVIDERS,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
