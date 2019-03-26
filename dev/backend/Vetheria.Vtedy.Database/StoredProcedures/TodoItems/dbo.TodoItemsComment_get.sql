CREATE PROCEDURE [dbo].[TodoItemsComment_get]
    @todoitemId UNIQUEIDENTIFIER
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    SELECT tic.TodoItemCommentId AS Id, tic.Content, tic.CreatedDateUtc, tic.ModifiedDateUtc, tic.TodoItemId, tic.UserAccountId 
    FROM [dbo].[TodoItemComments] tic
    WHERE tic.TodoItemId=@todoitemId

