import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inject AuthService
  const toastr = inject(ToastrService);
  const router=inject(Router);
  // Check if the user is logged in via the AuthService
 if (authService.isLoggedInGaurd){
 
  return true;

 }
 else{
  toastr.error('Please login', 'Error');
  router.navigate(['/'])
  return false

 }
};
