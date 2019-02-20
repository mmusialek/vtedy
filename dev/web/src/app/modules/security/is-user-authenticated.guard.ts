import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthenticationService} from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserAuthenticatedGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authenticationService: UserAuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isAuthenticated = this._authenticationService.isAuthenticated();

    console.log('isAuthenticated guard: ' + isAuthenticated);

    if (isAuthenticated) {
      return isAuthenticated;
    }

    this._router.navigate(['/login']);

    return isAuthenticated;
  }
}
