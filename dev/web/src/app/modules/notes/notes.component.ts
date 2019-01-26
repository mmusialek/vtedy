import {Component, OnInit} from '@angular/core';
import {NotesViewModel} from './notes.view-model';

@Component({
  selector: 'vth-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {

  viewModel: NotesViewModel;

  ngOnInit() {
    this.viewModel = new NotesViewModel();
  }

  onFormSave() {
    alert(this.viewModel.notes);
  }

}
