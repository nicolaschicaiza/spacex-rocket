import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-img',
    templateUrl: './img.component.html',
    styleUrls: ['./img.component.scss']
})
export class ImgComponent {

    img: string = '';
    alt: string = '';

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('img')
    set changeImg(newImg: string) {
        this.img = newImg;
        // code
    }
    @Input('alt')
    set changeAlt(newAlt: string) {
        this.alt = newAlt;
    }
    @Output() loaded = new EventEmitter<string>();
    imageDefault = './assets/images/default.png';
    // counter = 0;
    // counterFn: number | undefined;

    constructor() {
        // before render
        // No async -- once time
    }

    imgError() {
        this.img = this.imageDefault;
    }

    imgLoaded() {
        this.loaded.emit(this.img);
    }

}
