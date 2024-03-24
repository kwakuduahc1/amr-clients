import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Organisms } from '../model/dtos';

@Injectable({ providedIn: 'root' })
export class OrganismsHttpService {
    private http = inject(HttpClient);

    list(): Observable<Organisms[]> {
        return this.http.get<Organisms[]>(environment.AppUrl + 'Organisms/')
    }

    find(id: number): Observable<Organisms> {
        return this.http.get<Organisms>(environment.AppUrl + `Organisms/${id}`)
    }

    edit(hosp: Organisms): Observable<Organisms> {
        return this.http.put<Organisms>(environment.AppUrl + 'Organisms', hosp)
    }
}