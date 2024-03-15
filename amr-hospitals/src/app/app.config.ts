import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { BsControlsModule } from '../bs-controls/bs-controls-module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HttpInterceptorProviders } from './interceptors/InterceptorProviders';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    importProvidersFrom(
      BsControlsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          // allowedDomains: [environment.AppUrl]
        },
      }),
    ),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(
      withInterceptors(HttpInterceptorProviders),
      withFetch(),
      withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })
    ),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    provideClientHydration(),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })]
};
