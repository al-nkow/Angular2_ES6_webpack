import { Component } from '@angular/core';

import template from './scsspug-comp.template.pug';
import styles from './scsspug-comp.base.scss';

@Component({
    selector: 'scss-pug',
    template: template,
    styles: [styles]
})
export class ScssPugComponent {

    clickItem() {
        console.log('Click my button!');
    }

}