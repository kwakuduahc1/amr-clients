import { inject } from '@angular/core';
import { Observable } from "rxjs";
import { LoginHttpService } from "../http/login-http-service";
import { IRoles, IUsers } from "../model/IUsers";
import { ResolveFn } from '@angular/router';
import { UserHttpService } from '../http/user-http-service';

export const RolesResolver: ResolveFn<Observable<IRoles[]>> = () => {
    return inject(LoginHttpService).roles();
}

export const UsersResolver: ResolveFn<Observable<IUsers[]>> = () => {
    return inject(UserHttpService).users()
}
