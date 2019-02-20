import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserAuthenticationService} from '../user-authentication.service';
import {LoginViewModel} from './login.view-model';

@Component({
  selector: 'vth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  viewModel: LoginViewModel;

  constructor(private _router: Router,
              private _authenticationService: UserAuthenticationService) {
  }

  ngOnInit() {
    this.viewModel = new LoginViewModel();
  }

  onFormSave() {
    this._authenticationService.authenticate(this.viewModel.username, this.viewModel.password);
    this._router.navigate(['./panel']);
  }
}
