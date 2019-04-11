import { Component, OnInit } from '@angular/core';
import { Observable, SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ItemListService } from '../../shared/components/item-list/item-list.service';
import { PagesRoues } from '../../shared/components/item-list/item-list.view-model';
import {
  TaskListItemViewModel,
  TaskListViewModel
} from './task-list.view-model';
import { ItemListFilter } from '../../shared/models/item-list-filter';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'vth-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  private _isAlive: boolean;
  viewModel: TaskListViewModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _itemListService: ItemListService
  ) {}

  ngOnInit() {
    this.viewModel = new TaskListViewModel();
    this._isAlive = true;

    // this is called first time
    this.viewModel.pageType = this._route.snapshot.data.type;
    this.refreshView(this.viewModel.pageType);
  }

  // helper methods

  private refreshView(page: string) {
    const filter = new ItemListFilter();
    const currDate = new Date(Date.now());

    const getData = (data: Observable<TaskListItemViewModel[]>) => {
      const subscription = data.subscribe(p => {
        this.viewModel.items = p;
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    };

    // remove current items
    this.viewModel.items.splice(0, this.viewModel.items.length);

    // prepare filter
    switch (page) {
      case PagesRoues.PriorityBox:
        filter.isCurrentItem = true;
        break;

      case PagesRoues.Inbox:
        filter.isCurrentItem = false;
        // TODO add inbox project id
        break;
    }

    // get data
    let isAlive = true;
    this._itemListService
      .getItems(filter)
      .pipe(takeWhile(() => isAlive))
      .subscribe(data => {
        this.viewModel.items = data;
        isAlive = false;
      });
  }
}
