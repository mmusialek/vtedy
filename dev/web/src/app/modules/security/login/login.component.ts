import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginViewModel} from './login.view-model';

@Component({
  selector: 'vth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  viewModel: LoginViewModel;

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.viewModel = new LoginViewModel();
  }

  onCancelClick() {
  }

  onFormSave() {
    this._router.navigate(['./panel']);
  }
}
