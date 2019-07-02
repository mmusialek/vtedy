import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { ItemDetailsService } from './item-details.service';
import { ItemDetailsViewModel, ItemDataViewModel, CommentViewModel } from './item-details.view-model';
import { SubscriptionLike as ISubscription, of, Observable } from 'rxjs';
import { takeWhile, switchMap, catchError } from 'rxjs/operators';

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
    @Output() itemDeletedEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _itemDetailsService: ItemDetailsService) {
    }

    ngOnInit() {
        this._itemDetailsService.newDataStream.pipe(takeWhile(_ => this._isAlive)).subscribe(p => {
            this.viewModel.item = p;
        });
    }

    ngOnDestroy(): void {
        this._isAlive = false;
    }

    onCloseHandler() {
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
        this.doActionWithCommentUpdate(
            this._itemDetailsService.createComment({
                todoItemId: this.viewModel.item.id,
                comment: this.viewModel.item.newComment
            }),
            () => { this.viewModel.item.newComment = undefined; }
        );
    }

    onCommentEditClick(comment: CommentViewModel) {
        this.viewModel.item.isEditedCommentEnabled = true;
        this.viewModel.item.editedComment = comment;
    }

    onCommentDeleteClick(comment: CommentViewModel) {
        this.doActionWithCommentUpdate(this._itemDetailsService.deleteComment(this.viewModel.item.id, comment.id));
    }

    onCommentEditCancelClick() {
        this.hideCommentEdit();
    }

    onCommentEditSubmitClick() {
        this.doActionWithCommentUpdate(
            this._itemDetailsService.updateComment(this.viewModel.item.id, this.viewModel.item.editedComment),
            () => {
                this.hideCommentEdit();
            });
    }

    onTodoItemDeleteClick() {
        this._itemDetailsService.deleteTodoItem(this.viewModel.item.id)
            .pipe(takeWhile(() => this._isAlive))
            .subscribe(item => {
                this.itemDeletedEvent.emit();
                this.onCloseHandler();
            });
    }


    private hideCommentEdit() {
        this.viewModel.item.isEditedCommentEnabled = false;
        this.viewModel.item.editedComment = undefined;
    }

    private doActionWithCommentUpdate(observable: Observable<any>, successAction?: () => void) {
        observable
            .pipe(
                takeWhile(() => this._isAlive),
                catchError(() => of({})),
                switchMap(() => {
                    return this._itemDetailsService.getComments(this.viewModel.item.id);
                })
            )
            .subscribe(data => {
                if (successAction) {
                    successAction();
                }
                this.viewModel.item.comments.splice(0, this.viewModel.item.comments.length);
                this.viewModel.item.comments.push(...data);
            }, error => {
                // TODO error handling
                console.error(error);
            });
    }

}
