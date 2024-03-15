import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs';
import { TokenProvider } from '../providers/TokenProvider';
import { ActivityProvider } from '../providers/ActivityProvider';
import { BsHandler } from '../model/bsHandler';

export const XSRFInterceptorProvider: HttpInterceptorFn = (req, next) => {
  let token = inject(HttpXsrfTokenExtractor).getToken();
  const headerName = 'X-XSRF-TOKEN';
  if (token !== null && !req.headers.has(headerName)) {
    return next(req.clone({
      headers: req.headers.append(headerName, token)
    }));
  }
  return next(req);
};

export const authorizationInterceptorProvider: HttpInterceptorFn = (req, next) => {
  return inject(TokenProvider).getHeader()
    .pipe(
      switchMap(x => next(
        req
          .clone({
            withCredentials: true,
            headers: req.headers.append('Authorization', x)
          }))))
}

export const errorHandlerInterceptorProvider: HttpInterceptorFn = (req, next) => {
  let act = inject(ActivityProvider);
  let hand = inject(BsHandler);
  act.beginProc();
  return next(req).pipe(
    tap(() => act.beginProc),
    tap({
      error: (err) => hand.onError(err),
      complete: () => act.endProc()
    }),
    // catchError(err => {
    //   let msg = hand.onError(err);
    //   throw msg;
    // }),
    finalize(() => act.endProc()),
  )
};
