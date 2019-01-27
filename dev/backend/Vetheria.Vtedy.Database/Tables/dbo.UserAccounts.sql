CREATE TABLE [UserAccounts] (
    [UserAccountId] int NOT NULL IDENTITY,
    [UserName] nvarchar(250) NOT NULL,
    [Email] nvarchar(250) NOT NULL,
    [Password] nvarchar(100) NOT NULL,
    CONSTRAINT [PK_VtedyUsers] PRIMARY KEY ([UserAccountId]),
);