import { HttpInterceptorFn } from '@angular/common/http';
import { XSRFInterceptorProvider, authorizationInterceptorProvider, errorHandlerInterceptorProvider } from './jwt-authorisation.interceptor';

export const HttpInterceptorProviders: HttpInterceptorFn[] = [
  authorizationInterceptorProvider,
  XSRFInterceptorProvider,
  errorHandlerInterceptorProvider
]
