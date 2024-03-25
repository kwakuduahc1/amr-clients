import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { HttpClientModule, provideHttpClient, withInterceptors, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpInterceptorProviders } from './app/interceptors/InterceptorProviders';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    importProvidersFrom(
      // BsControlsModule,
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
  ],
});
