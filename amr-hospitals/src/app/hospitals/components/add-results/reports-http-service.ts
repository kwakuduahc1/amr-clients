import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientDetails } from '../../../model/dtos';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResultsHttpService {
    private http = inject(HttpClient);

    add(hosp: PatientDetails): Observable<PatientDetails> {

        return this.http.post<PatientDetails>(environment.AppUrl + 'Cultures', hosp)
    }
}