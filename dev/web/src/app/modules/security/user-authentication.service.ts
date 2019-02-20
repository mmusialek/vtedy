import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private _isAuthenticated = false;


  authenticate(username: string, password: string) {
    // TODO integrate with API
    if (username === 'test' && password === 'test') {
      this._isAuthenticated = true;
    }
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }
}
