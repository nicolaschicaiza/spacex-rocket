import { Component, OnInit } from '@angular/core';
import { Rocket, UpdateRocketDTO } from 'src/app/models/rocket.model';
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
        this.showRocketDetail = !this.showRocketDetail;
    }

    onShowDetail(id: string) {
        this.statusDetail = 'loading';

        // En caso de que den dos veces al botón solo ocultara los detalles (para no ir a darle al botón de cerrar)
        if (this.rocket.id != '' && this.rocket.id == id && this.showRocketDetail == true) {
            this.showRocketDetail = false;
            this.statusDetail = 'success';
            return;
        }

        // En caso de que seleccionen el mismo rocket ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
        if (this.rocket.id != '' && this.rocket.id == id && this.showRocketDetail == false) {
            this.showRocketDetail = true;
            this.statusDetail = 'success';
            return;
        }

        // En caso de que le den al botón de ver detalles mientras ya está abierto el panel de un rocket diferente cierra el panel de detalles
        if (this.rocket.id != '' && this.rocket.id != id && this.showRocketDetail == true) {
            this.showRocketDetail = false;
        }
        this.rocketService.getRocket(id)
            .subscribe(data => {
                this.rocket = data;
                if (!this.showRocketDetail && this.rocket.id != null) {
                    this.statusDetail = 'success';
                    this.toggleRocketDetail();
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

    updateRocket() {
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

}
