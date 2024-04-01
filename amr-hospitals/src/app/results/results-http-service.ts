import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensitivityResult } from '../model/dtos';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResultsHttpService {
    private http = inject(HttpClient);

    // Get the Sensitivity results from the backend
    sensitivity(hosp: number, diag: string, score: number): Observable<SensitivityResult[]> {
        return this.http.get<SensitivityResult[]>(environment.AppUrl + `Scores/Diagnosis/${hosp}/${score}/${diag}`);
    }

}