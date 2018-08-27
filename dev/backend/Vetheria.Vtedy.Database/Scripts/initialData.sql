-- users
INSERT INTO dbo.VtedyUsers(Id, UserName, Email, EmailConfirmed, PhoneNumberConfirmed, TwoFactorEnabled, LockoutEnabled, AccessFailedCount) VALUES(N'QWERTYUIOP123456', 'test', 'test@test.pl', 1, 1, 0, 0, 0);

GO

-- projects
INSERT INTO dbo.Projects(Name, VtedyUserId) VALUES('Project_1', N'QWERTYUIOP123456');
INSERT INTO dbo.Projects(Name, VtedyUserId) VALUES('Project_2', N'QWERTYUIOP123456');
INSERT INTO dbo.Projects(Name, VtedyUserId) VALUES('Project_3', N'QWERTYUIOP123456');
INSERT INTO dbo.Projects(Name, VtedyUserId) VALUES('Project_4', N'QWERTYUIOP123456');

GO


-- todo items
declare @project_id int;

SELECT TOP(1) @project_id=id from dbo.Projects;
INSERT INTO dbo.TodoItems(Name, IsCompleted, ProjectId) VALUES('todoitem_1', 0, @project_id);

GO

-- tags

INSERT INTO dbo.Tags(Name) VALUES('dotnet');
INSERT INTO dbo.Tags(Name) VALUES('python');

GO

-- TodoItemTags
declare @tagId int;
declare @todoitemId nvarchar(36);

SELECT TOP(1) @tagId=id from dbo.Tags;
SELECT TOP(1) @todoitemId=id from dbo.TodoItems;

INSERT INTO dbo.TodoItemTags(TagId, TodoItemId) VALUES(@tagId, @todoitemId);

GO
