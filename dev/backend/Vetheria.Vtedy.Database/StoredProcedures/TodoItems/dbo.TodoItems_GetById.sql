CREATE PROCEDURE [dbo].[TodoItems_GetById]
    @userAccountId INT,
    @todoItemId UNIQUEIDENTIFIER
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT ti.TodoItemId, ti.Name, ti.IsCurrent, ti.StatusID, p.ProjectId, p.Name, p.Description, p.IsDefault, p.UserAccountId
    FROM dbo.TodoItems ti
        INNER JOIN dbo.Projects p ON ti.ProjectId=p.ProjectId
        INNER JOIN dbo.UserAccounts ua ON p.UserAccountId=ua.UserAccountId
    WHERE ua.UserAccountId=@userAccountId AND ti.TodoItemId = @todoItemId


    SELECT tit.TodoItemTagId, tit.TagId, t.Name, tit.TodoItemId
    FROM dbo.TodoItemTags tit 
		INNER JOIN dbo.TodoItems ti 
			ON tit.TodoItemId=ti.TodoItemId
		INNER JOIN dbo.Tags as t
			ON t.TagId=tit.TagId
    WHERE ti.TodoItemId=@todoItemId


