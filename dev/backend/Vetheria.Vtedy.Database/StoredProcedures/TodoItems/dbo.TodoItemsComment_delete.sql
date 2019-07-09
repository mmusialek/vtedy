CREATE PROCEDURE [dbo].[TodoItemsComment_delete]
    @todoItemId uniqueidentifier,
    @todoItemCommentId uniqueidentifier
AS
    DELETE tic FROM dbo.TodoItemComments AS tic WHERE tic.TodoItemCommentId=@todoItemCommentId AND tic.TodoItemId=@todoItemId


SELECT @@ROWCOUNT
