CREATE PROCEDURE [dbo].[TodoItems_get]
    @userAccountId INT,
    @projectId INT NULL,
    @isCurrent BIT,
    @statusId INT
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT ti.TodoItemId as Id, ti.Name, ti.IsCurrent, ti.StatusID, ti.ProjectId, p.ProjectId, p.Name As ProjectName, p.Description As ProjectDescription, p.UserAccountId
    FROM dbo.TodoItems ti
        INNER JOIN dbo.Projects p ON ti.ProjectId=p.ProjectId
        INNER JOIN dbo.UserAccounts ua ON p.UserAccountId=ua.UserAccountId
    WHERE ua.UserAccountId=@userAccountId 
        AND (p.ProjectId = @projectId OR @projectId IS NULL) 
        AND (ti.IsCurrent = @isCurrent OR @isCurrent IS NULL)
        AND (ti.StatusId = @statusId OR @statusId IS NULL)

