-- users
INSERT INTO dbo.UserAccounts(UserName, Email, Password) VALUES('test', 'test@test.pl', '1234567890');

GO

-- projects
INSERT INTO dbo.Projects(Name, UserAccountId, IsDefault) VALUES('Project_1_default', 1, 1);
INSERT INTO dbo.Projects(Name, UserAccountId, IsDefault) VALUES('Project_2', 1, 0);
INSERT INTO dbo.Projects(Name, UserAccountId, IsDefault) VALUES('Project_3', 1, 0);
INSERT INTO dbo.Projects(Name, UserAccountId, IsDefault) VALUES('Project_4', 1, 0);

GO


-- todo items
declare @project_id int;

SELECT TOP(1) @project_id=ProjectId from dbo.Projects;
INSERT INTO dbo.TodoItems(Name, IsCurrent, StatusId, ProjectId) VALUES('todoitem_1', 0, 0, @project_id);
INSERT INTO dbo.TodoItems(Name, IsCurrent, StatusId, ProjectId) VALUES('todoitem_2', 0, 0, @project_id);
INSERT INTO dbo.TodoItems(Name, IsCurrent, StatusId, ProjectId) VALUES('todoitem_3', 0, 0, @project_id);
INSERT INTO dbo.TodoItems(Name, IsCurrent, StatusId, ProjectId) VALUES('todoitem_4', 0, 0, @project_id);
INSERT INTO dbo.TodoItems(Name, IsCurrent, StatusId, ProjectId) VALUES('todoitem_5', 1, 1, @project_id);

GO

-- tags

INSERT INTO dbo.Tags(Name) VALUES('dotnet');
INSERT INTO dbo.Tags(Name) VALUES('python');

GO

-- TodoItemTags
declare @tagId int;
declare @todoitemId nvarchar(36);

SELECT TOP(1) @tagId=TagId from dbo.Tags;
SELECT TOP(1) @todoitemId=TodoItemId from dbo.TodoItems;

INSERT INTO dbo.TodoItemTags(TagId, TodoItemId) VALUES(@tagId, @todoitemId);

GO
