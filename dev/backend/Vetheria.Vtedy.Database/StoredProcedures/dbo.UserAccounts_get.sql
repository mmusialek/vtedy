CREATE PROCEDURE [dbo].[UserAccounts_get]
AS
    SELECT [UserAccountId]
      ,[UserName]
      ,[Email]
      ,[Password]
  FROM [dbo].[UserAccounts]

