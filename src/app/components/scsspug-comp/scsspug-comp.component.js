import { Component } from '@angular/core';

@Component({
    selector: 'scss-pug',
    template: `
            <span class="my-element" (click)="clickItem()">
                SCSS PUG COMPONENT
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
export class ScssPugComponent {

    clickItem() {
        console.log('Click my button!');
    }

}