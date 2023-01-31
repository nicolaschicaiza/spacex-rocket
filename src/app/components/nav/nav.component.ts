import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateRocketDTO, Rocket } from 'src/app/models/rocket.model';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    @Output() createRocket = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    onShowCreate() {
        this.createRocket.emit();
    }

}
