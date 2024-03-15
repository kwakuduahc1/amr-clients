import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospitals } from '../model/dtos';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HospitalsHttpService {
    private http = inject(HttpClient);

    list(): Observable<Hospitals[]> {
        return this.http.get<Hospitals[]>(environment.AppUrl + 'Hospitals/')
    }

    find(id: number): Observable<Hospitals> {
        return this.http.get<Hospitals>(environment.AppUrl + `Hospitals/${id}`)
    }

    add(hosp: Hospitals): Observable<Hospitals> {
        return this.http.post<Hospitals>(environment.AppUrl + 'Hospitals', hosp)
    }

    edit(hosp: Hospitals): Observable<Hospitals> {
        return this.http.put<Hospitals>(environment.AppUrl + 'Hospitals', hosp)
    }
}