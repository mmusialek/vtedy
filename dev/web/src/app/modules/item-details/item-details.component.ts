import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { ItemDetailsService } from './item-details.service';
import { ItemDetailsViewModel, ItemDataViewModel, CommentViewModel } from './item-details.view-model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { takeWhile, switchMap } from 'rxjs/operators';

@Component({
    selector: 'vth-item-details',
    templateUrl: './item-details.component.html'
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

    viewModel: ItemDetailsViewModel = new ItemDetailsViewModel();
    private _isAlive = true;

    @Input() set details(details: ItemDataViewModel) {
        this.viewModel.item = details;
    }

    @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _itemDetailsService: ItemDetailsService) {
    }

    ngOnInit() {

        this._itemDetailsService.isDialogVisible.pipe(takeWhile(_ => this._isAlive)).subscribe(p => {
            this.viewModel.isVisible = p;
        });

        this._itemDetailsService.newDataStream.pipe(takeWhile(_ => this._isAlive)).subscribe(p => {
            this.viewModel.item = p;
        });
    }

    ngOnDestroy(): void {
        this._isAlive = false;
    }

    onCloseHandler() {
        this._itemDetailsService.hideItemDetails();
        this.viewModel.item = undefined;
        this.closeEvent.emit(false);
    }

    onPinHandler() {
        this._itemDetailsService.togglePinDialog();
        this.viewModel.isDialogPinned = this._itemDetailsService.isDialogPinned;
    }

    onItemEditClick() {
        this.viewModel.isEditItemOpened = !this.viewModel.isEditItemOpened;
    }

    onItemEditCancelClick(event: MouseEvent) {
        this.viewModel.isEditItemOpened = !this.viewModel.isEditItemOpened;
    }

    onItemEditSubmitClick(event: MouseEvent) {
        this._itemDetailsService.updateTodoItem(this.viewModel.item)
            .pipe(takeWhile(_ => this._isAlive))
            .subscribe(data => { }, error => { console.error(error); });

        this.viewModel.isEditItemOpened = !this.viewModel.isEditItemOpened;

    }

    onCommentSaveClick() {
        this._itemDetailsService.createComment({
            todoItemId: this.viewModel.item.id,
            comment: this.viewModel.item.newComment
        })
            .pipe(takeWhile(() => this._isAlive),
                switchMap(() => {
                    return this._itemDetailsService.getComments(this.viewModel.item.id);
                }))
            .subscribe(item => {
                console.log(item);
                this.viewModel.item.newComment = undefined;

                this.viewModel.item.comments.splice(0, this.viewModel.item.comments.length);
                this.viewModel.item.comments.push(...item);
            }, error => {
                // TODO error handling
                console.error(error);
            });
    }

}
