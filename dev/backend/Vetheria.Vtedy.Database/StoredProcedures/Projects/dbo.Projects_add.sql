CREATE PROCEDURE [dbo].[Projects_add]
    @name nvarchar(100),
    @Description nvarchar(MAX),
    @UserAccountId INT
AS
    INSERT INTO [dbo].[Projects] (Name, Description, UserAccountId) VALUES(@name, @Description, @UserAccountId)
    
    declare @projectId int;

    SELECT @projectId = SCOPE_IDENTITY()

    SELECT TOP 1 p.ProjectId AS Id, p.Name, p.Description, p.UserAccountId
    FROM dbo.Projects p
    WHERE p.UserAccountId=@UserAccountId AND p.ProjectId=@projectId
