CREATE PROCEDURE [dbo].[TodoItems_GetById]
    @userAccountId INT,
    @todoItemId UNIQUEIDENTIFIER
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT ti.TodoItemId as Id, ti.Name, ti.IsCurrent, ti.StatusID, p.ProjectId, p.Name, p.Description, p.IsDefault, p.UserAccountId
    FROM dbo.TodoItems ti
        INNER JOIN dbo.Projects p ON ti.ProjectId=p.ProjectId
        INNER JOIN dbo.UserAccounts ua ON p.UserAccountId=ua.UserAccountId
    WHERE ua.UserAccountId=@userAccountId AND ti.TodoItemId = @todoItemId


    SELECT t.TagId AS Id, t.Name
    FROM dbo.Tags t INNER JOIN dbo.TodoItemTags tit ON t.TagId=tit.TagId
    WHERE tit.TodoItemId=@todoItemId


