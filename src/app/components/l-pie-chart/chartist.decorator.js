export class BTChartistDecorator {
    constructor(element, options) {
        this.options = options;
        this.element = element;
        this.pie = null;
    }

    isExists() {
        return !!this.pie;
    }

    draw(data, isPercent) {
        if (!this.isExists() && Object.keys(data).length === 0 && data.constructor === Object) {
            return;
        }
        const options = {
            labelInterpolationFnc: (label) => {
                return `${data.series[data.labels.indexOf(label)]}${isPercent ? '%' : ''}`;
            },
        };

        if (!this.isExists()) {
            this.pie = new Chartist.Pie(this.element, {}, options);
        }
        this.pie.update(data, options, true);
    }

    getLabelClass(index) {
        return `ct-series-${Chartist.alphaNumerate(index)}`;
    }
}
