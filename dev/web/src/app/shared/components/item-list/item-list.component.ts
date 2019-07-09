import { Component, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemDetailsService } from '../../../modules/item-details/item-details.service';
import { ItemListService } from './item-list.service';
import { ItemListItemViewModel, ItemListViewModel, PagesRoues } from './item-list.view-model';
import { ProjectsService } from '../../services/projects.service';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'vth-item-list',
    templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {

    viewModel: ItemListViewModel = new ItemListViewModel();
    @ViewChild('newItemInput') newItemInput;
    @Input() items: ItemListItemViewModel[];
    @Input() pageType: string;
    @Output() itemDeletedEvent: EventEmitter<any> = new EventEmitter<any>();

    private _isAlive = true;

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
        this._isAlive = false;
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
        this._itemListService.getItemDetails(item.id).pipe(takeWhile(_ => this._isAlive)).subscribe(data => {
            this.viewModel.itemDetails = data;
            this.viewModel.areDetailsVisible = true;
        });
    }

    onCloseDetailsHandler(event) {
        this.closeDetails();
    }

    onItemDeleted() {
        this.itemDeletedEvent.emit();
    }

    onCloseNewItemClick(event) {
        this.toggleAddNewItemVisibility(event);
    }


    toggleAddNewItemVisibility(event, noToggle: boolean = false) {
        if (!noToggle) {
            this.viewModel.isAddNewItemVisible = !this.viewModel.isAddNewItemVisible;
        }

        if (this.viewModel.isAddNewItemVisible) {
            this.viewModel.areDetailsVisible = false;
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
            this.viewModel.areDetailsVisible = false;
        }
    }

}

