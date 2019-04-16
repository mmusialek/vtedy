import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ItemDetailsService } from '../../../modules/item-details/item-details.service';
import { ItemListService } from './item-list.service';
import { ItemListItemViewModel, ItemListViewModel, PagesRoues } from './item-list.view-model';
import { ProjectsService } from '../../services/projects.service';

@Component({
    selector: 'vth-item-list',
    templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {

    viewModel: ItemListViewModel = new ItemListViewModel();
    @ViewChild('newItemInput') newItemInput;
    @Input() items: ItemListItemViewModel[];
    @Input() pageType: string;

    private _routeSubs: ISubscription;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _itemListService: ItemListService,
        private _itemDetailsService: ItemDetailsService,
        private _projectsService: ProjectsService) {
    }

    ngOnInit() {
        this.viewModel.genericListConfig = {
            addNewOutsideHandler: this.onClickOutsideInput.bind(this),
            addNewVisibilityHandler: this.toggleAddNewItemVisibility.bind(this),
            itemClickHandler: this.onListItemClickHandler.bind(this),
            clickItemDetailsOutsideInputHandler: this.onClickItemDetailsOutsideInput.bind(this),
            isItemDetailAvailable: true
        };
    }

    ngOnDestroy() {
        if (this._routeSubs) {
            this._routeSubs.unsubscribe();
        }
    }

    onClickOutsideInput(event) {
        if (event.className.indexOf('vth-option-panel__container__nav-container__hider') < 0) {
            this.viewModel.isAddNewItemVisible = false;
            this.viewModel.newItem = '';
        }
    }

    onClickItemDetailsOutsideInput(event) {
        if (event.className.indexOf('vth-option-panel__container__nav-container__hider') > 0) {
            return;
        }

        if (event.className.indexOf('vth-item-list__container__list__list-item') < 0) {
            this.closeDetails();
        }
    }

    onListItemClickHandler(event, item) {
        const id = item.id;

        // TODO pass object data which will be displayed
        this._itemDetailsService.showItemDetails(id);
    }

    onCloseDetailsHandler(event) {
        this.closeDetails();
    }

    onCloseNewItemClick(event) {
        this.toggleAddNewItemVisibility(event);
    }


    toggleAddNewItemVisibility(event, noToggle: boolean = false) {
        if (!noToggle) {
            this.viewModel.isAddNewItemVisible = !this.viewModel.isAddNewItemVisible;
        }

        if (this.viewModel.isAddNewItemVisible) {
            this._itemDetailsService.hideItemDetails();
            const timerId = setTimeout(() => {
                this.newItemInput.nativeElement.focus();
                clearTimeout(timerId);
            }, 200);
        }
    }

    addNewItem(event, isFromActionButton: boolean = false) {
        if (event.code === 'Enter' || isFromActionButton) {

            const newItem = new ItemListItemViewModel({ name: this.viewModel.newItem });

            if (this.pageType === PagesRoues.PriorityBox) {
                newItem.isCurrent = true;
            }

            newItem.projectId = this._projectsService.projects.find(item => item.isDefault).id;

            this._itemListService.addItem(newItem).subscribe(p => {
                this.items.push(p);
            });

            this.viewModel.newItem = '';
            this.toggleAddNewItemVisibility(true);
        }

        if (event.code === 'Escape' || isFromActionButton) {
            this.viewModel.newItem = '';
            this.toggleAddNewItemVisibility(event);
        }
    }

    private closeDetails() {
        if (!this._itemDetailsService.isDialogPinned) {
            this._itemDetailsService.hideItemDetails();
        }
    }

}

