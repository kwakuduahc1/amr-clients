import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Antibiotics } from '../model/dtos';

@Injectable({ providedIn: 'root' })
export class AntibioticsHttpService {
    private http = inject(HttpClient);


    list(): Observable<Antibiotics[]> {
        return this.http.get<Antibiotics[]>(environment.AppUrl + `CultureAntibiotics/`)
    }

    add(hosp: Antibiotics): Observable<Antibiotics> {
        return this.http.post<Antibiotics>(environment.AppUrl + `CultureAntibiotics`, hosp)
    }

    edit(hosp: Antibiotics): Observable<Antibiotics> {
        return this.http.put<Antibiotics>(environment.AppUrl + `CultureAntibiotics`, hosp)
    }

}