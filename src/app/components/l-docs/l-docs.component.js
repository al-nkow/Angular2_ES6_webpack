import { Component, ElementRef, Inject, Renderer } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';

import template from './l-docs.template.pug';
import style from './l-docs.base.scss';

import { BTLoggerService } from '../../services/logger-service';
import { BTImporterService } from '../../services/importer-service';

@Component({
    'selector': 'bt-docs-layout',
    'template': template,
    'styles': [style]
})
export class BTDocsComponent {
    constructor(
        @Inject(ElementRef) elementRef,
        @Inject(BTLoggerService) logger,
        @Inject(ActivatedRoute) route,
        @Inject(Renderer) renderer,
        @Inject(BTImporterService) importer,) {
        this.elementRef = elementRef;
        this.logger = logger;
        this.route = route;
        this.renderer = renderer;
        this.importer = importer;
    }

    ngAfterContentInit() {
        const topHeaders = [];
        const middleHeaders = [];
        const bottomHeaders = [];

        this.aside = this.elementRef.nativeElement.querySelector('aside');

        this.listenFunc = this.renderer.listen(this.aside, 'click', (event) => {
            const target = event.target || event.srcElement || event.currentTarget;

            if (!target.attributes.scrollto) return;

            document.getElementById(target.attributes.scrollto.value).scrollIntoView();
        });

        this.elementRef.nativeElement.querySelectorAll('section > article > h1').forEach((header) => {
            const headerSegments = header.id.split('--');

            if (topHeaders.indexOf(headerSegments[0]) === -1) {
                const topAnchor = document.createElement('div');
                topAnchor.id = headerSegments[0];
                header.parentElement.parentElement.insertBefore(topAnchor, header.parentElement);

                this.createMenuLink(headerSegments[0], headerSegments[0]);
                topHeaders.push(headerSegments[0]);
            }

            const middleHeaderId = `${headerSegments[0]}--${headerSegments[1]}`;
            if (middleHeaders.indexOf(middleHeaderId) === -1) {
                header.parentElement.id = middleHeaderId;

                this.createMenuLink(headerSegments[1], `${headerSegments[0]}--${headerSegments[1]}`);
                middleHeaders.push(middleHeaderId);
            }

            if (bottomHeaders.indexOf(headerSegments[2]) === -1) {
                this.createMenuLink(headerSegments[2], header.id);
                bottomHeaders.push(headerSegments[2]);
            } else {
                this.logger.warn('Conflicting ids');
            }
        });

        this.importer.prepareFiles({
            'js': ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js'],
            'css': ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/dracula.min.css'],
        }).then(() => {
            try {
                hljs.initHighlightingOnLoad();
            } catch (err) {
                this.logger.warn('Unable to load highlight.js');
            }
        });
    }

    createMenuLink(content, target) {
        const link = document.createElement('a');
        const nestingLevel = (target.match(/--/g) || []).length;

        switch (nestingLevel) {
            case 2:
                break;
            case 1:
                link.className = 'middle';
                break;
            default:
                link.className = 'top';
        }

        link.textContent = content;
        link.setAttribute('scrollto', target);
        this.aside.appendChild(link);
    }

    ngOnDestroy() {
        this.listenFunc();
    }
}
