import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthService } from '../auth/auth.service';
// import {AuthService} from "../auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  console.log('authGuard');
  
  if (!inject(AuthService).isAuthenticated()) {
    // debugger
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};