import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { Authservice  as AuthService} from '../login/authservice';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
