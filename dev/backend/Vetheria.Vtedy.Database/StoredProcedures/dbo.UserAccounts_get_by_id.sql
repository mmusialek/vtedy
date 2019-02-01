CREATE PROCEDURE [dbo].[UserAccounts_get_by_id]
    @userId int = 0
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    SELECT TOP(1) [UserAccountId]
      ,[UserName]
      ,[Email]
      ,[Password]
  FROM [dbo].[UserAccounts] ua
  WHERE ua.UserAccountId= @userId

