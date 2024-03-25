import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IRoles, IUsers, URoles, IUserRoles, ApprovalVm } from 'src/model/IUsers';


@Injectable({ providedIn: 'root' })
export class UserHttpService {
  http = inject(HttpClient);

  remove(id: string): Observable<string> {
    return this.http.delete<string>(environment.AppUrl + `Users/RemoveUser/${id}`);
  }

  roles(): Observable<IRoles[]> {
    return this.http.get<IRoles[]>(environment.AppUrl + `Roles/`)
  }

  userRoles(id: string): Observable<IRoles> {
    return this.http.get<IRoles>(environment.AppUrl + `Users/Roles/${id}`)
  }

  users(): Observable<IUsers[]> {
    return this.http.get<IUsers[]>(environment.AppUrl + `Users/`)
  }

  user(id: string): Observable<IUsers> {
    return this.http.get<IUsers>(environment.AppUrl + `Users/${id}`)
  }

  add(role: URoles): Observable<IUserRoles> {
    return this.http.post<IUserRoles>(environment.AppUrl + `Users`, role);
  }

  approve(user: ApprovalVm): Observable<string> {
    return this.http.post<string>(environment.AppUrl + `Auth/Approve`, user);
  }

  unRole(uid: string, role: string): Observable<IUserRoles> {
    return this.http.delete<IUserRoles>(environment.AppUrl + `Users/${uid}/${role}`);
  }
}

