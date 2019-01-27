CREATE TABLE [dbo].[Projects]
(
    [ProjectId] INT NOT NULL PRIMARY KEY IDENTITY,
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(MAX) NULL,
    [UserAccountId] INT NOT NULL,
    CONSTRAINT [FK_UserAccountId_UserAccounts_UserAccountId] FOREIGN KEY ([UserAccountId]) REFERENCES [UserAccounts] ([UserAccountId]) ON DELETE NO ACTION
)
