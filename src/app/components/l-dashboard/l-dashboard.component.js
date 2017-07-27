import { Component, Inject, EventEmitter, Input, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import template from './l-dashboard.template.pug';
import style from './l-dashboard.base.scss';
import mobileStyle from './l-dashboard.mobile.scss';

import { BTDashboardLayoutService } from '../../services/dashboard-layout-service';

@Component({
    'selector': 'bt-dashboard-layout',
    'template': template,
    'styles': [style, mobileStyle],
    'host': { '[class.la-open]': 'leftAsideOpen' },
})
export class BTDashboardLayoutComponent {
    @Input() leftAsideOpen;

    @Output() exit = new EventEmitter();

    constructor(@Inject(BTDashboardLayoutService) dashboardLayoutService) {
        this.dashboardLayoutService = dashboardLayoutService;

        this.leftAsideSub = this.dashboardLayoutService.leftAsideObs
            .filter(state => state !== undefined)
            .subscribe((state) => {
                this.leftAsideOpen = state;
            });
    }

    openLeftAside() {
        this.leftAsideOpen = true;
    }

    closeLeftAside() {
        this.leftAsideOpen = false;
    }

    onExit() {
        this.exit.emit(false);
    }

    ngOnDestroy() {
        this.leftAsideSub.unsubscribe();
    }
}
