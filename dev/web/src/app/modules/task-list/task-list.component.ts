import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListService } from '../../shared/components/item-list/item-list.service';
import { PagesRoues } from '../../shared/components/item-list/item-list.view-model';
import { TaskListViewModel } from './task-list.view-model';
import { ItemListFilter } from '../../shared/models/item-list-filter';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'vth-task-list',
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
    viewModel: TaskListViewModel;

    constructor(
        private _route: ActivatedRoute,
        private _itemListService: ItemListService
    ) { }

    ngOnInit() {
        this.viewModel = new TaskListViewModel();

        // this is called first time
        this.viewModel.pageType = this._route.snapshot.data.type;
        this.refreshView(this.viewModel.pageType);
    }

    onItemDeleted() {
        // TODO show progress indicator
        this.refreshView(this.viewModel.pageType);
    }

    // helper methods

    private refreshView(page: string) {
        const filter = new ItemListFilter();

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
