import {Component, OnInit} from '@angular/core';
import {Observable, SubscriptionLike as ISubscription} from 'rxjs';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {ItemListService} from '../../shared/components/item-list/item-list.service';
import {PagesRoues} from '../../shared/components/item-list/item-list.view-model';
import {TaskListItemViewModel, TaskListViewModel} from './task-list.view-model';
import {ItemListFilter} from '../../shared/models/item-list-filter';

@Component({
  selector: 'vth-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  private _routeSubs: ISubscription;
  viewModel: TaskListViewModel;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _itemListService: ItemListService) {
  }

  ngOnInit() {
    this.viewModel = new TaskListViewModel();

    this._routeSubs = this._router.events.subscribe(p => {
      if (p instanceof ActivationEnd) {
        const pageParam = this._route.snapshot.params['page'];
        this.refreshView(pageParam);
      }
    });

    // this is called first time
    const page = this._route.snapshot.params['page'];
    this.refreshView(page);
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

    switch (page) {

      case PagesRoues.PriorityBox:
        filter.date = new Date(Date.UTC(currDate.getFullYear(), currDate.getUTCMonth(), currDate.getUTCDate()));

        this.viewModel.items.splice(0, this.viewModel.items.length);

        // TODO ad filters
        filter.isCurrentItem = true;
        getData(this._itemListService.getItems(filter));
        break;

      case PagesRoues.Inbox:
        this.viewModel.items.splice(0, this.viewModel.items.length);

        // TODO ad filters
        filter.isNewItem = true;
        getData(this._itemListService.getItems(filter));
        break;
    }

  }

}
