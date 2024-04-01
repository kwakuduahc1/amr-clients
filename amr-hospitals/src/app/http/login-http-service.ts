import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRoles, IUsers, LoginVm, RegisterVm } from '../model/IUsers';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class LoginHttpService {
  http = inject(HttpClient);

  login(st: LoginVm): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.AppUrl}Auth/Login`, st);
  }

  signout(): Observable<any> {
    return this.http.post(`${environment.AppUrl}Auth/Signout`, {});
  }

  register(usr: RegisterVm): Observable<IUsers> {
    return this.http.post<IUsers>(`${environment.AppUrl}Auth/AddDE`, usr);
  }

  delete(user: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(environment.AppUrl + `Users/RemoveUser`, user);
  }

  roles(): Observable<IRoles[]> {
    return this.http.get<IRoles[]>(environment.AppUrl + `Roles/`)
  }
}

