CREATE PROCEDURE [dbo].[Tag_add]
    @name NVARCHAR(100)
AS
    INSERT INTO dbo.[Tags](Name) 
    OUTPUT INSERTED.TagId, INSERTED.Name
    VALUES(@name)
