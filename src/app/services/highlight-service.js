/**
 * Syntax highlighting service, using highlight.js
 *
 */

import { Injectable, Inject } from '@angular/core';
import { BTImporterService } from './importer-service';

@Injectable()
export class CodeHighlightService {

    constructor( @Inject(BTImporterService) importer ) {
        this.importer = importer;
    }

    init () {
    	this.importer.prepareFiles({
            'js': ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js'],
            'css': ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/dracula.min.css'],
        }).then(() => {
            try {

                // hljs.initHighlightingOnLoad(); - not working with change routes
                var blocks = document.querySelectorAll('.hljs');
				[].forEach.call(blocks, function(block) {
					hljs.highlightBlock(block);
				});
            
            } catch (err) {
                this.logger.warn('Unable to load highlight.js');
            }
        });
    }
}
