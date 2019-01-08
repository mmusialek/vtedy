import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'vth-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onAddProjectClick() {
    this._router.navigate(['../project-management']);
  }

}
