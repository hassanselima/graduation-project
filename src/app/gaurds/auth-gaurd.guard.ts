import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('ownerToken') !== null
  ) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
