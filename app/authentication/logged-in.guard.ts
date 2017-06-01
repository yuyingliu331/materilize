import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AdalService} from 'ng2-adal/core';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private adalService: AdalService,
  private router: Router) {}

  canActivate() {
    if (this.adalService.userInfo.isAuthenticated) {
      let appIdUri = 'https://viacom.onmicrosoft.com/vmsapidev';

      let token;
      this.adalService.acquireToken(appIdUri).subscribe(p => {
        token = p;
        localStorage.setItem('id_token', token);
      });
      return true;
    } else {
      this.router.navigate(['/welcome']);
      return false;
    }
  }
}
