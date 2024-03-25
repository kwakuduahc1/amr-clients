import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginVm, RegisterVm, IUsers, IRoles } from 'src/model/IUsers';


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
    return this.http.post<IUsers>(`${environment.AppUrl}Auth/Register`, usr);
  }

  delete(user: IUsers): Observable<IUsers> {
    return this.http.post<IUsers>(environment.AppUrl + `Users/RemoveUser`, user);
  }

  roles(): Observable<IRoles[]> {
    return this.http.get<IRoles[]>(environment.AppUrl + `Roles/`)
  }
}

