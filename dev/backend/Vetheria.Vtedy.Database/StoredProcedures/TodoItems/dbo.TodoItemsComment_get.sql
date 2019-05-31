CREATE PROCEDURE [dbo].[TodoItemsComment_get]
    @todoitemId UNIQUEIDENTIFIER
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    SELECT tic.TodoItemCommentId AS Id, tic.Content, tic.CreatedDateUtc, tic.ModifiedDateUtc, tic.TodoItemId, tic.UserAccountId, ua.UserAccountId, ua.UserName, ua.Email
    FROM [dbo].[TodoItemComments] tic
        INNER JOIN dbo.UserAccounts ua 
            ON tic.UserAccountId=ua.UserAccountId
    WHERE tic.TodoItemId=@todoitemId

