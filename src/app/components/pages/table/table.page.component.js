import { Component, Inject } from '@angular/core';
import template from './table.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'table-page',
    'template': template
})
export class TablePageComponent {

    constructor( @Inject(CodeHighlightService) CodeHighlight ) {
        this.CodeHighlight = CodeHighlight;
        this.modalOpen = false;
    }

    ngAfterViewInit() {
        this.CodeHighlight.init();
    }

    employees = [
        {
            "name": "Chase Bolton",
            "email": "tristique.neque.venenatis@cursusa.ca",
            "date": "20.06.2017",
            "company": "A PC"
        },
        {
            "name": "Lyle Wilcox",
            "email": "convallis.ligula@luctuslobortisClass.co.uk",
            "date": "12.09.2009",
            "company": "Nam Nulla Magna Corp."
        },
        {
            "name": "Blossom Wilkins",
            "email": "orci@semutcursus.net",
            "date": "14.05.2015",
            "company": "In Magna Corp."
        },
        {
            "name": "Velma Pollard",
            "email": "dolor@egetmetuseu.com",
            "date": "24.12.2007",
            "company": "Risus Odio Institute"
        },
        {
            "name": "Fay Ford",
            "email": "non@ultriciesadipiscingenim.ca",
            "date": "28.07.2010",
            "company": "Sed Pede LLC"
        },
        {
            "name": "Noelani Morgan",
            "email": "ornare@maurissitamet.edu",
            "date": "04.03.2011",
            "company": "Egestas Lacinia Sed Incorporated"
        },
        {
            "name": "Dominic Santos",
            "email": "dapibus.quam@velit.co.uk",
            "date": "01.08.2013",
            "company": "Lacinia Foundation"
        },
        {
            "name": "Cullen Montgomery",
            "email": "semper.Nam.tempor@ornare.com",
            "date": "05.04.2011",
            "company": "Eu Tellus Corporation"
        },
        {
            "name": "Mechelle Bruce",
            "email": "faucibus@vel.edu",
            "date": "01.03.2016",
            "company": "Eu Associates"
        },
        {
            "name": "Judith Salas",
            "email": "imperdiet.ornare@estcongue.com",
            "date": "10.11.2008",
            "company": "Nulla Tincidunt Neque Associates"
        },
        {
            "name": "Aimee Henderson",
            "email": "posuere.cubilia.Curae@Aliquamerat.ca",
            "date": "01.11.2009",
            "company": "Orci Ut Sagittis Consulting"
        },
        {
            "name": "Burton Freeman",
            "email": "aliquet@commodoatlibero.org",
            "date": "06.05.2013",
            "company": "Proin Foundation"
        },
        {
            "name": "Buffy Warner",
            "email": "elementum.lorem@Quisqueimperdiet.co.uk",
            "date": "02.12.2012",
            "company": "Dictum Consulting"
        },
        {
            "name": "Ira Brewer",
            "email": "in.magna@erat.org",
            "date": "11.11.2010",
            "company": "Nam Ligula Industries"
        },
        {
            "name": "Anthony Duncan",
            "email": "at.libero.Morbi@sitamet.net",
            "date": "31.05.2013",
            "company": "Vivamus Corp."
        },
        {
            "name": "Magee Todd",
            "email": "ligula.Aenean.euismod@cursuset.com",
            "date": "08.09.2010",
            "company": "Pellentesque Eget Dictum LLC"
        },
        {
            "name": "Callie Duke",
            "email": "ut.erat.Sed@felispurusac.ca",
            "date": "05.07.2012",
            "company": "Lectus LLP"
        },
        {
            "name": "Tashya Buchanan",
            "email": "Donec.porttitor.tellus@porttitorinterdum.co.uk",
            "date": "25.04.2015",
            "company": "Pellentesque Ut Ipsum LLC"
        },
        {
            "name": "Kitra Hendrix",
            "email": "Morbi.quis.urna@blanditat.edu",
            "date": "26.06.2014",
            "company": "Gravida Nunc Sed Industries"
        },
        {
            "name": "Kelly Barnes",
            "email": "quis@amalesuadaid.org",
            "date": "27.03.2010",
            "company": "Ante Lectus Convallis Foundation"
        },
        {
            "name": "David Gilbert",
            "email": "vitae.aliquam@atarcuVestibulum.net",
            "date": "06.09.2014",
            "company": "Ut Pellentesque Eget Industries"
        },
        {
            "name": "Melvin Ashley",
            "email": "massa@vitaesodales.edu",
            "date": "31.03.2009",
            "company": "Suspendisse Tristique Neque Consulting"
        },
        {
            "name": "Madeline Morton",
            "email": "ullamcorper@et.com",
            "date": "02.05.2014",
            "company": "Congue Elit Ltd"
        },
        {
            "name": "Jenna Pruitt",
            "email": "tellus@risus.org",
            "date": "06.11.2007",
            "company": "Ultricies Ligula Nullam Incorporated"
        },
        {
            "name": "Carissa Fuller",
            "email": "imperdiet.erat@sem.com",
            "date": "21.05.2015",
            "company": "Molestie Tortor Inc."
        },
        {
            "name": "Althea Collier",
            "email": "ac@convallisincursus.net",
            "date": "29.11.2007",
            "company": "Sapien Corp."
        },
        {
            "name": "Brianna Walls",
            "email": "cursus.in@vel.co.uk",
            "date": "15.11.2012",
            "company": "Purus Gravida Sagittis Limited"
        },
        {
            "name": "India Acosta",
            "email": "ac.orci@orci.net",
            "date": "23.10.2011",
            "company": "Urna Industries"
        },
        {
            "name": "Bree Sweet",
            "email": "cursus.non@dolortempusnon.com",
            "date": "25.12.2012",
            "company": "Mauris Sit Amet Limited"
        },
        {
            "name": "Owen Sargent",
            "email": "fringilla@congueInscelerisque.net",
            "date": "02.06.2007",
            "company": "Vel Pede Blandit Corporation"
        },
        {
            "name": "Palmer Haley",
            "email": "Nulla.tempor@sollicitudincommodo.com",
            "date": "23.04.2012",
            "company": "Vulputate Ullamcorper Magna LLC"
        },
        {
            "name": "Sybill Buckner",
            "email": "Donec.est@laciniamattis.co.uk",
            "date": "25.01.2008",
            "company": "Vulputate Lacus Company"
        },
        {
            "name": "Alec Bass",
            "email": "ullamcorper.eu.euismod@purusaccumsan.edu",
            "date": "14.11.2013",
            "company": "Quis Diam Industries"
        },
        {
            "name": "Remedios Brady",
            "email": "nonummy.ultricies.ornare@diam.com",
            "date": "16.02.2018",
            "company": "Varius Et Corporation"
        },
        {
            "name": "Leslie George",
            "email": "at@nislMaecenasmalesuada.org",
            "date": "21.02.2008",
            "company": "Faucibus Lectus A Inc."
        },
        {
            "name": "Ivana Santiago",
            "email": "justo.nec.ante@variusultrices.org",
            "date": "06.04.2009",
            "company": "Quis Diam Pellentesque Institute"
        },
        {
            "name": "Jacqueline Ruiz",
            "email": "libero.et.tristique@Proinnisl.co.uk",
            "date": "01.07.2012",
            "company": "Tempus Risus Donec Limited"
        },
        {
            "name": "Kay Mosley",
            "email": "elit.pede.malesuada@vestibulum.net",
            "date": "26.02.2006",
            "company": "Sed Est LLC"
        },
        {
            "name": "Aaron Fletcher",
            "email": "facilisis@nonarcuVivamus.net",
            "date": "23.06.2014",
            "company": "Arcu Sed Incorporated"
        },
        {
            "name": "Jackson Snyder",
            "email": "sociis.natoque@gravidasagittis.org",
            "date": "28.04.2017",
            "company": "Ipsum Leo Elementum Company"
        },
        {
            "name": "Veda Church",
            "email": "eu.tellus@scelerisque.ca",
            "date": "31.01.2016",
            "company": "Non Associates"
        },
        {
            "name": "Howard Foster",
            "email": "fermentum.risus@tellus.edu",
            "date": "16.03.2015",
            "company": "Phasellus Industries"
        },
        {
            "name": "Vladimir Cervantes",
            "email": "montes.nascetur@uterosnon.org",
            "date": "12.01.2014",
            "company": "Phasellus Ornare Fusce Ltd"
        },
        {
            "name": "Chester Cantu",
            "email": "parturient.montes.nascetur@dolor.ca",
            "date": "01.09.2011",
            "company": "Donec Felis Orci Incorporated"
        },
        {
            "name": "Moana Freeman",
            "email": "tortor.Integer@ametornare.ca",
            "date": "18.03.2012",
            "company": "Lobortis Quam Incorporated"
        },
        {
            "name": "Jessamine Booth",
            "email": "In.lorem.Donec@nequeIn.net",
            "date": "24.05.2016",
            "company": "Ullamcorper Eu Limited"
        },
        {
            "name": "Cullen Santana",
            "email": "ad.litora.torquent@Nam.ca",
            "date": "19.06.2013",
            "company": "Pretium Neque Incorporated"
        },
        {
            "name": "Kathleen Schneider",
            "email": "ligula.consectetuer@Sed.edu",
            "date": "22.03.2006",
            "company": "Vel Vulputate Consulting"
        },
        {
            "name": "Brynne Klein",
            "email": "tincidunt.vehicula@odio.ca",
            "date": "11.09.2014",
            "company": "Pede Nonummy Associates"
        },
        {
            "name": "Fletcher Serrano",
            "email": "Morbi.non@habitantmorbi.com",
            "date": "13.11.2006",
            "company": "Curabitur Industries"
        },
        {
            "name": "Callie Jenkins",
            "email": "parturient.montes.nascetur@pretium.co.uk",
            "date": "17.01.2016",
            "company": "A Scelerisque Sed Incorporated"
        },
        {
            "name": "Ria Lindsay",
            "email": "eget.mollis.lectus@egetvenenatisa.org",
            "date": "02.11.2006",
            "company": "Tellus Nunc Lectus Inc."
        },
        {
            "name": "Ifeoma Roth",
            "email": "vitae.orci.Phasellus@interdumfeugiat.org",
            "date": "06.02.2008",
            "company": "Id Institute"
        },
        {
            "name": "Joelle Wiley",
            "email": "pede.et@nascetur.ca",
            "date": "21.09.2015",
            "company": "Nisi A Odio Corporation"
        },
        {
            "name": "Alexis Bartlett",
            "email": "sed@semper.net",
            "date": "01.05.2014",
            "company": "Egestas Lacinia Associates"
        },
        {
            "name": "Abigail Warner",
            "email": "mauris@odio.com",
            "date": "15.07.2008",
            "company": "Nulla Semper Tellus Company"
        },
        {
            "name": "Katelyn Bishop",
            "email": "aliquam@vitae.org",
            "date": "06.01.2018",
            "company": "Nisl Nulla Eu Consulting"
        },
        {
            "name": "Rebecca Sargent",
            "email": "dui.lectus@diamvelarcu.ca",
            "date": "08.09.2016",
            "company": "Montes Nascetur Associates"
        },
        {
            "name": "Deanna Whitehead",
            "email": "libero.lacus@Sedmalesuadaaugue.org",
            "date": "21.06.2012",
            "company": "Nullam Vitae Inc."
        }
    ];

}