CREATE PROCEDURE [dbo].[TodoItemsComment_add]
    @userAccountId INT,
    @content NVARCHAR(1000),
    @todoItemId UNIQUEIDENTIFIER
AS

    DECLARE @LastGuid TABLE (id UNIQUEIDENTIFIER NOT NULL)

    INSERT INTO [dbo].[TodoItemComments] (Content, CreatedDateUtc, ModifiedDateUtc, TodoItemId, UserAccountId)
    OUTPUT INSERTED.[TodoItemCommentId] INTO @LastGuid
    VALUES(@content, GETUTCDATE(), NULL, @todoItemId, @userAccountId);

    SELECT TOP 1 tic.TodoItemCommentId AS Id, tic.Content, tic.CreatedDateUtc, tic.ModifiedDateUtc, tic.TodoItemId, tic.UserAccountId
    FROM [dbo].[TodoItemComments] tic
    WHERE tic.TodoItemCommentId IN (SELECT TOP(1) id FROM @LastGuid);
