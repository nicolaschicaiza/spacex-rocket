import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rocket } from 'src/app/models/rocket.model';

@Component({
    selector: 'app-rocket',
    templateUrl: './rocket.component.html',
    styleUrls: ['./rocket.component.scss']
})
export class RocketComponent implements OnInit {

    @Input() rocket: Rocket = {
        id: '',
        name: '',
        description: '',
        country: '',
        height: 0,
        flickr_images: [],
    };
    @Output() showRocket = new EventEmitter<string>();
    showRocketDetail = false;

    constructor() { }

    ngOnInit(): void {
    }

    onShowDetail() {
        this.showRocket.emit(this.rocket.id);
    }

}
