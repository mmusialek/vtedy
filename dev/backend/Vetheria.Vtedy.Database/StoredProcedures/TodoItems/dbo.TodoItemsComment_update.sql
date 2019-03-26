CREATE PROCEDURE [dbo].[TodoItemsComment_update]
    @todoItemCommentId UNIQUEIDENTIFIER,
    @content NVARCHAR(1000)
AS
    
    UPDATE dbo.ProjectComments
    SET Content=@content, ModifiedDateUtc=GETUTCDATE()
    WHERE dbo.ProjectComments.ProjectCommentId=@todoItemCommentId
    
    SELECT TOP 1 tic.TodoItemCommentId AS Id, tic.Content, tic.CreatedDateUtc, tic.ModifiedDateUtc, tic.TodoItemId, tic.UserAccountId
    FROM dbo.TodoItemComments tic
    WHERE tic.TodoItemCommentId=@todoItemCommentId

