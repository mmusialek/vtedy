CREATE PROCEDURE [dbo].[TodoItems_Tag_add]
    @todoItemId uniqueidentifier,
    @tagId int = NULL,
    @tagName nvarchar(100) = NULL
AS

BEGIN TRANSACTION;

BEGIN TRY
    IF @tagName IS NULL AND @tagId IS NULL
    BEGIN
       -- TODO error handling
       print('@tagName AND @tagId IS NULL')
    END

    IF @tagName IS NOT NULL
    BEGIN

        -- TODO TRANSACTION HANDLING
        -- NOTE @newTag MUST be the same as the dbo.Tag table

            DECLARE @existingTagId INT;

            SELECT TOP(1) @existingTagId=t.TagId FROM dbo.[Tags] t WHERE t.Name=@tagName

            IF @existingTagId IS NOT NULL
            BEGIN
                INSERT INTO [dbo].[TodoItemTags] ([TodoItemId] ,[TagId]) 
                    OUTPUT INSERTED.[TagId], INSERTED.[TodoItemId], INSERTED.[TodoItemTagId]
                    VALUES (@todoItemId, @existingTagId)
            END
            ELSE
            BEGIN
                DECLARE @newTag table (TagId int,  Name nvarchar(100))
                INSERT @newTag EXEC dbo.Tag_add @tagName

                SELECT @tagId= nt.TagId FROM @newTag AS nt

                INSERT INTO [dbo].[TodoItemTags] ([TodoItemId] ,[TagId]) 
                    OUTPUT INSERTED.[TagId], INSERTED.[TodoItemId], INSERTED.[TodoItemTagId]
                    VALUES (@todoItemId, @tagId)
            END


    END
    ELSE
    BEGIN
        INSERT INTO [dbo].[TodoItemTags] ([TodoItemId] ,[TagId]) 
                OUTPUT INSERTED.[TagId], INSERTED.[TodoItemId], INSERTED.[TodoItemTagId]
                VALUES (@todoItemId, @tagId)
    END
END TRY
BEGIN CATCH
    --SELECT 
    --    ERROR_NUMBER() AS ErrorNumber
    --    ,ERROR_SEVERITY() AS ErrorSeverity
    --    ,ERROR_STATE() AS ErrorState
    --    ,ERROR_PROCEDURE() AS ErrorProcedure
    --    ,ERROR_LINE() AS ErrorLine
    --    ,ERROR_MESSAGE() AS ErrorMessage;

    declare @ErrorMessage nvarchar(max), @ErrorSeverity int, @ErrorState int;
    select @ErrorMessage = ERROR_MESSAGE() + ' Line ' + cast(ERROR_LINE() as nvarchar(5)), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();

    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    raiserror (@ErrorMessage, @ErrorSeverity, @ErrorState);
END CATCH;


IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;
GO;
