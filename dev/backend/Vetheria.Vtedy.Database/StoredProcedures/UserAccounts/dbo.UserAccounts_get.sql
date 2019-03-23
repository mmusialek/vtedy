CREATE PROCEDURE [dbo].[UserAccounts_get]
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    SELECT [UserAccountId] AS Id
      ,[UserName]
      ,[Email]
      ,[Password]
  FROM [dbo].[UserAccounts]

