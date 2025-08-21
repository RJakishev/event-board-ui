import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { authInterceptor, authInterceptor1, authInterceptor11, authInterceptor2 } from './core/auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
// import { SampleInterceptor } from './SampleInterceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor1])),
    // provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([
        JwtModule.forRoot({
          config: {
            // tokenGetter: () => localStorage.getItem('token'),
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:8080'],
          }
        })
      ])
        // { provide: HTTP_INTERCEPTORS, useClass: authInterceptor2, multi: true }
    //     {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthHttpInterceptor,
    //   multi: true,
    // },
// provideHttpClient(withInterceptorsFromDi()),  
//         {
//             provide:HTTP_INTERCEPTORS,
//             useClass:SampleInterceptor,
//             multi:true
//         }
  ]
};


export function tokenGetter() {
  console.log(localStorage.getItem('token'));
  
  // debugger
  return localStorage.getItem('token'); // where you store your token
}
