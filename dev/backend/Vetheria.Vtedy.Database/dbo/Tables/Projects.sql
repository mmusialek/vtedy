CREATE TABLE [dbo].[Projects]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY,
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(MAX) NULL,
    [VtedyUserId] NVARCHAR(450) NOT NULL,
    CONSTRAINT [FK_VtedyUsers_VtedyUser_VtedyUserId] FOREIGN KEY ([VtedyUserId]) REFERENCES [VtedyUsers] ([Id]) ON DELETE NO ACTION
)
