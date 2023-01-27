import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateRocketDTO, Rocket, UpdateRocketDTO } from '../models/rocket.model';

@Injectable({
    providedIn: 'root'
})
export class RocketService {

    private apiUrl = `${environment.API_URL}/rockets`;

    constructor(
        private http: HttpClient
    ) { }

    getAllRocket() {
        return this.http.get<Rocket>(this.apiUrl);
    }

    getRocket(id: string) {
        return this.http.get<Rocket>(`${this.apiUrl}/${id}`)
    }

    createRocket(dto: CreateRocketDTO) {
        return this.http.post<Rocket>(this.apiUrl, dto);
    }

    updateRocket(dto: UpdateRocketDTO, id: string) {
        return this.http.put<Rocket>(`${this.apiUrl}/${id}`, dto);
    }

    deleteRocket(id: string) {
        return this.http.delete<Rocket>(`${this.apiUrl}/${id}`);
    }
}
