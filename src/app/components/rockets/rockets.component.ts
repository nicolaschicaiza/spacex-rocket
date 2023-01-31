import { Component, OnInit } from '@angular/core';
import { CreateRocketDTO, Rocket, UpdateRocketDTO } from 'src/app/models/rocket.model';
import { RocketService } from 'src/app/services/rocket.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-rockets',
    templateUrl: './rockets.component.html',
    styleUrls: ['./rockets.component.scss']
})
export class RocketsComponent implements OnInit {

    rockets: Rocket[] = [];
    rocket: Rocket = {
        id: '',
        name: '',
        description: '',
        country: '',
        height: 0,
        flickr_images: [],
    };
    showRocketDetail = false;
    statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
    updateRocket = false;
    createRocket = false;
    showPanel: 'detailRocket' | 'updateRocket' | 'createRocket' | 'hidden' = 'hidden';
    idSave = '';


    constructor(
        private rocketService: RocketService
    ) { }

    ngOnInit(): void {
        this.rocketService.getAllRocket()
            .subscribe(data => {
                this.rockets = this.rockets.concat(data);
            })
    }

    toggleRocketDetail() {
        // Cuando está cerrado el panel, panel = false, view = false => No hacer nada
        // Cuando se abre el panel, panel = true, view = false => Pasar
        // Cuando se edita, panel = true, view = true => retornar
        // Cuando se cierra el panel, panel = false, view = false => ultimo
        if (this.showRocketDetail === true && this.updateRocket === true) {
            this.showRocketDetail = false;
            this.updateRocket = false;
        } else if (this.showRocketDetail === false && this.updateRocket === false) {
            this.showRocketDetail = true;
        } else if (this.showRocketDetail === true && this.updateRocket === false) {
            this.showRocketDetail = false
        }
    }

    onShowPanel(id: string) {
        this.statusDetail = 'loading';
        this.idSave = id;

        // En caso de que den dos veces al botón solo ocultara los detalles (para no ir a darle al botón de cerrar)
        if (this.rocket.id != '' && this.rocket.id == id && this.showRocketDetail == true) {
            this.showPanel = 'detailRocket';
            this.showRocketDetail = !this.showRocketDetail;
            this.statusDetail = 'success';
            return;
        }

        // En caso de que seleccionen el mismo rocket ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
        if (this.rocket.id != '' && this.rocket.id == id && this.showRocketDetail == false) {
            this.showPanel = 'detailRocket';
            this.showRocketDetail = true;
            this.statusDetail = 'success';
            return;
        }

        // En caso de que le den al botón de ver detalles mientras ya está abierto el panel de un rocket diferente cierra el panel de detalles
        if (this.rocket.id != '' && this.rocket.id != id && this.showRocketDetail == true) {
            this.showPanel = 'hidden';
            this.showRocketDetail = false;
        }
        this.rocketService.getRocket(id)
            .subscribe(data => {
                this.rocket = data;
                if (!this.showRocketDetail && this.rocket.id != null) {
                    this.statusDetail = 'success';
                    this.showPanel = 'detailRocket'
                    this.showRocketDetail = true;
                }
            }, errorMsg => {
                this.statusDetail = 'error';
                Swal.fire({
                    title: 'Not found rocket',
                    text: 'Este cohete no existe en el sistema',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            });
    }

    onShowCreate() {
        this.showPanel = 'createRocket';
        this.showRocketDetail = true;
        this.rocket.flickr_images = [`https://placeimg.com/640/480/any?random=${Math.random()}`];
    }

    createNewRocket(rocket: Rocket) {
        console.log(rocket);
        this.rocketService.createRocket(rocket)
            .subscribe(data => {
                this.rockets.push(data);
            })
    }

    update() {
        const id = this.rocket.id;
        const changes: UpdateRocketDTO = {
            name: 'Nuevo Rocket'
        }
        this.rocketService.updateRocket(changes, id)
            .subscribe(data => {
                this.rocket = data;
                this.rockets = this.rockets.map((item) => {
                    if (item.id === data.id) {
                        return data;
                    }
                    return item;
                })
            })
    }

    deleteRocket() {
        const id = this.rocket.id;
        this.rocketService.deleteRocket(id)
            .subscribe(() => {
                const rocketIndex = this.rockets.findIndex(item => item.id === this.rocket.id);
                this.rockets.splice(rocketIndex, 1);
                this.showRocketDetail = false;
            })
    }

    onChangeView() {
        this.showPanel = 'updateRocket';
        this.rocketService.getRocket(this.idSave)
            .subscribe(data => {
                this.rocket = data;
                if (!this.showRocketDetail && this.rocket.id != null) {
                    this.statusDetail = 'success';
                    this.showPanel = 'detailRocket'
                    this.showRocketDetail = true;
                }
            }, errorMsg => {
                this.statusDetail = 'error';
                Swal.fire({
                    title: 'Not found rocket',
                    text: 'Este cohete no existe en el sistema',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            });
    }

    saveAndBack() {
        this.showPanel = 'detailRocket';
        this.rocketService.updateRocket(this.rocket, this.rocket.id)
            .subscribe(data => {
                const rocketIndex = this.rockets.findIndex(item => item.id === this.rocket.id);
                this.rockets.splice(rocketIndex, 1, data);
            });
    }

    saveAndClose() {
        if (this.rocket.name != '' && this.rocket.country != '' && this.rocket.description != '' && this.rocket.height != 0) {
            this.rocketService.createRocket(this.rocket)
                .subscribe(data => {
                    this.rockets.unshift(data);
                })
            this.showPanel = 'hidden';
            this.showRocketDetail = false;
            this.rocket = {
                id: '',
                name: '',
                description: '',
                country: '',
                height: 0,
                flickr_images: [],
            };
        } else {
            this.statusDetail = 'error';
            Swal.fire({
                title: 'Registro incompleto',
                text: 'Por favor, complete todos los campos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        };
    }
}
