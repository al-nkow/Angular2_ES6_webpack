import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyElement } from './components/my-comp.component';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        MyElement
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
