import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ItemListItemViewModel, ItemListViewModel } from './item-list.view-model';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'vth-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {

  viewModel: ItemListViewModel = new ItemListViewModel();
  @ViewChild('newItemInput') newItemInput;
  private _routeSubs: ISubscription;

  constructor(private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {

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

  ngOnDestroy() {
    if (this._routeSubs) {
      this._routeSubs.unsubscribe();
    }
  }

  toggleAddNewItemVisibility() {
    this.viewModel.isAddNewItemVisible = !this.viewModel.isAddNewItemVisible;

    if (this.viewModel.isAddNewItemVisible) {
      const timerId = setTimeout(() => {
        this.newItemInput.nativeElement.focus();
        clearTimeout(timerId);
      }, 200);
    }
  }

  addNewItem(event, isFromActionButton: boolean = false) {
    if (!this.viewModel.newItem) {
      this.toggleAddNewItemVisibility();
      return;
    }
    if (event.code === 'Enter' || isFromActionButton) {
      this.viewModel.items.push(new ItemListItemViewModel({ name: this.viewModel.newItem }));
      this.viewModel.newItem = '';
      this.toggleAddNewItemVisibility();
    }
  }

  // helper methods

  private refreshView(page: string) {

    switch (page) {

      default:
      case PagesRoues.PriorityBox:
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'priority box line 1' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'priority box line 2' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'priority box line 3' }));
        break;

      case PagesRoues.Inbox:
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'inbox 1' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'inbox 2' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'inbox 3' }));
        break;

      case PagesRoues.Projects:
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'projects 1' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'projects 2' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'projects 3' }));
        break;

      case PagesRoues.Calendar:
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'calendar 1' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'calendar 2' }));
        this.viewModel.items.push(new ItemListItemViewModel({ name: 'calendar 3' }));
        break;
    }
  }

}

export class PagesRoues {
  // const None = ,
  static readonly PriorityBox = 'priority-box';
  static readonly Inbox = 'inbox';
  static readonly Projects = 'projects';
  static readonly Calendar = 'calendar';
}
