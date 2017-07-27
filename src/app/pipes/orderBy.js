import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy', pure: false })
export class OrderBy implements PipeTransform {

    static _orderByComparator(a, b) {
        if (!a && !b) {
            return 0;
        }
        if (!a) {
            return -1;
        }
        if (!b) {
            return 1;
        }

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            if (!isNaN(new Date(a).getDate()) && !isNaN(new Date(b).getDate())) {
                let a1 = new Date(a).getTime();
                let b1 = new Date(b).getTime();

                if (a1 < b1) return -1;
                if (a1 > b1) return 1;
            } else {

                // Isn't a number so lowercase the string to properly compare
                return a.localeCompare(b);
            }
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }

    transform(value, config) {

        if (!config) return  value;

        if (!Array.isArray(value)) return value;

        if (!Array.isArray(config) || config.length == 1) {
            let propertyToCheck = Array.isArray(config) ? config[0] : config;
            let desc = propertyToCheck.substr(0, 1) == '-';

            // Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? value.sort() : value.sort().reverse();
            }
            else {
                let property = propertyToCheck.replace('-','').replace('+','');

                return value.sort(function (a, b) {
                    let valA = a[property],
                        valB = b[property],
                        order = OrderBy._orderByComparator(valA, valB);

                    return desc ? -order: order;
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return value.sort(function (a, b) {
                for (let i = 0; i < config.length; i++) {
                    let desc = config[i].substr(0, 1) == '-';
                    let property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    let comparison = !desc
                        ? OrderBy._orderByComparator(a[property], b[property])
                        : -OrderBy._orderByComparator(a[property], b[property]);

                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0) return comparison;
                }

                return 0; //equal each other
            });
        }
    }
}
