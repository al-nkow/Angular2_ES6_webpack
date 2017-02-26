import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyElement } from './components/my-component/my-comp.component';
import { ScssPugComponent } from './components/scsspug-comp/scsspug-comp.component';


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        MyElement,
        ScssPugComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
