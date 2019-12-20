import { ItemDetailsService } from './../../../modules/item-details/item-details.service';
import { Component, Input, ViewChild } from '@angular/core';
import {
    GenericListItemViewModel,
    GenericListViewModel
} from './generic-list.view-model';

@Component({
    selector: 'vth-generic-list',
    templateUrl: './generic-list.component.html'
})
export class GenericListComponent {
    constructor(private _itemDetailsService: ItemDetailsService) { }

    viewModel: GenericListViewModel = new GenericListViewModel();
    @ViewChild('newItemInput', { static: false }) newItemInput;
    @Input() items: GenericListItemViewModel[];
    @Input() config: IGenericListComponentConfig;

    @Input() areDetailsVisible = false;

    onClickOutsideInput(event) {
        if (this.config && this.config.addNewOutsideHandler) {
            this.config.addNewOutsideHandler(event);
        }
    }

    onAddNewItemVisibilityClick(event) {
        if (this.config && this.config.addNewVisibilityHandler) {
            this.config.addNewVisibilityHandler(event);
        }
    }

    onClickItemDetailsOutsideInput(event) {
        // NOTE we have to skip some event emitters for causing closing the windows

        const skipClasses = ['vth-option-panel__container__nav-container__hider', 'vth-special__no-close'];

        const canBeSkipped = (cssClasses: string) => {
            let classNamesSplit: string | string[] = cssClasses;

            let stopProcessing = false;

            if (cssClasses.includes(' ')) {
                classNamesSplit = cssClasses.split(' ');

                for (const item of classNamesSplit) {
                    if (skipClasses.includes(item)) {
                        stopProcessing = true;
                        break;
                    }
                }
            } else {
                stopProcessing = skipClasses.includes(event.className);
            }

            return stopProcessing;
        };


        if (canBeSkipped(event.className)) {
            return;
        }

        // condition for mat-button, material controls controls
        if (event.parentElement && canBeSkipped(event.parentElement.className)) {
            return;
        }

        if (this.viewModel.areDetailsVisible && event.className.indexOf('vth-generic-list__container__list__list-item') < 0) {
            this.closeDetails();
            if (this.config && this.config.clickItemDetailsOutsideInputHandler) {
                this.config.clickItemDetailsOutsideInputHandler(event);
            }
        }
    }

    onItemClickHandler(event, item) {
        this.viewModel.areDetailsVisible = true;

        if (this.config && this.config.itemClickHandler) {
            this.config.itemClickHandler(event, item);
        }
    }

    private closeDetails() {
        if (!this._itemDetailsService.isDialogPinned) {
            this.viewModel.areDetailsVisible = false;
        }
    }
}

export interface IGenericListComponentConfig {
    addNewOutsideHandler?: (event) => void;
    addNewVisibilityHandler?: (event) => void;
    itemClickHandler?: (event, item) => void;
    clickItemDetailsOutsideInputHandler?: (event) => void;
    isItemDetailAvailable?: boolean;
}
