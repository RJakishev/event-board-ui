// import {CanActivateFn, Router} from '@angular/router';
// import {inject} from "@angular/core";
// import { AuthService } from '../auth/auth.service';
// // import {AuthService} from "../auth.service";

// export const accountGuard: CanActivateFn = (route, state) => {
//   console.log('accountGuard');
  
//   if (inject(AuthService).isAuthenticated()) {
//     inject(Router).navigate(['/']);
//     return false;
//   }
//   return true;
// };