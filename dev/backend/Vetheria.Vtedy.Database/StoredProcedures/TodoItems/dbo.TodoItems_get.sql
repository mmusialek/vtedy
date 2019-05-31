CREATE PROCEDURE [dbo].[TodoItems_get]
    @userAccountId INT,
    @projectId INT NULL,
    @isCurrent BIT,
    @statusId INT
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    DECLARE @todoItems table (
    TodoItemId uniqueidentifier,
    Name NVARCHAR(100),
    IsCurrent BIT,
    StatusId INT,
    ProjectId INT,
    ProjectName NVARCHAR(100),
    ProjectDescription NVARCHAR(MAX),
    UserAccountId INT)

    INSERT INTO @todoItems
    SELECT ti.TodoItemId, ti.Name, ti.IsCurrent, ti.StatusID, p.ProjectId, p.Name As ProjectName, p.Description As ProjectDescription, p.UserAccountId
    FROM dbo.TodoItems ti
        INNER JOIN dbo.Projects p ON ti.ProjectId=p.ProjectId
        INNER JOIN dbo.UserAccounts ua ON p.UserAccountId=ua.UserAccountId
    WHERE ua.UserAccountId=@userAccountId 
        AND (p.ProjectId = @projectId OR @projectId IS NULL) 
        AND (ti.IsCurrent = @isCurrent OR @isCurrent IS NULL)
        AND (ti.StatusId = @statusId OR @statusId IS NULL)

    SELECT * FROM @todoItems

    SELECT tit.TodoItemTagId, tit.TagId, t.Name, tit.TodoItemId
    FROM dbo.TodoItemTags tit 
        INNER JOIN dbo.TodoItems ti 
            ON tit.TodoItemId=ti.TodoItemId
        INNER JOIN dbo.Tags as t
            ON t.TagId=tit.TagId
    WHERE ti.TodoItemId IN (SELECT TodoItemId FROM @todoItems)


