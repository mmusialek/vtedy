import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemListItemViewModel, ItemListViewModel} from './item-list.view-model';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {ItemListFilter, ItemListService} from './item-list.service';
import {ItemDetailsService} from '../item-details/item.details.service';

@Component({
  selector: 'vth-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {

  viewModel: ItemListViewModel = new ItemListViewModel();
  @ViewChild('newItemInput') newItemInput;
  private _routeSubs: ISubscription;
  private _itemDetailsOutsideClicks = 0;

  constructor(private _route: ActivatedRoute, private _router: Router, private _itemListService: ItemListService,
              private _itemDetailsService: ItemDetailsService) {
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

  onClickOutsideInput(event) {
    this.viewModel.isAddNewItemVisible = false;
  }

  onClickItemDetailsOutsideInput(event) {
    if (this.viewModel.areDetailsVisible && event.className !== 'vth-item-list__container__list__list-item') {
      this.viewModel.areDetailsVisible = false;
    }
  }

  onItemClickHandler(event: MouseEvent, item: ItemListItemViewModel) {
    const id = item.id;
    this.viewModel.areDetailsVisible = true;
    this._itemDetailsService.showItemDetails(id);
  }

  onCloseDetailsHandler(event) {
    this.viewModel.areDetailsVisible = false;
  }

  toggleAddNewItemVisibility() {
    this.viewModel.isAddNewItemVisible = !this.viewModel.isAddNewItemVisible;

    if (this.viewModel.isAddNewItemVisible) {
      this._itemDetailsService.hideItemDetails();
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
      this.viewModel.items.push(new ItemListItemViewModel({name: this.viewModel.newItem}));
      this.viewModel.newItem = '';
      this.toggleAddNewItemVisibility();
    }
  }

  // helper methods

  private refreshView(page: string) {
    const filter = new ItemListFilter();
    const currDate = new Date(Date.now());

    switch (page) {

      default:
      case PagesRoues.PriorityBox:
        filter.date = new Date(Date.UTC(currDate.getFullYear(), currDate.getUTCMonth(), currDate.getUTCDate()));

        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items = this._itemListService.getCurrentItems();
        break;

      case PagesRoues.Inbox:
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items = this._itemListService.getInboxItems();
        break;

      case PagesRoues.Projects:
        this.viewModel.items.splice(0, this.viewModel.items.length);
        this.viewModel.items = this._itemListService.getProjectsItems();
        break;

      case PagesRoues.Calendar:
        this.viewModel.items.splice(0, this.viewModel.items.length);
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
