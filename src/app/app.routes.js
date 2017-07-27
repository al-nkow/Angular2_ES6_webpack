import { BTDocsPageComponent } from './components/p-docs/p-docs.component';
import { DropdownPageComponent } from './components/pages/dropdown/dropdown.page.component';
import { LabelPageComponent } from './components/pages/label/label.page.component';
import { RightAsidePageComponent } from './components/pages/right-aside/right-aside.page.component';
import { SpinnerPageComponent } from './components/pages/spinner/spinner.page.component';
import { CardPageComponent } from './components/pages/card/card.page.component';
import { MapPageComponent } from './components/pages/map/map.page.component';
import { ModalPageComponent } from './components/pages/modal/modal.page.component';
import { TablePageComponent } from './components/pages/table/table.page.component';
import { CheckboxPageComponent } from './components/pages/checkbox/checkbox.page.component';
import { PieChartPageComponent } from './components/pages/pie-chart/pie-chart.page.component';
import { LineChartPageComponent } from './components/pages/line-chart/line-chart.page.component';
import { BarChartPageComponent } from './components/pages/bar-chart/bar-chart.page.component';
import { ServerTablePageComponent } from './components/pages/server-table/server-table.page.component';
import { InputPageComponent } from './components/pages/input/input.page.component';
import { TabsPageComponent } from './components/pages/tabs/tabs.page.component';
import { DashboardPageComponent } from './components/pages/dashboard/dashboard.page.component';

export const routes = [
    {
        path: '',
        component: BTDocsPageComponent,
        children: [
            {
                path: 'dropdown',
                pathMatch: 'full',
                component: DropdownPageComponent
            },{
                path: 'label',
                pathMatch: 'full',
                component: LabelPageComponent
            },{
                path: 'rightaside',
                pathMatch: 'full',
                component: RightAsidePageComponent
            },{
                path: 'spinner',
                pathMatch: 'full',
                component: SpinnerPageComponent
            },{
                path: 'card',
                pathMatch: 'full',
                component: CardPageComponent
            },{
                path: 'map',
                pathMatch: 'full',
                component: MapPageComponent
            },{
                path: 'modal',
                pathMatch: 'full',
                component: ModalPageComponent
            },{
                path: 'table',
                pathMatch: 'full',
                component: TablePageComponent
            },{
                path: 'checkbox',
                pathMatch: 'full',
                component: CheckboxPageComponent
            },{
                path: 'piechart',
                pathMatch: 'full',
                component: PieChartPageComponent
            },{
                path: 'linechart',
                pathMatch: 'full',
                component: LineChartPageComponent
            },{
                path: 'barchart',
                pathMatch: 'full',
                component: BarChartPageComponent
            },{
                path: 'servertable',
                pathMatch: 'full',
                component: ServerTablePageComponent
            },{
                path: 'input',
                pathMatch: 'full',
                component: InputPageComponent
            },{
                path: 'tabs',
                pathMatch: 'full',
                component: TabsPageComponent
            },{
                path: 'dashboard',
                pathMatch: 'full',
                component: DashboardPageComponent
            }
        ]
    }
];