CREATE PROCEDURE [dbo].[Projects_update]
    @id int = 0,
    @name VARCHAR(100),
    @description NVARCHAR(MAX),
    @userAccountId int
AS
    
    UPDATE dbo.Projects 
    SET Name=@name, Description=@description, UserAccountId=@userAccountId
    WHERE dbo.Projects.ProjectId=@id
    
    SELECT p.ProjectId AS Id, p.Name, p.Description, p.UserAccountId
    FROM dbo.Projects p
    WHERE p.ProjectId=@id

