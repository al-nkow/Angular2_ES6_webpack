import { Component } from '@angular/core';

@Component({
    selector: 'my-comp',
    template: `
            <span class="my-element" (click)="clickItem()">
                My First Custom Component
            </span>
    `,
    styles: [`
        .my-element { 
            display: inline-block;
            padding: 10px 20px;
            border-radius: 2px;
            background: #289895;
            font-size: 14px;
            color: #ffffff;
            cursor: pointer;
        }
        .my-element:hover {
            background: #36b5b2;
        }
    `]
})
export class MyElement {

    clickItem() {
        console.log('Click my button!');
    }

}